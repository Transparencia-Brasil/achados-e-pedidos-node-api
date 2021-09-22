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

        criar: function(anexo, callback) {

            var client = new elasticsearch.Client({
                host: 'localhost:9200'
                // log: 'trace'
            });

            client.create({
                index: 'anexos',
                type: 'data',
                id: anexo.anexos_codigo,
                body: anexo
            }, function (error, response) {

                console.log(error);
                console.log(response);

                if (error) return callback(error);

                return callback(null, response);

            });

        },
        
        gravarVarios: function(anexos, callback) {

            var client = new elasticsearch.Client({
                host: 'localhost:9200'
                // log: 'trace'
            });

            var items=[];
            anexos.forEach(element => {
                items.push({ index:  { _index: 'anexos', _type: 'data', _id: element.anexos_codigo }},element);
            });

            client.bulk({
                body: items
            },
            function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        gravar: function(anexo, callback) {

            var client = new elasticsearch.Client({
                host: 'localhost:9200'
                // log: 'trace'
            });

            client.index({
                index: 'anexos',
                type: 'data',
                id: anexo.anexos_codigo,
                body: anexo
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        apagar: function(codigo, callback) {

            client.delete({
                index: 'anexos',
                type: 'data',
                id: codigo
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        extractorUpdate: function(codigo, conteudoArquivo, callback) {

            client.update({
                index: 'anexos',
                type: 'data',
                id: codigo,
                body: {
                    doc: {
                        anexos_conteudo_arquivo: conteudoArquivo
                    }
                }
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            })

        },

        contar: function(value, callback) {

            client.count({
                index: 'anexos',
                type: 'data',
                body: {                    
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "anexos_arquivo", "anexos_conteudo_arquivo" ] 
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
                index: 'anexos',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "anexos_arquivo", "anexos_conteudo_arquivo" ] 
                        }
                    }
                }
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

        consultarPorCodigo: function(value, callback) {

            client.search({
                index: 'anexos',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "anexos_codigo" ] 
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
                index: 'anexos',
                type: 'data',
                id: codigo
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

        contarTodos: function(callback) {
            client.count({
                index: 'anexos',
                type: 'data',
                body: {
                    query : {
                        match_all : { }
                    }
                }
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response.count);
            });

        },

        listar:  function(callback) {
            client.search({
                index: 'anexos',
                type: 'data',
                body: {
                    query : {
                        match_all : { }
                    }
                }
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

        listarconteudo:  function(callback, from, size) {
            client.search({
                index: 'anexos',
                type: 'data',
                body: {
                    size: size,
                    from: from,
                    query : {
                        match_all : { }
                    }
                }
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

    } 

})();