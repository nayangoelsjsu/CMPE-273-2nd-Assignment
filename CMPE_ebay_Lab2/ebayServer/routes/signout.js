var winston= require('winston');
var mongodb= require('./mongodb');
var cartmodel= new mongodb.cartModel();

exports.signout= function (msg,callback) {
	var res={};
	mongodb.cartModel.remove({buyer: msg.email});
	for(var i=0; i<msg.carteles.length; i++){
		cartmodel.itemid= msg.carteles[i]._id;
		cartmodel.name= msg.carteles[i].name;
		cartmodel.price= msg.carteles[i].price;
		cartmodel.quantity= msg.carteles[i].quantity;
		cartmodel.description= msg.carteles[i].description;
		cartmodel.type= msg.carteles[i].type;
		cartmodel.auction= msg.carteles[i].auction;
		cartmodel.available=msg.carteles[i].available;
		cartmodel.seller= msg.carteles[i].uid;
		cartmodel.buyer= msg.email;
		cartmodel.save(function (err,result) {
			if(err){
				throw err;
			}
			else{
				console.log("added");
			}
		});
	}
	var infostr=msg.email+" logged out @ ";
	winston.log('info',infostr,new Date(), 'by pressing Sign out button');
	res.code="200";
	callback(null,res);
};