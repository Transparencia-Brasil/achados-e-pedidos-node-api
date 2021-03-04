var mysql           = require('mysql');
var config          = require('../config.js');

var mysqlConnection = mysql.createConnection(config.mysql) ;
var query = 'CALL PreparaDashboard()';

mysqlConnection.query(query, function (error, results, fields) {
    mysqlConnection.end();
    if (error) console.log(error);
    console.log('Job well done soldier');
});
