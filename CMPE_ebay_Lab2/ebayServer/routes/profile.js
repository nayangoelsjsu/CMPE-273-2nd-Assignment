var winston= require('winston');
var mongodb= require('./mongodb');
var usermodel= new mongodb.userModel();

exports.profile= function (msg,callback) {
	var res={};
	var email= msg.email;
	var fname=null;
	var lname=null;
	var phonenum= null;
	var birthday=null;
	var address= null;
	var city=null;
	var state= null;
	var zip=null;
	mongodb.userModel.find({email: email}, function (err, result) {
		if(err){
			throw err;
		}
		else{
			console.log(result[0].fname);
			res.fname= result[0].fname;
			res.lname= result[0].lname;
			res.phonenum= result[0].phnumber;
			res.birthday= result[0].bday;
			res.address= result[0].address;
			res.city= result[0].city;
			res.state= result[0].state;
			res.zip= result[0].zip;
			res.code="200";
			var infostr=msg.email+" visited his profile @ ";
			winston.log('info',infostr,new Date(), '');
			callback(null,res);
			}
	});
};