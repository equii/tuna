'use strict';

var app = require('../app');
var should = require('should');
var request = require('supertest');

describe('Passport: authentication', function(){
    this.timeout(10000); // increasing timeout due to network latency when connecting to the DB
	it('1. Login negative', function(done){
		var post ={
			username: 'fake',
			password: 'fake'
		};

		request(app)
		.post('/login')
		.send(post)
		.expect(302)
		.end(function(err, res){
			should.not.exist(err);
			res.header.location.should.include('login');

			done();
		});
	});

	it('2. Login positive', function(done){
		var post = {
			username: 'test',
			password: 'test'
		};

		request(app)
		.post('/login')
		.send(post)
		.end(function(err,res){
            should.not.exist(err);
        	res.header.location.should.not.include('login');
			res.header.location.should.include('/');

			done();
		});
	});

    it('3. Registration and login positive happy path', function(done){
       var post = {
           username: 'test_username',
           password: 'asdhd830xlka02'
       };

       request(app).post('/register').send(post).end(function(err, res){
           should.not.exist(err);
           res.header.location.should.include('login');
       });

       request(app).post('/login').send(post).end(function(err, res){
           should.not.exist(err);
           res.header.location.should.not.include('login');
           res.header.location.should.include('/');
       });

       done();
    });

    it("4. Registration negative", function(done){
        var post1 = {
            username: '12',
            password: 'as'
        };
        var post2 = {
            username: '12345678901234561',
            password: 'asdhd830xlka0209'
        };
        var post3 = {
            username: 'vnd_)hj3',
            password: '1234567890nhjd561'
        };
        var post4 = {
            username: '123cvfg%$#4434561jsdl',
            password: '12ssss78901234561dafd'
        };

        request(app).post('/register').send(post1).end(function(err, res){
            should.not.exist(err);
            res.header.location.should.include('/register');
        });

        request(app).post('/register').send(post2).end(function(err, res){
            should.not.exist(err);
            res.header.location.should.include('/register');
        });

        request(app).post('/register').send(post3).end(function(err, res){
            should.not.exist(err);
            res.header.location.should.include('/register');
        });

        request(app).post('/register').send(post4).end(function(err, res){
            should.not.exist(err);
            res.header.location.should.include('/register');
        });

        done();
    });

});