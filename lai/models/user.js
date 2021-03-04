(function () {

	var _               = require('underscore'); 
    var async           = require('async');
    var sql             = require('node-sqlserver-unofficial');
    var config          = require('../config.js');
    var loggerService   = require('../services/loggerService.js');

    module.exports = {

        login: function(email, pass, callback) {
            
            var query = "EXEC [Login] '"+ email +"','"+ pass +"'";
            
            sql.query(config.sqlserverPortalDB, query, function (err, results) {
                
                if (err) {
                    return callback("" + err);
                } else {
                    return callback(null, results[0]);
                }

            });

        }

    } 

})();