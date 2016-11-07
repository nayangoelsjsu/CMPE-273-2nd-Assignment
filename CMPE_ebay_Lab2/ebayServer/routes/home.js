var winston= require('winston');
var mongodb= require('./mongodb');
var itemmodel= new mongodb.regitemModel();

exports.home= function (msg,callback) {
	var res={};
	var email=msg.email;
	mongodb.regitemModel.find({ quantity: { $gt: 0 } }, function (err,result) {
		if(err){
			throw err;
		}
		else{
			console.log("result= "+result._id);
			res.email=email;
			res.items=result;
			res.code="200";
			var infostr=email+" was on homepage @ ";
			winston.log('info',infostr,new Date(), '');
			callback(null,res);
		}
	});
};