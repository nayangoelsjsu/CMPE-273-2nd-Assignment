var winston= require('winston');
var mongodb= require('./mongodb');
var itemmodel= new mongodb.regitemModel();
var mq_client = require('../rpc/client');

exports.regitem= function (req,res) {
	var op = "regitem";
	var msg_payload = { "operation": op, "email": req.session.email, "name": req.param('name'), "description": req.param('description'), "price": req.param('price'), "quantity": req.param('quantity'), "type": req.param('type'), "auction": req.param('auction')};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				res.redirect('/home');
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