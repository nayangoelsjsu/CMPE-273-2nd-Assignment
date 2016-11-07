var winston= require('winston');
var mongodb= require('./mongodb');
var itemmodel= new mongodb.regitemModel();
var bidmodel= new mongodb.bidModel();

exports.itempage= function (msg,callback) {
	var res={};
	var id= msg.id;
	console.log("id="+id);
	mongodb.regitemModel.find({_id: id}, function (err,result) {
		if(err){
			throw err;
		}
		else{
			res.name= result[0].name;
			res.price= result[0].price;
			res.quantity= result[0].quantity;
			res.description= result[0].description;
			res.type= result[0].type;
			res.auction= result[0].auction;
			res.uid= result[0].uid;
			res.maxbid= result[0].maxbid;
			res.message= "";
			if(res.auction=='Auction'){
				if(res.maxbid==null){
					res.maxbid=price;
				}
			}
			console.log("maxbid"+res.maxbid);
			res.code="200";
			var infostr=msg.email+" clicked on item with id"+id+" @" ;
			winston.log('info',infostr,new Date(), 'and is now at the item page');
			callback(null,res);
		}
	});
};

exports.bidplace= function (msg,callback) {
	var res={};
	var bid=msg.bid;
	console.log(bid);
	var itemid= msg.itemid;
	console.log(msg.email);

	var infostr=msg.email+" placed bid on item "+itemid+" of amount "+bid+" @ ";
	winston.log('info',infostr,new Date(), 'by pressing Submit Bid button');

	mongodb.regitemModel.update({_id:itemid},
			{
				$set : {	maxbid: bid,
				maxuser: msg.email
				}
			},function (err,result) {
				if(err){
					throw err;
				}
			}
		);
	console.log("here man");
			var currdate= new Date();
            month= currdate.getMonth()+1;
            var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
            bidmodel.itemid= itemid;
            bidmodel.timestamp= datestr;
            bidmodel.buyer= msg.email;
            bidmodel.bidprice= bid;
			bidmodel.save(function (err,result) {
				if(err){
					throw err;
				}
				else{
					res.code="200";
					callback(null,res);
				}
			});
			
};
