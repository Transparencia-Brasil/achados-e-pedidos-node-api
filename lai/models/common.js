(function() {

    var _ = require('underscore');
    var elasticsearch = require('elasticsearch');
    var async = require('async');
    var config = require('../config.js');
    var loggerService = require('../services/loggerService.js');

    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        requestTimeout: 60000
    });


    module.exports = {

        contar: function(value, callback) {

            client.count({
                index: ['pedidos', 'interacoes', 'anexos'],
                type: 'data',
                body: {
                    query: {
                        bool: {
                            should: [
                                { match: { "anexos_conteudo_arquivo": value } },
                                { match: { "interacoes_descricao_local": value } },
                                { match: { "pedidos_titulo_local": value } },
                                { match: { "pedidos_descricao_local": value } }
                            ]
                        }
                    }
                }
            }, function(error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

        forceMerge: function(callback) {
            client.indices.forcemerge({
                index: ['pedidos', 'interacoes', 'anexos']
            }, function(error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });
        },

        consultar: function(data, from, callback) {

            // var dateFrom = '2016-01-04';
            // var dateTo = '2016-10-11';

            // var dateFrom = '';
            // var dateTo = '';

            var query = {};
            query.bool = {};
            query.bool.should = [];

            var p1 = {};
            p1.bool = {};
            p1.bool.must = [];
            p1.bool.must.push({ match: { pedidos_titulo_local: data.value } });

            var p2 = {};
            p2.bool = {};
            p2.bool.must = [];
            p2.bool.must.push({ match: { pedidos_descricao_local: data.value } });


            var i = {};
            i.bool = {};
            i.bool.must = [];
            i.bool.must.push({ match: { interacoes_descricao_local: data.value } });


            var a = {};
            a.bool = {};
            a.bool.must = [];
            a.bool.must.push({ match: { anexos_conteudo_arquivo: data.value } });

            if (data.dataDe && data.dataAte) {
                p1.bool.must.push({ range: { "pedidos_data_envio_local": { "gte": data.dataDe } } });
                p1.bool.must.push({ range: { "pedidos_data_envio_local": { "lt": data.dataAte } } });
                p2.bool.must.push({ range: { "pedidos_data_envio_local": { "gte": data.dataDe } } });
                p2.bool.must.push({ range: { "pedidos_data_envio_local": { "lt": data.dataAte } } });
                i.bool.must.push({ range: { "pedidos_data_envio": { "gte": data.dataDe } } });
                i.bool.must.push({ range: { "pedidos_data_envio": { "lt": data.dataAte } } });
                a.bool.must.push({ range: { "pedidos_data_envio": { "gte": data.dataDe } } });
                a.bool.must.push({ range: { "pedidos_data_envio": { "lt": data.dataAte } } });
            }

            p1.bool.filter = [];
            p2.bool.filter = [];
            i.bool.filter = [];
            a.bool.filter = [];

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

            if (data.chkPedidosRecursoSim == 'true') {
                tipo_pedido_resposta = [4, 5, 6, 7, 8, 9, 10, 11];
            }
            if (data.chkPedidosRecursoNao == 'true') {
                tipo_pedido_resposta = [1, 2, 3];
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
                p1.bool.filter.push({ terms: { tipo_pedido_situacao_codigo_local: tipo_pedido_situacao } });
                p2.bool.filter.push({ terms: { tipo_pedido_situacao_codigo_local: tipo_pedido_situacao } });
                i.bool.filter.push({ terms: { tipo_pedido_situacao_codigo: tipo_pedido_situacao } });
                a.bool.filter.push({ terms: { tipo_pedido_situacao_codigo: tipo_pedido_situacao } });
            }

            if (tipo_pedido_resposta.length > 0) {
                p1.bool.filter.push({ terms: { tipo_pedidos_resposta_codigo: tipo_pedido_resposta } });
                p2.bool.filter.push({ terms: { tipo_pedidos_resposta_codigo: tipo_pedido_resposta } });
                i.bool.filter.push({ terms: { tipo_pedidos_resposta_codigo_local: tipo_pedido_resposta } });
                a.bool.filter.push({ terms: { tipo_pedidos_resposta_codigo: tipo_pedido_resposta } });
            }

            if (status_pedido.length > 0) {
                p1.bool.filter.push({ terms: { status_pedido_codigo_local: status_pedido } });
                p2.bool.filter.push({ terms: { status_pedido_codigo_local: status_pedido } });
                i.bool.filter.push({ terms: { status_pedido_codigo: status_pedido } });
                a.bool.filter.push({ terms: { status_pedido_codigo: status_pedido } });
            }

            if (tipo_nivel_federativo.length > 0) {
                p1.bool.filter.push({ terms: { tipo_nivel_federativo_codigo_local: tipo_nivel_federativo } });
                p2.bool.filter.push({ terms: { tipo_nivel_federativo_codigo_local: tipo_nivel_federativo } });
                i.bool.filter.push({ terms: { tipo_nivel_federativo_codigo: tipo_nivel_federativo } });
                a.bool.filter.push({ terms: { tipo_nivel_federativo_codigo: tipo_nivel_federativo } });
            }

            if (tipo_poder.length > 0) {
                p1.bool.filter.push({ terms: { tipo_poder_codigo_local: tipo_poder } });
                p2.bool.filter.push({ terms: { tipo_poder_codigo_local: tipo_poder } });
                i.bool.filter.push({ terms: { tipo_poder_codigo: tipo_poder } });
                a.bool.filter.push({ terms: { tipo_poder_codigo: tipo_poder } });
            }

            query.bool.should.push(p1);
            query.bool.should.push(p2);
            query.bool.should.push(i);
            query.bool.should.push(a);

            client.search({
                index: ['pedidos', 'interacoes', 'anexos'],
                type: 'data',
                from: from,
                size: config.itensPerPage,
                body: {
                    query: query,
                    highlight: {
                        fields: {
                            "anexos_conteudo_arquivo": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "interacoes_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_titulo_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 }
                        }
                    }
                }
            }, function(error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },

        consultaSimples: function(value, from, callback) {

            client.search({
                index: ['pedidos', 'interacoes', 'anexos'],
                type: 'data',
                from: from,
                size: config.itensPerPage,
                body: {
                    query: {
                        bool: {
                            should: [
                                { match: { "anexos_conteudo_arquivo": value } },
                                { match: { "interacoes_descricao_local": value } },
                                { match: { "pedidos_titulo_local": value } },
                                { match: { "pedidos_descricao_local": value } }
                            ]
                        }
                    },
                    highlight: {
                        fields: {
                            "anexos_conteudo_arquivo": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "interacoes_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_titulo_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 }
                        }
                    }
                }
            }, function(error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        },





        buscaAvancada: function(data, from, callback) {

            var query = {};
            query.bool = {};
            query.bool.should = [];

            var finalValue = data.value.replace(/˜/g, '~').replace(/ˆ/g, '^')

            // console.log(finalValue)

            var qsP = {
                bool: {
                    must: []
                }
            };


            var qsI = {
                bool: {
                    must: []
                }
            };

            var qsA = {
                bool: {
                    must: []
                }
            };

            if (finalValue) {
                qsP.bool.must.push({ query_string: { fields: ['pedidos_titulo_local', 'pedidos_descricao_local'], query: finalValue } });
                qsI.bool.must.push({ query_string: { fields: ['interacoes_descricao_local'], query: finalValue } });
                qsA.bool.must.push({ query_string: { fields: ['anexos_conteudo_arquivo'], query: finalValue } });
            }

            if (data.enviadoPara.length > 0) {

                var enviadoPara = '';

                _.each(data.enviadoPara, function(envPara) {
                    enviadoPara += '"' + envPara.replace(/˜/g, '~').replace(/ˆ/g, '^') + '" '
                })

                // console.log(enviadoPara)
                qsP.bool.must.push({ query_string: { fields: ['agentes_nome_local'], query: enviadoPara } });
                qsI.bool.must.push({ query_string: { fields: ['agentes_nome'], query: enviadoPara } });
                qsA.bool.must.push({ query_string: { fields: ['agentes_nome'], query: enviadoPara } });

            }

            if (data.por) {

                var por = '"' + data.por.replace(/˜/g, '~').replace(/ˆ/g, '^') + '"'

                qsP.bool.must.push({ query_string: { fields: ['usuarios_nome_local'], query: por } });
                qsI.bool.must.push({ query_string: { fields: ['usuarios_nome'], query: por } });
                qsA.bool.must.push({ query_string: { fields: ['usuarios_nome'], query: por } });

            }

            if (data.dataDe && data.dataAte) {

                qsP.bool.must.push({ range: { "pedidos_data_envio_local": { "gte": data.dataDe } } });
                qsP.bool.must.push({ range: { "pedidos_data_envio_local": { "lt": data.dataAte } } });

                qsI.bool.must.push({ range: { "pedidos_data_envio": { "gte": data.dataDe } } });
                qsI.bool.must.push({ range: { "pedidos_data_envio": { "lt": data.dataAte } } });

                qsA.bool.must.push({ range: { "pedidos_data_envio": { "gte": data.dataDe } } });
                qsA.bool.must.push({ range: { "pedidos_data_envio": { "lt": data.dataAte } } });
            }

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

            if (data.chkPedidosRecursoSim == 'true') {
                tipo_pedido_resposta = [4, 5, 6, 7, 8, 9, 10, 11];
            }
            if (data.chkPedidosRecursoNao == 'true') {
                tipo_pedido_resposta = [1, 2, 3];
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
                qsP.bool.must.push({ terms: { tipo_pedido_situacao_codigo_local: tipo_pedido_situacao } });
                qsI.bool.must.push({ terms: { tipo_pedido_situacao_codigo: tipo_pedido_situacao } });
                qsA.bool.must.push({ terms: { tipo_pedido_situacao_codigo: tipo_pedido_situacao } });
            }

            if (tipo_pedido_resposta.length > 0) {
                qsP.bool.must.push({ terms: { tipo_pedidos_resposta_codigo: tipo_pedido_resposta } });
                qsI.bool.must.push({ terms: { tipo_pedidos_resposta_codigo_local: tipo_pedido_resposta } });
                qsA.bool.must.push({ terms: { tipo_pedidos_resposta_codigo: tipo_pedido_resposta } });
            }

            if (status_pedido.length > 0) {
                qsP.bool.must.push({ terms: { status_pedido_codigo_local: status_pedido } });
                qsI.bool.must.push({ terms: { status_pedido_codigo: status_pedido } });
                qsA.bool.must.push({ terms: { status_pedido_codigo: status_pedido } });
            }

            if (tipo_nivel_federativo.length > 0) {
                qsP.bool.must.push({ terms: { tipo_nivel_federativo_codigo_local: tipo_nivel_federativo } });
                qsI.bool.must.push({ terms: { tipo_nivel_federativo_codigo: tipo_nivel_federativo } });
                qsA.bool.must.push({ terms: { tipo_nivel_federativo_codigo: tipo_nivel_federativo } });
            }

            if (tipo_poder.length > 0) {
                qsP.bool.must.push({ terms: { tipo_poder_codigo_local: tipo_poder } });
                qsI.bool.must.push({ terms: { tipo_poder_codigo: tipo_poder } });
                qsA.bool.must.push({ terms: { tipo_poder_codigo: tipo_poder } });
            }

            query.bool.should.push(qsP);
            query.bool.should.push(qsI);
            query.bool.should.push(qsA);

            var order = {};
            if (data.scope_search.length == 1 && data.scope_search[0] == 'pedidos') {
                order = { "pedidos_codigo_local": { "order": "desc" } }
            }

            client.search({
                index: data.scope_search,
                type: 'data',
                from: from,
                size: config.itensPerPage,
                body: {
                    query: query,
                    sort: order,
                    highlight: {
                        fields: {
                            "anexos_conteudo_arquivo": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "interacoes_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_titulo_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 },
                            "pedidos_descricao_local": { "fragment_size": config.highlightStringSize, "number_of_fragments": 3 }
                        }
                    }
                }
            }, function(error, response) {
                if (error) return callback(error);
                return callback(null, response);
            });

        }

    }

})();