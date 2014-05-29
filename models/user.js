var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
    salt : {type: String, default : ''},
	isActive : { type: Boolean, default : true}
});

//
//    Methods related to password hashing, saving and authenticating
//
userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.password_hashed = this.encryptPassword(password)
    })
    .get(function() { return this._password })

userSchema.methods.encryptPassword = function(password){
    if(!password){
        return '';
    }
    var encrypted_password = bcrypt.hashSync(password, this.salt);
    return encrypted_password;
}

userSchema.methods.makeSalt = function(){
    return bcrypt.genSaltSync(Math.random());
}

userSchema.methods.authenticate = function(try_password){
    return bcrypt.compareSync(try_password, this.password_hashed) // validates that the incoming password. when hashed, is identical to the one stored
}

// Methods related to validation of fields and data in them
userSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User')

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0)
        })
    } else fn(true)
}, 'Email already exists')


mongoose.model('User', userSchema)