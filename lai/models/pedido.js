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

        //2017-01-22 Paulo Campos: Criei esta função para listar todos os pedidos sem queries
        listar: function(data, from, callback) {

            var query = {};
            query.bool = {};
            query.bool.should = [];

            var p1 = {};
            p1.bool = {};
            p1.bool.must = [];


            if (data.dataDe && data.dataAte) {
                p1.bool.must.push( { range: { "pedidos_data_envio_local" : { "gte" : data.dataDe }}} );
                p1.bool.must.push( { range: { "pedidos_data_envio_local" : { "lt" : data.dataAte }}} );
            }

            p1.bool.filter = [];

            var tipo_pedido_situacao = [];
            var status_pedido = [];
            var tipo_nivel_federativo = [];
            var tipo_poder = [];
            var tipo_pedido_resposta = [];

            if (data.chkEmTramitacao == 'true') {
                tipo_pedido_situacao.push(1);
            } 
            if (data.chkFinalizada == 'true') {
                tipo_pedido_situacao.push(2);
            } 

            //2017-10-02 Paulo Campos: Adicionado filtro 
            if (data.chkNaoObteveResposta == 'true') {
                tipo_pedido_situacao.push(3);
            }             

            if (data.chkPedidosRecursoSim == 'true' ) {
                tipo_pedido_resposta = [4,5,6,7,8,9,10,11];
            }
            if (data.chkPedidosRecursoNao == 'true' ) {
                tipo_pedido_resposta = [1,2,3];
            }

            if (data.chkAtendido == 'true') {
                status_pedido.push(1);
            }
            if (data.chkNaoAtendido == 'true') {
                status_pedido.push(2);
            }
            if (data.chkParcAtendido == 'true') {
                status_pedido.push(3);
            }

            if (data.chkFederal == 'true') {
                tipo_nivel_federativo.push(1);
            }
            if (data.chkEstadual == 'true') {
                tipo_nivel_federativo.push(2);
            }
            if (data.chkMunicipal == 'true') {
                tipo_nivel_federativo.push(3);
            }

            if (data.chkLegislativo == 'true') {
                tipo_poder.push(1);
            }
            if (data.chkExecutivo == 'true') {
                tipo_poder.push(2);
            }
            if (data.chkJudiciario == 'true') {
                tipo_poder.push(3);
            }
            if (data.chkMinisterio == 'true') {
                tipo_poder.push(4);
            }


            if (tipo_pedido_situacao.length > 0) {
                p1.bool.filter.push( { terms : { tipo_pedido_situacao_codigo_local : tipo_pedido_situacao } } );
            }

            if (tipo_pedido_resposta.length > 0) {
                p1.bool.filter.push( { terms : { tipo_pedidos_resposta_codigo : tipo_pedido_resposta } } );
            }

            if (status_pedido.length > 0) {
                p1.bool.filter.push( { terms : { status_pedido_codigo_local : status_pedido } } );
            }

            if (tipo_nivel_federativo.length > 0) {
                p1.bool.filter.push( { terms : { tipo_nivel_federativo_codigo_local : tipo_nivel_federativo } } );
            }

            if (tipo_poder.length > 0) {
                p1.bool.filter.push( { terms : { tipo_poder_codigo_local : tipo_poder } } );
            }

            query.bool.should.push(p1);

            client.search({
                index: 'pedidos',
                type: 'data',
                from: from,
                size : config.itensPerPage,
                body: {
                    query : query
                    ,sort: { "pedidos_codigo_local":   { "order": "desc" }}
                    //2017-01-22 Paulo Campos: Preciso ver com calma: success":false,"message":"[illegal_argument_exception] Fielddata is disabled on text fields by default. Set fielddata=true on [pedidos_codigo_local] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory.
                }

            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },
        searchAsYouType: function(field, data, callback) {

            var obj =  _.object([field], [data]);

            client.search({
                index: 'pedidos',
                type: 'data',
                _source: field,
                from: 0, 
                size: 5,
                filter_path: 'hits.hits._source',
                body: {
                    query: {
                        match_phrase_prefix : obj
                        //  {
                        //     Pedidos_Titulo : data
                        // }
                    }
                }
            }).then(function (resp) {

                if (resp.hits) { 
                    return callback(null, resp.hits.hits);
                } else {
                    return callback(null, []);
                }
            }, function (err) {

                return callback(err);

            });

        },

        searchAsYouTypeEnviadoPara: function(data, callback) {

            client.search({
                index: 'pedidos',
                type: 'data',
                from: 0, 
                size: 10000,
                _source: 'agentes_nome_local',
                filter_path: 'hits.hits._source.agentes_nome_local',
                body: {
                    query: {
                        match_phrase_prefix : {
                            agentes_nome_local : data
                        }
                    }
                }
            }).then(function (resp) {

                if (resp.hits) { 
                    return callback(null, resp.hits.hits);
                } else {
                    return callback(null, []);
                }
            
            }, function (err) {

                return callback(err);

            });            

        },

        searchAsYouTypePor: function(data, callback) {

            client.search({
                index: 'pedidos',
                type: 'data',
                from: 0, 
                size: 10000,
                _source: 'usuarios_nome_local',
                filter_path: 'hits.hits._source.usuarios_nome_local',
                body: {
                    query: {
                        match_phrase_prefix : {
                            usuarios_nome_local : data
                        }
                    }
                }
            }).then(function (resp) {

                if (resp.hits) { 
                    return callback(null, resp.hits.hits);
                } else {
                    return callback(null, []);
                }
            
            }, function (err) {

                return callback(err);

            });            

        },

        criar: function(pedido, callback) {

            client.create({
                index: 'pedidos',
                type: 'data',
                id: pedido.pedidos_codigo_local,
                body: pedido
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        salvar: function(pedido, callback) {

            client.index({
                index: 'pedidos',
                type: 'data',
                id: pedido.pedidos_codigo_local,
                body: pedido
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        apagar: function(codigo, callback) {

            client.delete({
                index: 'pedidos',
                type: 'data',
                id: codigo
            }, function (error, response) {

                if (error) return callback(error);

                return callback(null, response);

            });

        },

        contar: function(value, callback) {

            client.count({
                index: 'pedidos',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "usuarios_nome_local", "usuarios_email_local", "agentes_nome_local", "tipo_pedido_situacao_nome_local", 
                            "status_pedido_nome_local", "status_pedido_interno_nome_local", "tipo_pedido_origem_nome_local", "tipo_poder_nome_local", 
                            "tipo_nivel_federativo_nome_local", "pedidos_titulo_local", "pedidos_descricao_local", "pedidos_enviado_para_local" ] 
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
                index: 'pedidos',
                type: 'data',
                body: {
                    query : {
                        multi_match : {
                            query:    value, 
                            fields: [ "usuarios_nome_local", "usuarios_email_local", "agentes_nome_local", "tipo_pedido_situacao_nome_local", 
                            "status_pedido_nome_local", "status_pedido_interno_nome_local", "tipo_pedido_origem_nome_local", "tipo_poder_nome_local", 
                            "tipo_nivel_federativo_nome_local", "pedidos_titulo_local", "pedidos_descricao_local", "pedidos_enviado_para_local" ] 
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
                index: 'pedidos',
                type: 'data',
                id: codigo
            }, function (error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        }

    } 

})();
