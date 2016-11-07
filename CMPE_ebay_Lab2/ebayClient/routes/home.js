var winston= require('winston');
var mongodb= require('./mongodb');
var mq_client = require('../rpc/client');
var itemmodel= new mongodb.regitemModel();

exports.home= function (req,res) {

var op = "load_home";
	var msg_payload = { "operation": op, "email": req.session.email};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Home loaded");
				req.session.email = results.email;
				var items = results.items;
				res.render('home',{items: items});
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
}