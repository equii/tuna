'use strict';

/**
 *  Contains basic test cases for login and registration.
 *
 */

var app = require('../app');
var should = require('should');
var request = require('supertest');
var test_utils = require('./test_utils');

describe('Passport: authentication', function(){
    this.timeout(10000); // increasing timeout due to network latency when connecting to the DB
	it('1. Login negative', function(done){
		var post ={
			email: 'invalid@test.com',
			password: 'invalidpassword'
		};

		request(app)
		.post('/login')
		.send(post)
		.expect(302)
		.end(function(err, res){
			should.not.exist(err);
			res.header.location.should.equal('/login');

			done();
		});
	});

	it('2. Login positive', function(done){
		var post = {
			email: 'test@test.com',
			password: 'test'
		};

		request(app)
		.post('/login')
		.send(post)
		.end(function(err,res){
            should.not.exist(err);
        	res.header.location.should.not.include('login');
			res.header.location.should.equal('/');

			done();
		});
	});

    it('3. Registration and login positive happy path', function(done){
       var post = {
           email: 'TEST' + test_utils.randomEmail(),
           password: test_utils.randomText(16)
       };

       request(app).post('/register').send(post).end(function(err, res){
           should.not.exist(err);
           res.header.location.should.equal('/login');

           request(app).post('/login').send(post).end(function(err, res){
               should.not.exist(err);
               res.header.location.should.not.include('login');
               res.header.location.should.equal('/');

               done();
           });
       });
    });

    it("4. Registration negative", function(done){
        var post1 = {
            email: '12@12.com',
            password: 'as'
        };
        var post2 = {
            email: '12345678901234561',
            password: 'asdhd830xlka0209'
        };
        var post3 = {
            email: 'vnd_)hj3',
            password: '1234567890nhjd561'
        };
        var post4 = {
            email: '123cvfg%$#4434561jsdl',
            password: '12ssss78901234561dafd'
        };

        request(app).post('/register').send(post1).end(function(err, res){
            should.not.exist(err);
            res.header.location.should.equal('/register');
            request(app).post('/register').send(post2).end(function(err, res){
                should.not.exist(err);
                res.header.location.should.equal('/register');
                request(app).post('/register').send(post3).end(function(err, res){
                    should.not.exist(err);
                    res.header.location.should.equal('/register');
                    request(app).post('/register').send(post4).end(function(err, res){
                        should.not.exist(err);
                        res.header.location.should.equal('/register');

                        done();
                    });
                });
            });
        });
    });

    it('5. Logout positive', function(done){
        var post = {
            email: 'test@test.com',
            password: 'test'
        };

        request(app)
            .post('/login')
            .send(post)
            .end(function(err,res){
                should.not.exist(err);
                res.header.location.should.not.include('login');
                res.header.location.should.equal('/');

                // now need to logout
                request(app).get('/logout').end(function(err,res){
                    should.not.exist(err);
                    res.header.location.should.equal('/login');

                    done();
                });
            });
    });
});