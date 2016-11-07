var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var user_schema = new Schema({
	email: String,
	fname: String,
	lname: String,
	pass: String,
	phnumber: String,
	bday: String,
	address: String,
	city: String,
	state: String,
	zip: String,
	lastlogin: String,
});
var regitem_schema = new Schema({
	itemid: String,
	name: String,
	price: String,
	quantity: String,
	description: String,
	type: String,
	uid: String,
	auction: String,
	maxbid: String,
	maxuser: String,
	adddate: String,
	expiredate: String
});
var purchased_schema = new Schema({
	itemid: String,
	name: String,
	price: String,
	quantity: String,
	description: String,
	type: String,
	uid: String,
	auction: String,
	buyer: String
});
var cart_schema = new Schema({
	itemid: String,
	name: String,
	price: String,
	quantity: String,
	description: String,
	type: String,
	seller: String,
	buyer: String,
	auction: String,
	available: String
});
var bid_schema = new Schema({
	itemid: String,
	timestamp: String,
	buyer: String,
	bidprice: String
});

var userModel = mongoose.model("user", user_schema);
var regitemModel = mongoose.model("regitem", regitem_schema);
var purchasedModel = mongoose.model("purchased", purchased_schema);
var cartModel = mongoose.model("cart", cart_schema);
var bidModel = mongoose.model("bid", bid_schema);

exports.userModel= userModel;
exports.regitemModel= regitemModel;
exports.purchasedModel= purchasedModel;
exports.cartModel= cartModel;
exports.bidModel= bidModel;


