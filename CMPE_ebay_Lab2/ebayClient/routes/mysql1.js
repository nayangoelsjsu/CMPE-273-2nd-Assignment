var ejs= require('ejs');
var mysql = require('mysql');
var pooling= require('./pooling');

	
var pool= pooling.getConnection();

function push(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
		  pool.query( sqlQuery,  function(err, rows){
		  	if(err)	{
		  		console.log("ERROR: " + err.message);
		  	}
		  });
		  pooling.returnConnection(pool);
}

exports.push=push;

function fetchData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	pool.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	pooling.returnConnection(pool);
}
exports.fetchData=fetchData;