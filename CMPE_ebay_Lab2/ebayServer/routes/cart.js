var winston= require('winston');
var mongodb= require('./mongodb');

var cartmodel= new mongodb.cartModel();
var itemmodel= new mongodb.regitemModel();
var purchasedmodel= new mongodb.purchasedModel();

exports.addtocart= function (msg,callback) {
	console.log("in addtocart");
	var res={};
	res.cart= msg.cart;
	res.cart++;
	var id= msg.id;
	var item;
	console.log(id);
	res.carteles= msg.carteles;

	mongodb.regitemModel.find({_id: id}, function (err,result) {
		if(err){
			throw err;
		}
		else{
			result[0].available;
				result[0]._doc.available= result[0].quantity;
				result[0].quantity= '1';
				console.log("agayayayayaya");
				res.carteles.push(result[0]);
				var infostr=res.email+" added item "+id+" to the cart @ ";
				winston.log('info',infostr,new Date(), 'by pressing add to cart button');
				res.code="200";
				callback(null,res);
		}
	});
	
};

// exports.viewcart= function (req,res) {
// 	console.log("main yahan");
// 	console.dir(res.carteles);
// 	var items= res.carteles;
// 	var infostr=res.email+" viewd his cart items @ ";
// 	winston.log('info',infostr,new Date(), 'by pressing Cart button');
// 	res.render('cart',{ items: items });
// 	// res.render('cart',{});
	
// };

// exports.delete= function (req,res) {
// 	console.log("ready to delete");
// 	var id=msg.id');
// 	for(var i=0;i<res.carteles.length;i++){
// 		if(res.carteles[i]._id==id){
// 			console.log("found at"+i);
// 			res.carteles.splice(i,1);
// 			console.log(res.carteles);
// 			res.cart--;
// 			var infostr=res.email+" deleted item "+id+" from cart @ ";
// 			winston.log('info',infostr,new Date(), 'by pressing delete button in cart');
// 			res.redirect('/viewcart');
// 		}
// 	}	
// };

// exports.cardvalidate= function (req,res) {
// 	var infostr=res.email+" checked out of cart @ ";
// 	winston.log('info',infostr,new Date(), 'by pressing Checkout button');
// 	res.render('cardvalidate');
// };

exports.checkvalid= function(msg,callback){
	var res={};
	res.email=msg.email;
	res.carteles= msg.carteles;
	res.cart=msg.cart;
	var cardnum= msg.cardnum;
	var date= msg.date;
	var cvv= msg.cvv;
	var flag=0;
	var mm= date.substring(0,2);
	var yy= date.substring(3);
	console.log(mm+'/'+yy);
	if(cardnum.toString().length==15 || cardnum.toString().length ==16){
	}
	else{
		var infostr=res.email+" entered invalid card number @ ";
		winston.log('info',infostr,new Date(), '');
		res.code="201";
	}
	var today = new Date();
	var m = today.getMonth()+1;
	var y = today.getFullYear();
	var datePatt= /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/;
	if(datePatt.test(date)!=true){
		res.code="202";
	}

	if(m<10) {
	    m='0'+m
	} 

	if(yy<y){
		console.log(yy+'/'+y);
		console.log("less");
		res.code="203";
	}
	else if(yy==y){
		if(mm<m){
			console.log("less");
		var infostr=res.email+" used an expired card @ ";
		winston.log('info',infostr,new Date(), '');
		res.code="204";
		}
	}
	if(cvv.toString().length==3){
		//var i=0;
		var na;
		for(var j=0;j<(res.carteles.length);j++){
			console.log("ssssssssssssssssssssss dikhado");

			console.dir(res.carteles[j]);
			na= addtodb(res.carteles[j],res.email);
			console.log("na"+na);
			// purchasedmodel.itemid= res.carteles[i]._id;
			// purchasedmodel.name= res.carteles[i].name;
			// purchasedmodel.price= res.carteles[i].price;
			// purchasedmodel.quantity= res.carteles[i].quantity;
			// purchasedmodel.description= res.carteles[i].description;
			// purchasedmodel.type= res.carteles[i].type;
			// purchasedmodel.uid= res.carteles[i].uid;
			// purchasedmodel.auction= res.carteles[i].auction;
			// purchasedmodel.buyer= res.email;
			// purchasedmodel.save(function (err,result) {
			// 	if(err){
			// 		throw err;
			// 	}
			// 	else{
			// 		console.log("inserted in purchased");
			// 		i++;
			// 	}
			// });
			
			// var updatequant= parseInt(res.carteles[i].available)- parseInt(res.carteles[i].quantity); 
			// console.log("updated quant="+updatequant);
			
			// mongodb.regitemModel.update({_id: res.carteles[i]._id},
			// 		{
			// 			$set: {quantity: updatequant}
			// 		}, function (err,result) {
			// 			if(err){
			// 				throw err;
			// 			}
			// 			else{
			// 				console.log("quant updated");
			// 			}
			// 		}
			// 	);


		}
					mongodb.cartModel.remove({buyer: res.email}, function (err,result) {
						if(err){
							throw err;
						}
						else{
							console.log("deleted from cart");
						}
					});
					console.log("first"+res.cart);
					res.cart= 0;
					console.log("second"+res.cart);
					res.carteles=[];
					res.code="200";
					console.log("ok");	

	}
	else{
		var infostr=res.email+" entered wrong cvv @ ";
		winston.log('info',infostr,new Date(), '');
		res.code="205";
	}
	callback(null,res);
};

function addtodb(carteles,email){
console.log("iiiiiiiiiii am here in addtodb");
console.dir(carteles);
purchasedmodel.itemid= carteles._id;
			purchasedmodel.name= carteles.name;
			purchasedmodel.price= carteles.price;
			purchasedmodel.quantity= carteles.quantity;
			purchasedmodel.description= carteles.description;
			purchasedmodel.type= carteles.type;
			purchasedmodel.uid= carteles.uid;
			purchasedmodel.auction= carteles.auction;
			purchasedmodel.buyer= email;
			purchasedmodel.save(function (err,result) {
				if(err){
					throw err;
				}
				else{
					console.log("inserted in purchased");
				}
			});
			
			var updatequant= parseInt(carteles.available)- parseInt(carteles.quantity); 
			console.log("updated quant="+updatequant);
			
			mongodb.regitemModel.update({_id: carteles._id},
					{
						$set: {quantity: updatequant}
					}, function (err,result) {
						if(err){
							throw err;
						}
						else{
							console.log("quant updated");
							return true;
						}
					}
				);
}

// exports.validitypage= function (req,res) {
// 	console.log("here");
// 	var infostr=res.email+" card got accepted @ ";
// 	winston.log('info',infostr,new Date(), '');
// 	res.render('checkvalid',{valids: 'the card has been accepted'});

	
// };

// exports.addtosession= function (req,res) {
// 	console.log("addtosession");
// 	var quantity= msg.quant');
// 	var id= msg.id');
// 	console.log("quant"+quantity);
// 	console.log("id"+id);
// 	for(var i=0;i<res.carteles.length;i++){
// 		if(res.carteles[i]._id==id){
// 			console.log("found at"+i);
// 			res.carteles[i].quantity= quantity;
// 			console.log("done");
// 			console.dir(res.carteles);
// 			var infostr=res.email+" changed quantity to "+quantity+" and refreshed @ ";
// 			winston.log('info',infostr,new Date(), 'by pressing refresh button in cart');
// 			res.send(200);
// 		}
// 	}

// };
