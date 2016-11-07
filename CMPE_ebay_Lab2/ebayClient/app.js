var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  var mongoose = require('mongoose');
  var passport= require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var flash= require('connect-flash');
  var session= require('express-session');
  var cronjob = require('node-cron-job');
  var winston = require('winston');
  var mongo=require("connect-mongo")(session);
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
 
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://localhost/ebay');
app.set('views', __dirname + '/views');
cronjob.setJobsPath(__dirname + '/public/js/jobs.js');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({cookieName: 'session', secret: "fafadsfasfgfsgsa", resave: false, saveUninitialized: true, 
				 duration: 30 * 60 * 1000,activeDuration: 5 * 60 * 1000,
         store: new mongo({url:'mongodb://localhost/ebay'})
        }));
app.use(function(req, res, next) {
  res.locals.cart = req.session.cart;
  next();
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
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
  
// cronjob.startJob('first_job');

//app.get('/', routes.index);
app.get('/',function (req,res) {
    res.render('login',{errormessage:""});
});
app.get('/users', user.list);


// app.get('/login',function (req,res) {
// 		res.render('login',{errormessage:""});
// });

app.get('/signup',function (req,res) {
	res.render('signup');
});

// app.post('/signupuser',signupuser.signupuser);

app.post('/signupuser', passport.authenticate('signupuser', {

successRedirect :'/home',

failureRedirect :'/signup',

failureFlash : true,

session: false

}));



// app.post('/signinuser1',signinuser.signinuser);

app.get('/home',home.home);

app.get('/profile',profile.profile);

app.post('/regitem',regitem.regitem);

app.get('/additem',function (req,res) {
	res.render('additem');
});

app.get('/updateuser',updateuser.updateuser);

app.get('/itempage', itempage.itempage);

app.get('/addtocart',cart.addtocart);

app.get('/viewcart', cart.viewcart);

app.get('/cartdelete', cart.delete);

app.get('/cardvalidate', cart.cardvalidate);

app.post('/checkvalid',cart.checkvalid);

app.get('/validitypage', cart.validitypage);

app.get('/addtosession',cart.addtosession);

app.get('/purchaseditem', purchaseditem.purchaseditem);

app.get('/signout', signout.signout);

app.get('/bidplace', itempage.bidplace);

app.get('/solditem', solditem.solditem);

// app.post('/signinuser',signinuser.signinuser);

app.post('/signinuser', passport.authenticate('signinuser', {

successRedirect :'/home',

failureRedirect :'/',

failureFlash : true,

session: false

}));