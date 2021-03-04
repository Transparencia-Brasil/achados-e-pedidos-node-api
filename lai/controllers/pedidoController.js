(function () {

    var jwt             = require('jsonwebtoken');
    var _               = require("underscore");
    var s               = require("underscore.string");
    var isNumeric       = require("isnumeric");
    var config          = require('../config.js');
    var loggerService   = require('../services/loggerService.js');
    var pedidoService   = require('../services/pedidoService.js');
    var pedido          = require('../models/pedido.js');
    //2017-01-22 Paulo Campos: Adicionado pagination e commonService.js
    var pagination      = require('pagination');
    var commonService   = require('../services/commonService.js');

    module.exports = {

        //2017-01-22 Paulo Campos: Criei esta função para listar todos os pedidos sem queries
        listar: function(req, res, next) {

            var value       = req.body.value;
            var currentPage = s.toNumber(req.body.currentPage);
            var from        = 0;

            if (currentPage > 1) {
                from = (currentPage - 1) * config.itensPerPage;
            }

            if (currentPage == 0) {
                return res.status(400).send({
                    error : {
                        source    : 'controller',
                        message   : 'O campo currentPage deve ser um número inteiro e maior que zero.'
                    }
                });
            }

            var b = commonService.preencheFormBodyParaConsulta(req.body)
            pedido.listar(b, from,function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {

                    var conf = {
                        current: currentPage,
                        rowsPerPage: config.itensPerPage,
                        totalResult: result.hits.total
                    }

                    var paginator = new pagination.SearchPaginator(conf);

                    var x = {};
                    x.pagination = paginator.getPaginationData();
                    x.hits = result;

                    return res.json(x);
                }

            });
        },

        searchAsYouType: function(req, res, next) {

            var field = 'pedidos_titulo_local';
            var data = req.body.data;

            if (field && data) {

                pedido.searchAsYouType(field, data, function (err, content) {

                    if (err) {
                        loggerService.error(err, { service : 'search', source : 'controller/searchAsYouType' });
                        return res.status(500).send({
                            error : {
                                source    : 'search',
                                message   : err
                            } 
                        });

                    } else {

                        var arr = [];
                        var i = '';

                        _.each(content, function(item) {
                            i = _.values(item._source)[0];
                            arr.push(s(i).prune(65)._wrapped);
                        });

                        return res.json(arr);

                    }
                });

            } else {

                return res.json([]);
            }

        },

        searchAsYouTypeEnviadoPara: function(req, res, next) { 

            var data = req.body.data;

            if (data) {

                pedido.searchAsYouTypeEnviadoPara(data, function (err, content) { 

                    if (err) {
                        
                        loggerService.error(err, { service : 'search', source : 'controller/searchAsYouTypeEnviadoPara' });
                        
                        return res.status(500).send({ 
                            error : {
                                source    : 'search',
                                message   : err
                            } 
                        });

                    } else {

                        var arr = [];
                        
                        _.each(content, function(item) {
                            arr.push(item._source.agentes_nome_local);
                            // arr.push(s(i).prune(65)._wrapped);
                            
                        });

                        return res.json(_.uniq(arr));

                    }
               
                });

            } else {

                return res.json([]);
            }

        },



        searchAsYouTypePor: function(req, res, next) { 

            var data = req.body.data;

            if (data) {

                pedido.searchAsYouTypePor(data, function (err, content) { 

                    if (err) {
                        
                        loggerService.error(err, { service : 'search', source : 'controller/searchAsYouTypePor' });
                        
                        return res.status(500).send({ 
                            error : {
                                source    : 'search',
                                message   : err
                            } 
                        });

                    } else {

                        var arr = [];
                        
                        _.each(content, function(item) {
                            arr.push(item._source.usuarios_nome_local);
                        });

                        return res.json(_.uniq(arr));

                    }
               
                });

            } else {

                return res.json([]);
            }

        },
        

        criar: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/pedidos/criar/99999'
                    }
                });
            }
            var p = pedidoService.preencheModel(codigo, req.body);

            pedido.criar(p, function (err, result) {
                if (err) {
                    if (err.statusCode == 409) {
                        return res.status(409).send({
                            error : {
                                source    : 'controller',
                                message   : 'Documento já existe'
                            }
                        });
                    } else {
                        return res.status(err.status).send( { 'result': 'error', 'message' : err.message } );
                    }
                } else {
                    return res.json( { "success": true } );
                }

            });

        },

        gravar: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/pedidos/gravar/99999'
                    }
                });
            }

            var p = pedidoService.preencheModel(codigo, req.body);

            pedido.salvar(p, function (err, result) {
                if (err) {
                    return res.status(err.status).send( { 'result' : 'error', message : err.message } );
                } else {
                    return res.json( { 'success' : true } );
                }
            });
        },

        apagar: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/pedidos/apagar/99999'
                    }
                });
            }

            pedido.apagar(codigo, function (err, result) {
                if (err) {
                    return res.status(err.status).send({"success": false, message: err.message});
                } else {
                    return res.json({"success": true});
                }
            });
        },

        contar: function(req, res, next) {

            var value = req.body.value;

            if (!value) {

                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O campo value é obrigatório.'
                    } 
                });
            }

            pedido.contar(value, function (err, result) {

                if (err) {
                    return res.status(err.status).send({"success": false, message: err.message});
                } else {
                    return res.json(result);
                }

            });

        },
        consultar: function(req, res, next) {

            var value = req.body.value;

            if (!value) {

                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O campo value é obrigatório.'
                    } 
                });
            }

            pedido.consultar(value, function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {
                    return res.json(result.hits);
                }

            });
        },

        consultarPorId: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/pedidos/consultar/99999'
                    } 
                });
            }

            pedido.consultarPorId(codigo, function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {
                    return res.json(result._source);
                }

            });
        }

    }

})();
