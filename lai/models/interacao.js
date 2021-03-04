(function () {

	var _               = require('underscore'); 
    var elasticsearch   = require('elasticsearch');
    var async           = require('async');
    var config          = require('../config.js');
    var loggerService   = require('../services/loggerService.js');

    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        requestTimeout: 60000
    });

    module.exports = {

        criar: function(interacao, callback) {

            client.create({
                index: 'interacoes',
                type: 'data',
                id: interacao.interacoes_codigo_local,
                body: interacao
            }, function (error, response) {

                console.log(error);
                console.log(response);

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        gravar: function(interacao, callback) {

            client.index({
                index: 'interacoes',
                type: 'data',
                id: interacao.interacoes_codigo_local,
                body: interacao
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        apagar: function(codigo, callback) {

            client.delete({
                index: 'interacoes',
                type: 'data',
                id: codigo
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        contar: function(value, callback) {

            client.count({
                index: 'interacoes',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "tipo_pedidos_resposta_nome_local", "interacoes_descricao_local" ] 
                        }
                    }
                }
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response.count);

            });

        },

        consultar: function(value, callback) {

            client.search({
                index: 'interacoes',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "tipo_pedidos_resposta_nome_local", "interacoes_descricao_local" ] 
                        }
                    }
                }
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },
        
        consultarPorId: function(codigo, callback) {

            client.get({
                index: 'interacoes',
                type: 'data',
                id: codigo
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        }

    } 

})();