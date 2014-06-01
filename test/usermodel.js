var should = require('should');
var mongoose = require('mongoose');
//var mongoose = require('../models/user');
var userModel = mongoose.model('User');


describe('[Test Suite] User model unit tests', function() {
    this.timeout(10000); // increasing timeout due to network latency when connecting to the DB
    it('1. Simple find one usage', function (done) {
        userModel.findOne({ email: 'test@test.com' }, function (err, user) {
            should.not.exist(err);
            should.exist(user);
            user.email.should.equal('test@test.com');
            user.firstName.should.equal('');
            user.lastName.should.equal('');
            user.isActive.should.equal(true);
            should.exist(user.password_hashed);
            done();
        });
    });

    it('2. Email validation - invalid email', function(done){
       var userData = {
           email : 'testtest.com',
           password : 'password'
       };

       var user = new userModel(userData);
       user.save(function(err){
            should.exist(err);
            err.message.should.equal('Validation failed');
            should.exist(err.errors.email.message);
            done();
       });
    });

    it('3. Email validation - blank email', function(done){
        var userData = {
            email : '',
            password : 'password'
        };

        var user = new userModel(userData);
        user.save(function(err){
            should.exist(err);
            err.message.should.equal('Validation failed');
            should.exist(err.errors.email.message);
            done();
        });
    });

    it('4. Email validation - duplicate email', function(done){
        var userData = {
            email : 'test@test.com',
            password : 'password'
        };

        var user = new userModel(userData);
        user.save(function(err){
            should.exist(err);
            err.message.should.equal('Validation failed');
            should.exist(err.errors.email.message);
            done();
        });
    });
});