var winston= require('winston');
var mongodb= require('./mongodb');
var passport= require('passport');
var LocalStrategy= require('passport-local');
  var bCrypt= require('bcrypt');

passport.serializeUser(function(user, done) {

  done(null, user._id);

});


passport.deserializeUser(function(id, done) {

  mongodb.userModel.findById(id, function(err, user) {

    done(err, user);

  });

});

exports.signupuser=function (msg,callback) {
	console.log("inside signup server");
	var res={};
	mongodb.userModel.findOne({email:msg.email},function (err,result) {
		if(err){
			throw err;
		}
		else{

			if(result!=null){
				console.dir(result);
				res.code="304";
				callback(null,res);
			}
			else{
					var signup= new mongodb.userModel();
					signup.email=msg.email;
					signup.fname=msg.fname;
					signup.lname=msg.lname;
					signup.pass=msg.password;
					signup.phnumber= null;
					signup.address= null;
					signup.bday=null;
					signup.city=null;
					signup.zip=null;
					signup.state=null;
					signup.lastlogin=null;
					signup.save(function(err, result) {
						if(err)
							{
							throw err;
							}
						else
							{
							res.email= msg.email;
							res.cart=0;
							res.carteles=[];
							res.code="200";
							console.log(res.email);
							var infostr=res.email+" registered @ ";
							winston.log('info',infostr,new Date(), 'by pressing Register button');
							callback(null,res);
							}
					});
				}	
		}
	});
};