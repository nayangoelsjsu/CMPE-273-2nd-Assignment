/**
 * New node file
 */
var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");

describe('http tests', function(){

	it('Should return the login page if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('Should render home page as valid details are provided', function(done) {
		request.post(
			    'http://localhost:3000/signinuser',
			    { form: { operation: "signinuser", email:"abcd@gmail.com", password:"qwerty12" } },
			    function (error, response, body) {
			    	assert.equal(302, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('Should display cart details', function(done) {
		request.post(
			    'http://localhost:3000/signupuser',
			    { form: { operation: "signupuser", email:"karansingh@gmail.com", password:"qwerty12", fname: "Karan", lname: "Singh" } },
			    function (error, response, body) {
			    	assert.equal(302, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('This will add item to the table', function(done) {
		request.post(
			    'http://localhost:3000/regitem',
			    { form: { operation: "regitem", name:"Moto G-12", description:"Black Moto G 2012 model", price: "200", quantity: "3", type: "Phone", auction:"Fixed" } },
			    function (error, response, body) {
			    	assert.equal(302, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('This will check credit card validation', function(done) {
		request.post(
			    'http://localhost:3000/checkvalid',
			    { form: { operation: "checkvalid", cardnum:"1234567890987654", valid:"03/201", cvv: "123" } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
});