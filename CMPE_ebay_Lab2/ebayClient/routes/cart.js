var winston= require('winston');
var mongodb= require('./mongodb');
var mq_client = require('../rpc/client');

var cartmodel= new mongodb.cartModel();
var itemmodel= new mongodb.regitemModel();
var purchasedmodel= new mongodb.purchasedModel();

exports.addtocart= function (req,res) {
	var op = "add_to_cart";
	var msg_payload = { "operation": op, "email": req.session.email, "cart": req.session.cart, "carteles": req.session.carteles, "id": req.param('id')};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				req.session.carteles=results.carteles;
				console.dir(req.session.carteles);
				res.redirect('/viewcart');
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

exports.viewcart= function (req,res) {
	console.log("main yahan");
	console.dir(req.session.carteles);
	var items= req.session.carteles;
	res.render('cart',{ items: items });
	// res.render('cart',{});
	
};

exports.delete= function (req,res) {
	console.log("ready to delete");
	var id=req.param('id');
	for(var i=0;i<req.session.carteles.length;i++){
		if(req.session.carteles[i]._id==id){
			console.log("found at"+i);
			req.session.carteles.splice(i,1);
			console.log(req.session.carteles);
			req.session.cart--;
			res.redirect('/viewcart');
		}
	}	
};

exports.cardvalidate= function (req,res) {
	res.render('cardvalidate');
};

exports.checkvalid= function(req,res){
	var op = "checkvalid";
	var msg_payload = { "operation": op, "email": req.session.email, "cart": req.session.cart, "carteles": req.session.carteles, "cardnum": req.param('cardnum'), "date": req.param('valid'), "cvv":req.param('cvv')};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("first"+req.session.cart);
					req.session.cart= 0;
					console.log("second"+req.session.cart);
					req.session.carteles=[];
					res.redirect('/validitypage');
					console.log("ok");	
			}
			else if(results.code == 201){
				res.render('checkvalid', { valids: 'card number not valid' });	
			}
			else if(results.code == 202){
				res.render('checkvalid', { valids: 'invalid date format' });	
			}
			else if(results.code == 203){
				res.render('checkvalid', { valids: 'card expired' });	
			}
			else if(results.code == 204){
				res.render('checkvalid', { valids: 'card expired' });	
			}
			else if(results.code == 205){
				res.render('checkvalid', { valids: 'the cvv is invalid'});	
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
exports.validitypage= function (req,res) {
	console.log("here");
	var infostr=res.email+" card got accepted @ ";
	winston.log('info',infostr,new Date(), '');
	res.render('checkvalid',{valids: 'the card has been accepted'});

	
};
exports.addtosession= function (req,res) {
	console.log("addtosession");
	var quantity= req.param('quant');
	var id= req.param('id');
	console.log("quant"+quantity);
	console.log("id"+id);
	for(var i=0;i<req.session.carteles.length;i++){
		if(req.session.carteles[i]._id==id){
			console.log("found at"+i);
			req.session.carteles[i].quantity= quantity;
			console.log("done");
			console.dir(req.session.carteles);
			res.send(200);
		}
	}

};

// var op = "add_to_cart";
// 	var msg_payload = { "operation": op, "email": req.session.email};
// 	mq_client.make_request('item_queue',msg_payload, function(err,results){
// 		console.log(results);
// 		if(err){
// 			throw err;
// 		}
// 		else 
// 		{
// 			if(results.code == 200){
// 				console.log("Home loaded");
// 				req.session.email = results.email;
// 				var items = results.items;
// 				res.render('home',{items: items});
// 			}
// 			else {
// 				console.log("Invalid");ejs.renderFile('./views/loginfail.ejs',function(err, result) {
// 			        if (!err) {
// 			            res.end(result);
// 			        }
// 			        else {
// 			            res.end('An error occurred');
// 			            console.log(err);
// 			        }
// 				});
// 			}
// 		}  
// 	});
