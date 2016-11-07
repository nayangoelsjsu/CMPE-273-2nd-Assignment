var winston= require('winston');
var mongodb= require('./mongodb');
var itemmodel= new mongodb.regitemModel();

exports.regitem= function (msg,callback) {
	var res={};
	var name= msg.name;
	var description= msg.description;
	var price= msg.price;
	var quantity= msg.quantity;
	var type= msg.type;
	var auction= msg.auction;
	var email= msg.email;
	var currdate= new Date();
	month= currdate.getMonth()+1;
	var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
	console.log("date"+datestr);
	var expiredate = new Date();
	var daysToAdd = 4;
	expiredate.setDate(expiredate.getDate() + daysToAdd);
	var dd = expiredate.getDate();
	var mm = expiredate.getMonth() + 1;
	var y = expiredate.getFullYear();
	var expiry;
	if(auction=="Auction"){
	expiry = mm+'/'+dd+'/'+ y+"@"+currdate.getHours()+":"+currdate.getMinutes();
	}
	else{
		expiry= null;
	}
	console.log(expiry);
	itemmodel.name= name;
	itemmodel.price= price;
	itemmodel.quantity= quantity;
	itemmodel.type= type;
	itemmodel.uid= email;
	itemmodel.auction= auction;
	itemmodel.adddate= datestr;
	itemmodel.expiredate= expiry;
	itemmodel.save(function (err,result) {
		if(err){
			throw err;
		} 
	});
	console.log("done");
	var infostr=msg.email+" submitted an advertisement @ ";
		winston.log('info',infostr,new Date(), 'by pressing the add item button');
		res.code="200";
	callback(null,res);
};