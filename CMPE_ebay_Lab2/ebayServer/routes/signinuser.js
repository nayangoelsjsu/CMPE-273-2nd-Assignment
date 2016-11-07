var express= require('express');
var winston= require('winston');
var mongodb= require('./mongodb');
var bCrypt= require('bcrypt');

var createHash = function(password){
		 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
		};

var login;
var cart;
var email;
var password;
exports.signinuser= function (msg,callback) {
	console.log("enter rabbit bc");
	var res={};
	login= new mongodb.userModel();
	cart= new mongodb.cartModel();
	console.log("agaya bc");
	console.log(msg.email);
	email= msg.email;
	password= msg.password;
	console.log("login nahi hua"+login);
	mongodb.userModel.findOne({email: email},function (err,result) {
		
		if(err){
			throw err;
		}

		else{
			console.log("hum yahan tum kahan");
			console.log(result);
		  if(result){
		  	var comp= bCrypt.compareSync(password, result.pass);
		  	if(comp==true){
			console.log("valid");
				res.email= email;
				res.cart=0;
				res.carteles=[];
				var currdate= new Date();
				var datestr= currdate.getMonth()+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes()+":"+currdate.getSeconds();
				console.log("date"+datestr);
				var currdate= new Date();
				var datestr= currdate.getMonth()+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes()+":"+currdate.getSeconds();

				mongodb.userModel.update({email:email},
			{
				$set: { 
					lastlogin: datestr
				}
			}, function (err,result) {
				if(err){
					throw err;
				}
			});
				mongodb.cartModel.find({buyer: res.email}, function (err,result) {
					if(err){
						throw  err;
					}
					else{
						console.log("in herree");
						if(result){
						console.dir(result);
						for(var i=0;i<result.length;i++){
							var a= { 
										_id: result[i].itemid ,
									    name: result[i].name,
									    price: result[i].price,
									    quantity: result[i].quantity,
									    description: result[i].description,
									    type: result[i].type,
									    uid: result[i].seller,
									    auction: result[i].auction,
									    available: result[i].available
									};
							res.carteles[i]=a;
						}
						res.cart= result.length;
						console.dir(res.carteles);
					}
						res.email=email;
						res.code="200";
						res.value="Logged in";
						var infostr=res.email+" logged in @ ";
					  winston.log('info',infostr,new Date(), 'by pressing Sign in button');
						callback(null,res);
					}
				});
			}
			else{
				res.code="401";
				callback(null,res);
			}
		}
	}
	});
};