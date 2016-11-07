var winston= require('winston');
var mongodb= require('./mongodb');
var itemmodel= new mongodb.regitemModel();
var bidmodel= new mongodb.bidModel();
var mq_client = require('../rpc/client');

exports.itempage= function (req,res) {
	console.log("madarchod"+req.session.email);
	var op = "itempage";
	var msg_payload = { "operation": op, "email": req.session.email, "id": req.param('id')};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("main to hun pagal");
				console.dir(results);
				id= req.param('id');
				name= results.name;
			price= results.price;
			quantity= results.quantity;
			description= results.description;
			type= results.type;
			auction= results.auction;
			uid= results.uid;
			maxbid= results.maxbid;
			message=results.message;
			console.log("kya likhun");
			res.render('item', { id: id, name: name, price: price, quantity: quantity, description: description, type: type, auction: auction, uid: uid, max: maxbid, message: message});
			console.log("uske baad");
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

exports.bidplace= function (req,res) {
	var op = "bidplace";
	console.log("behenchod"+req.session.email);
	var msg_payload = { "operation": op, "email": req.session.email, "itemid": req.param('itemid'), "bid": req.param('bid')};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
			res.send(200);
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