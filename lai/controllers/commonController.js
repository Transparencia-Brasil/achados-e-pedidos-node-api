(function() {

    var jwt = require('jsonwebtoken');
    var _ = require("underscore");
    var s = require("underscore.string");
    var async = require("async");
    var isNumeric = require("isnumeric");
    var pagination = require('pagination');
    var config = require('../config.js');
    var loggerService = require('../services/loggerService.js');
    var commonService = require('../services/commonService.js');
    var pedido = require('../models/pedido.js');
    var interacao = require('../models/interacao.js');
    var anexo = require('../models/anexo.js');
    var common = require('../models/common.js');

    module.exports = {

        teste: function(req, res, next) {

            var value = "pedidos";
            if (value) {

                async.parallel({

                    pedidos: function(callback) {

                        pedido.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    },

                    interacoes: function(callback) {

                        interacao.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    },

                    anexos: function(callback) {

                        anexo.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    }

                }, function(err, results) {
                    // results is now equals to: {one: 1, two: 2}

                    if (err) return res.status(500).send({ "success": false, message: err });

                    return res.json(results);

                });

            } else {

                return res.status(404).send({
                    error: {
                        source: 'controller',
                        message: 'O campo value é obrigatório.'
                    }
                });

            }
        },
        contar: function(req, res, next) {

            var value = req.body.value;

            if (value) {

                async.parallel({

                    pedidos: function(callback) {

                        pedido.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    },

                    interacoes: function(callback) {

                        interacao.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    },

                    anexos: function(callback) {

                        anexo.contar(value, function(err, result) {

                            if (err) {
                                console.log(err);
                                return res.status(err.status).send({ "success": false, message: err.message });
                            } else {
                                return callback(null, result);
                            }

                        });

                    }

                }, function(err, results) {
                    // results is now equals to: {one: 1, two: 2}

                    if (err) return res.status(500).send({ "success": false, message: err });

                    return res.json(results);

                });

            } else {

                return res.status(404).send({
                    error: {
                        source: 'controller',
                        message: 'O campo value é obrigatório.'
                    }
                });

            }
        },

        consultar: function(req, res, next) {

            var value = req.body.value;
            var currentPage = s.toNumber(req.body.currentPage);
            var from = 0;

            if (currentPage > 1) {
                from = (currentPage - 1) * config.itensPerPage;
            }

            if (currentPage == 0) {
                return res.status(400).send({
                    error: {
                        source: 'controller',
                        message: 'O campo "currentPage" deve ser um número inteiro e maior que zero.'
                    }
                });
            }

            if (value) {

                var b = commonService.preencheFormBodyParaConsulta(req.body)

                common.consultar(b, from, function(err, result) {

                    if (err) {
                        return res.status(500).send({
                            error: {
                                source: 'controller',
                                message: 'Falha na consulta.'
                            }
                        });
                    } else {

                        var paginator = new pagination.SearchPaginator({ current: currentPage, rowsPerPage: config.itensPerPage, totalResult: result.hits.total });

                        var x = {};
                        x.pagination = paginator.getPaginationData();
                        x.hits = result;

                        return res.json(x);

                    }
                });

            } else {

                return res.status(404).send({
                    error: {
                        source: 'controller',
                        message: 'O campo "value" é obrigatório.'
                    }
                });

            }

        },

        consultaSimples: function(req, res, next) {

            var value = req.body.value;
            var currentPage = s.toNumber(req.body.currentPage);
            var from = 0;

            if (currentPage > 1) {
                from = (currentPage - 1) * config.itensPerPage;
            }

            if (currentPage == 0) {
                return res.status(400).send({
                    error: {
                        source: 'controller',
                        message: 'O campo currentPage deve ser um número inteiro e maior que zero.'
                    }
                });
            }


            if (value) {

                common.consultaSimples(value, from, function(err, result) {

                    if (err) {
                        return res.status(500).send({
                            error: {
                                source: 'controller',
                                message: 'Falha na consulta.'
                            }
                        });
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

            } else {

                return res.status(404).send({
                    error: {
                        source: 'controller',
                        message: 'O campo value é obrigatório.'
                    }
                });

            }

        },


        forceMerge: function(req, res, next) {
            common.forceMerge(function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(err.status).send({ "success": false, message: err.message });
                } else {
                    return res.send({ "success": true, message: 'Merged!' });
                }

            }.bind(res));
        },


        buscaAvancada: function(req, res, next) {

            var value = req.body.value;
            var currentPage = s.toNumber(req.body.currentPage);
            var from = 0;

            if (currentPage > 1) {
                from = (currentPage - 1) * config.itensPerPage;
            }

            if (currentPage == 0) {
                return res.status(400).send({
                    error: {
                        source: 'controller',
                        message: 'O campo currentPage deve ser um número inteiro e maior que zero.'
                    }
                });
            }


            // if (value) {          

            var b = commonService.preencheFormBodyParaConsulta(req.body)

            common.buscaAvancada(b, from, function(err, result) {



                if (err) {
                    return res.status(500).send({
                        error: {
                            source: 'controller',
                            message: err
                        }
                    });
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

            // } else {

            //     return res.status(404).send({ 
            //         error : {
            //             source    : 'controller',
            //             message   : 'O campo value é obrigatório.'
            //         } 
            //     });

            // }

        }

    }

})();
