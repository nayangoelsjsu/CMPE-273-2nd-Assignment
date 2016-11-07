//var mongodb= require('../../routes/mongodb');
var mongoose = require('mongoose');
 mongoose.set('debug', true);
 
 var regitemModel1=null;
 var cartModel1=null;

exports.first_job = {
    
    after: {                // Configuring this job to run after this period. 
        seconds: 10
    },
    job: function () {
            var currdate= new Date();
            var a =1;
            month= currdate.getMonth()+1;
            var datestr= month+"/"+currdate.getDate()+"/"+currdate.getFullYear()+"@"+currdate.getHours()+":"+currdate.getMinutes();
            console.log("cron chalgaya");

mongoose.connect('mongodb://localhost/ebay');
console.log("conn");
var Schema = mongoose.Schema;
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
            
            console.log("im hereeee");
            if(regitemModel1==null){
   regitemModel1 = mongoose.model("regitem", regitem_schema);
   cartModel1= mongoose.model("cart",cart_schema);}

    console.log("after model");
    var cartmodel= new cartModel1();
            console.log("here ke baad");
            regitemModel1.find({auction: "Auction", quantity: { $gt: 0 }},function (err,result) {
                console.log("in regitem");
                if(err){
                    
                    throw err;
                }
                else{
                    console.log("in second find");
                    for(i=0;i<result.length;i++){
                        if(result[i].expiredate === datestr){
                            cartmodel.itemid=result[i]._id;
                            cartmodel.name= result[i].name;
                            cartmodel.price= result[i].price;
                            cartmodel.quantity= result[i].quantity;
                            cartmodel.description= result[i].description;
                            cartmodel.type= result[i].type;
                            cartmodel.auction= result[i].auction;
                            cartmodel.available= result[i].available;
                            cartmodel.seller= result[i].uid;
                            cartmodel.buyer= result[i].maxuser;
                            cartmodel.save(function (err,result) {
                                if(err){
                               
                                    throw err;
                                }
                                else{
                               
                                    console.log("done");
                                }
                            });
                        }
                    }
               }
           });
           console.log("cron over");
           mongoose.connection.close()
    },
    spawn: true             
}