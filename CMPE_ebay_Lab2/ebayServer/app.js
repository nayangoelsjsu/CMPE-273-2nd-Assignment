var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  var amqp = require('amqp')
, util = require('util');
  var mongoose = require('mongoose');
  var session= require('express-session');
  var cronjob = require('node-cron-job');
  var winston = require('winston');
  var bCrypt= require('bcrypt');
  var signupuser= require('./routes/signupuser');
  var signinuser= require('./routes/signinuser');
  var profile= require('./routes/profile');
  var regitem= require('./routes/regitem');
  var updateuser= require("./routes/updateuser");
  var home= require('./routes/home');
  var itempage= require('./routes/itempage');
  var cart= require('./routes/cart');
  var purchaseditem= require('./routes/purchaseditem');
  var signout= require('./routes/signout');
  var solditem= require('./routes/solditem');
  var signinuser1= require('./routes/signinuser1');
mongoose.connect('mongodb://localhost/ebay?pool=100');
var cnn = amqp.createConnection({ host: "localhost", port: 5672 }); 
var app = express();
cronjob.setJobsPath(__dirname + '/public/js/jobs.js');


cnn.on('ready', function () {
      console.log("listening on user_queue");
  cnn.queue('user_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      if(message.operation == "check_user")
        {
        console.log("check if user matches");
        signinuser.signinuser(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
        }

      else if(message.operation=="signup_user"){
           console.log("signup user");
        signupuser.signupuser(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="profile"){
           console.log("user profile");
        profile.profile(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="updateuser"){
           console.log("update profile");
        updateuser.updateuser(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }


});
  });


  cnn.queue('item_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      if(message.operation == "load_home")
        {
        console.log("loading home");
        home.home(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
        }

      else if(message.operation=="add_to_cart"){
         console.log("adding to cart");
        cart.addtocart(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });

      }

      else if(message.operation=="checkvalid"){
           console.log("checking valid");
        cart.checkvalid(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="itempage"){
           console.log("loading itempage");
        itempage.itempage(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="bidplace"){
           console.log("hitting bidplace");
        itempage.bidplace(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="regitem"){
           console.log("hitting bidplace");
        regitem.regitem(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="solditem"){
           console.log("hitting bidplace");
        solditem.solditem(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="purchaseditem"){
           console.log("hitting bidplace");
        purchaseditem.purchaseditem(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

      else if(message.operation=="signout"){
           console.log("hitting bidplace");
        signout.signout(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      
      });
      }

    });
  });


});

  winston.add(
    winston.transports.File, {
      filename: 'eventlog.log',
      level: 'info',
      json: true,
      eol: 'rn', // for Windows, or `eol: ‘n’,` for *NIX OSs
      timestamp: true
    }
  );
  
cronjob.startJob('first_job');
