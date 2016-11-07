var mysql= require('mysql');

var conn=[];

for(var i=0;i<500;i++){
	conn.push(mysql.createConnection({
	host     : 'localhost',
    user     : 'root',
    password : 'qwerty12',
    database : 'ebay',
    port	 : 3306
  })
	);
}

function getConnection () {
	if(conn){
		return conn.pop();
	}	
}
exports.getConnection=getConnection;

function returnConnection (connection) {
	
	conn.push(connection);

}

exports.returnConnection= returnConnection;



