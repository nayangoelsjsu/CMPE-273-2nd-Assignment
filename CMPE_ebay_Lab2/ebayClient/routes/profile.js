var winston= require('winston');
var mongodb= require('./mongodb');
var usermodel= new mongodb.userModel();
var mq_client = require('../rpc/client');

exports.profile= function (req,res) {
	
	var op = "profile";
	var msg_payload = { "operation": op, "email": req.session.email};
	mq_client.make_request('user_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
			console.log(results.fname);
			fname= results.fname;
			lname= results.lname;
			phonenum= results.phnumber;
			birthday= results.bday;
			address= results.address;
			city= results.city;
			state= results.state;
			zip= results.zip;
			res.render('profile',{fname: fname, lname: lname, email: req.session.email, phonenum: phonenum, birthday: birthday, address: address, city: city, state: state, zip: zip });
			}
			else {
				console.log("Invalid");ejs.renderFile('./views/loginfail.ejs',function(err, result) {
			        if (!err) {
			            res.end(result);
			        }
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
				});
			}
		}  
	});
};