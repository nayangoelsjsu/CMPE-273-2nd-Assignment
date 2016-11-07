var winston= require('winston');
var mongodb= require('./mongodb');
var purchasedmodel= new mongodb.purchasedModel();

exports.solditem=function (msg,callback) {
	var res={};
	mongodb.purchasedModel.find({uid: msg.email},function (err,result) {
		if(err){
			throw err;
		}
		else{
			console.dir(result);
			var infostr=msg.email+" viewd his sold items @ ";
			winston.log('info',infostr,new Date(), 'by pressing sold item button');
			res.dat=result;
			res.code=200;
			callback(null,res);
		}
	});
};