var mysql           = require('mysql');
var fs              = require('fs');

var config          = require('../config.js');

var mysqlConnection = mysql.createConnection(config.mysql);
var query = 'select Mes, Ano, NomeAgente, Poder, NivelFederativo, Uf, Cidade, StatusPedido, SituacaoPedido, UltimaInteracao, TempoPrimeiraResposta, TempoRespostaFinal, TeveRecurso from dashboard;';

mysqlConnection.query(query, function (error, results, fields) {
    mysqlConnection.end();
    if (error) console.log(error);
    
    var data = JSON.stringify(results);
    
    fs.writeFile(config.assetsFolder, data, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

});


