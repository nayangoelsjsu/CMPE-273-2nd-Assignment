var mongodb= require('./mongodb');
var usermodel= new mongodb.userModel();

exports.updateuser= function (msg,callback) {
	console.log("here");
	console.log(msg.zip);
	var phone= msg.phone;
	var bday= msg.bday;
	var address= msg.address;
	var city= msg.city;
	var state= msg.state;
	var zip= msg.zip;
	var email= msg.email;
	mongodb.userModel.update({email:email},
			{
				$set: { phnumber: phone,
					bday:bday,
					address: address,
					city: city,
					state: state,
					zip: zip
				}
			}, function (err,result) {
				if(err){
					throw err;
				}
	});
	res.code="200";
	callback(null,res);
};