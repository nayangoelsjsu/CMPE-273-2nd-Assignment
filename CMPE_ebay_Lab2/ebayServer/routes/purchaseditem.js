var winston= require('winston');
var mongodb= require('./mongodb');
var purchasedmodel= new mongodb.purchasedModel();

exports.purchaseditem= function (msg,callback) {
	var res={};
	mongodb.purchasedModel.find({buyer: msg.email},function (err,result) {
		if(err){
			throw err;
		}
		else{
			console.log(result);
			var infostr=msg.email+" viewd his purchased items @ ";
			winston.log('info',infostr,new Date(), 'by pressing purchased item button');
			res.dat=result;
			res.code=200;
			callback(null,res);
		}
	});
};