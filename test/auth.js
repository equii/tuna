'use strict';

var app = require('../app');
var should = require('should');
var request = require('supertest');

describe('Passport: authentication', function(){
    this.timeout(10000); // increasing timeout due to network latency when connecting to the DB
	it('should redirect to /login if not authenticated', function(done){
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

	it('should redirect to / if auth successfully', function(done){
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

});