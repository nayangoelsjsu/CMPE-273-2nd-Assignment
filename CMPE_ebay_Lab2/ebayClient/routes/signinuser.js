var express= require('express');
var winston= require('winston');
var mongodb= require('./mongodb');
var mq_client = require('../rpc/client');
var passport= require('passport');
var LocalStrategy= require('passport-local');
  var bCrypt= require('bcrypt');


passport.serializeUser(function(user, done) {

  done(null, user);

});


passport.deserializeUser(function(id, done) {

  mongodb.userModel.findById(id, function(err, user) {

    done(err, user);

  });

});


passport.use('signinuser', new LocalStrategy({

usernameField : 'email',

passwordField : 'password',

    passReqToCallback : true

  },

  function(req,username, password, done) {

  console.log("bulla");

  var findOrCreateUser = function(){

    var op = "check_user";
	var msg_payload = { "operation": op, "email": username, "password": password };
	mq_client.make_request('user_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				req.session.email = results.email;
				req.session.carteles = results.carteles;
				return done(null, results);
				// res.redirect('/home');
			}
			else {
				console.log("Invalid Login");ejs.renderFile('./views/loginfail.ejs',function(err, result) {
			        if (!err) {
			            // res.end(result);
				return done(null, false, req.flash('message','User Already Exists'));
			            
			        }
			        else {
				return done(null, false, req.flash('message','User Already Exists'));

			            // res.end('An error occurred');
			            console.log(err);
			        }
				});
			}
		}  
	});

    };

    process.nextTick(findOrCreateUser);

  }));





	