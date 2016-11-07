var mysql= require('./mysql1');
var express= require('express');
var winston= require('winston');

exports.signinuser= function (req,res) {
	var email= req.param("email");
	var password= req.param("password");
	var key="guessme";
	var extra="AES_ENCRYPT('"+password+"','"+key+"')";
	var query= "SELECT * FROM user WHERE email='"+email+"' AND pass="+extra+";";
	console.log(query);
	mysql.fetchData(function (err,result) {
		if(err){
			throw err;
		}
		else{
			if(result.length<=0){
				console.log("invalid username and password");
				res.render('login',{errormessage:"Invalid Username or Password"});
			}
			else{
				console.log("valid");
				req.session.email= email;
				req.session.cart=0;
				req.session.carteles=[];
				var currdate= new Date();
				var datestr= currdate.getMonth()+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes()+":"+currdate.getSeconds();
				console.log("date"+datestr);
				var datequery= "UPDATE user SET lastlogin='"+datestr+"' WHERE email='"+email+"';";
				console.log("datequery"+datequery);
				mysql.push(function (err,result) {
					if(err){
						throw err;
					}
					else{
						console.log("time updated");
					}
				}, datequery);

				var getcartquery=  "SELECT * FROM cart WHERE buyer='"+req.session.email+"';";
				console.log(getcartquery);
				
				mysql.fetchData(function (err,result) {
					if(err){
						throw err;
					}

					else{
						console.log("in herree");
						if(result[0]){
						console.dir(result);
						for(var i=0;i<result.length;i++){
							var a= { 
										itemid: result[i].itemid ,
									    name: result[i].name,
									    price: result[i].price,
									    quantity: result[i].quantity,
									    description: result[i].description,
									    type: result[i].type,
									    uid: result[i].seller,
									    auction: result[i].auction,
									    available: result[i].available
									};
							req.session.carteles[i]=a;
						}
						req.session.cart= result.length;
						console.dir(req.session.carteles);
					}
						var infostr=req.session.email+" logged in @ ";
					  winston.log('info',infostr,new Date(), 'by pressing Sign in button');
						res.redirect('/home');
					}

				}, getcartquery);

				
			}
		}
	},query);
};