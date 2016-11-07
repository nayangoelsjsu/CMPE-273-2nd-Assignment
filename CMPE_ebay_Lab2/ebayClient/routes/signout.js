var winston= require('winston');
var mongodb= require('./mongodb');
var cartmodel= new mongodb.cartModel();
var mq_client = require('../rpc/client');

exports.signout= function (req,res) {
	
	var op = "signout";
	var msg_payload = { "operation": op, "email": req.session.email,"carteles":req.session.carteles};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				res.redirect('/');
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