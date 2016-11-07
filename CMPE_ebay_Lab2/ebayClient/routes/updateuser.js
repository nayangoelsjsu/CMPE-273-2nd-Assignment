var mongodb= require('./mongodb');
var usermodel= new mongodb.userModel();
var mq_client = require('../rpc/client');

exports.updateuser= function (req,res) {
	
	var op = "updateuser";
	var msg_payload = { "operation": op, "email": req.session.email,"zip":req.param("zip"),"phone":req.param("phone"),"bday":req.param("bday"),"address":req.param("address"),"city":req.param("city"),"state":req.param("state")};
	mq_client.make_request('item_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				res.redirect('/profile');
			}
			else {
				console.log("Invalid");ejs.renderFile('./views/loginfail.ejs',function(err, result) {
			        if (!err) {
			            res.end(result);
			        }
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
				});
			}
		}  
	});

};