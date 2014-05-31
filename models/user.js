var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

/*
	Defining a schema for a user
*/
var userSchema = new Schema({
	email: {type: String, default : ''},
    firstName : {type: String, default : ''},
    lastName : {type: String, default : ''},
	createDataTime: { type: Date, default: Date.now },
	password_hashed : {type: String, default : ''},
	isActive : { type: Boolean, default : true}
});

//
//    Methods related to password hashing, saving and authenticating
//
userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.password_hashed = this.encryptPassword(password)
    })
    .get(function() { return this._password })

userSchema.methods.encryptPassword = function(password){
    if(!password){
        return '';
    }
    var encrypted_password = bcrypt.hashSync(password);
    return encrypted_password;
}

userSchema.methods.authenticate = function(try_password){
    return bcrypt.compareSync(try_password, this.password_hashed) // validates that the incoming password, when hashed, is identical to the one stored
}

// Methods related to validation of fields and data in them
userSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User', userSchema);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0)
        })
    } else fn(true)
}, 'The email address is already in use, try logging in with it')

userSchema.path('email').validate(function (email) {
    return email.length
}, 'The email cannot be blank, please try again')

userSchema.path('email').validate(function(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}, 'You have entered an invalid email, make sure it looks something like yourname@domain.com');

userSchema.path('password_hashed').validate(function(password_hashed){
    return password_hashed.length;
},'Your password cannot be blank, please try again')

// Pre-save hook to validate password length; password is a virtual field and cannot have a .validate method
userSchema.pre('save', function(next){
  if(this.password.length <= 3 || this.password.length >= 24){
      next(new Error('Your password has to be between 4 and 24 characters long'));
  }
  else{
      next();
  }
})

mongoose.model('User', userSchema)