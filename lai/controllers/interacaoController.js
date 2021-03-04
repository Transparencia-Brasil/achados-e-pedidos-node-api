(function () {

    var jwt                 = require('jsonwebtoken');
    var _                   = require("underscore");
    var s                   = require("underscore.string");
    var isNumeric           = require("isnumeric");
    var config              = require('../config.js');
    var loggerService       = require('../services/loggerService.js');
    var interacaoService    = require('../services/interacaoService.js');
    var interacao           = require('../models/interacao.js');

    module.exports = {

        criar: function(req, res, next) {

            var pedidos_codigo      = req.body.pedidos_codigo;
            var codigo              = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/interacoes/gravar/99999'
                    } 
                });
            }

            if (!isNumeric(pedidos_codigo)) {
                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O campo pedidos_codigo é obrigatório e numérico.'
                    } 
                });
            }

            var i = interacaoService.preencheModel(codigo, req.body);

            interacao.criar(i, function (err, result) {         
                if (err) {
                    if (err.statusCode == 409) {
                        return res.status(409).send({ 
                            error : {
                                source    : 'controller',
                                message   : 'Documento já existe'
                            } 
                        });
                    } else {
                        return res.status(err.status).send({"result": "error", message: err.message});
                    }
                } else {
                    return res.json({"success": true});
                }
            });
           
        },

        gravar: function(req, res, next) {

            var pedidos_codigo      = req.body.pedidos_codigo;
            var codigo              = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/interacoes/gravar/99999'
                    } 
                });
            }

            if (!isNumeric(pedidos_codigo)) {
                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O campo pedidos_codigo é obrigatório e numérico.'
                    } 
                });
            }

            var i = interacaoService.preencheModel(codigo, req.body);

            interacao.gravar(i, function (err, result) {
                if (err) {
                    return res.status(err.status).send( { 'result' : 'error', 'message' : err.message } );
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
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/interacoes/apagar/99999'
                    } 
                });
            }

            interacao.apagar(codigo, function (err, result) {
                if (err) {
                    return res.status(err.status).send( { 'result': 'error', 'message': err.message});
                } else {
                    return res.json( { 'result' : 'success' } );
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

            interacao.contar(value, function (err, result) {
                if (err) {
                    console.log(err);
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

            interacao.consultar(value, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(err.status).send({"success": false, message: err.message});
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
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/interacoes/consultar/99999'
                    } 
                });
            }

            interacao.consultarPorId(codigo, function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {
                    return res.json(result._source);
                }

            });
           
        }

    }

})();