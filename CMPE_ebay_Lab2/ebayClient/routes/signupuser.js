var winston= require('winston');
var mongodb= require('./mongodb');
var mq_client = require('../rpc/client');
var passport= require('passport');
var LocalStrategy= require('passport-local');
  var bCrypt= require('bcrypt');

var createHash = function(password){
		 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
		};

passport.serializeUser(function(user, done) {

  done(null, user);

});


passport.deserializeUser(function(id, done) {

  mongodb.userModel.findById(id, function(err, user) {

    done(err, user);

  });

});


passport.use('signupuser', new LocalStrategy({

usernameField : 'email',

passwordField : 'password',

    passReqToCallback : true

  },

  function(req,username, password, done) {

  console.log("bulla");

  var findOrCreateUser = function(){

    console.log("ENTERED findorcreate");
    console.log(username+","+password+","+done);

    var op = "signup_user";
	var msg_payload = { "operation": op, "email": username, "password": createHash(password),"fname": req.param("fname"), "lname":req.param("lname") };
	mq_client.make_request('user_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid signup");
				req.session.email = results.email;
				req.session.cart=0;
				req.session.carteles=[];
				var user={};
				user.email= results.email;
				user.cart=0;
				user.carteles=[];
				console.log(req.session.email);
				console.log("before return");
				console.log("back in findorcreate");
    			console.log(username+","+password+","+done);
				return done(null, results);
				console.log("after return");
				// res.redirect('/home');
			}
			else {
				console.log("Invalid Signup");
				return done(null, false, req.flash('message','User Already Exists'));
				// res.render('login',{errormessage:"User already exists. Please Log in"});
			}
		}  
	});

    };

    process.nextTick(findOrCreateUser);

  }));


