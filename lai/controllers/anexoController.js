(function () {

    var jwt             = require('jsonwebtoken');
    var _               = require("underscore");
    var s               = require("underscore.string");
    var isNumeric       = require("isnumeric");
    var config          = require('../config.js');
    var loggerService   = require('../services/loggerService.js');
    var anexoService    = require('../services/anexoService.js');
    var anexo           = require('../models/anexo.js');

    module.exports = {

        criar: function(req, res, next) {

            var pedidos_codigo      = req.body.pedidos_codigo;
            var interacoes_codigo   = req.body.interacoes_codigo;
            var codigo              = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/criar/99999'
                    } 
                });
            }

            if ((!isNumeric(pedidos_codigo)) || (!isNumeric(interacoes_codigo))) {
                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'Os campos pedidos_codigo e interacoes_codigo são obrigatórios e numéricos.'
                    } 
                });
            } 

            var a = anexoService.preencheModel(codigo, req.body);

            anexo.criar(a, function (err, result) {
                        
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
            var interacoes_codigo   = req.body.interacoes_codigo;
            var codigo              = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/gravar/99999'
                    } 
                });
            }

            if ((!isNumeric(pedidos_codigo)) || (!isNumeric(interacoes_codigo))) {
                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'Os campos pedidos_codigo e interacoes_codigo são obrigatórios e numéricos.'
                    } 
                });
            } 

            var anexoModel = anexo;            
            var a = anexoService.preencheModel(codigo, req.body);
            anexo.consultarPorId(codigo, function (err, result) {

                if (!err) {
                    a.anexos_conteudo_arquivo = result._source.anexos_conteudo_arquivo;
                    a.anexos_arquivo = result._source.anexos_arquivo;
                }

                anexoModel.gravar(a, function (errb, resultb) {   
                    if (errb) {
                        return res.status(errb.status).send({"result": "error", message: errb.message});
                    } else {
                        return res.json({"success": true});
                    }
                });
            });            
        },

        apagar: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/apagar/99999'
                    } 
                });
            }

            anexo.apagar(codigo, function (err, result) {
                if (err) {
                    return res.status(err.status).send({"result": "error", message: err.message});
                } else {
                    return res.json({"result": "success"});
                }
            });
            
        },

        extractorUpdate: function(req, res, next) {

            var codigo = req.params.codigo;
            var anexos_conteudo_arquivo = req.body.anexos_conteudo_arquivo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/extractor-update/99999'
                    } 
                });
            }

            if (!anexos_conteudo_arquivo) {
                return res.status(400).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O campo anexos_conteudo_arquivo é obrigatório.'
                    } 
                });
            } 
                
            anexo.extractorUpdate(codigo, anexos_conteudo_arquivo, function (err, result) {
                        
                if (err) {
                    return res.status(err.status).send({"result": "error", message: err.message});
                } else {
                    return res.json( { 'result': 'success' } );
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

            anexo.contar(value, function (err, result) {

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
                        
            anexo.consultar(value, function (err, result) {

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
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/consultar/99999'
                    } 
                });
            }

            anexo.consultarPorId(codigo, function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {
                    return res.json(result._source);
                }

            });
           
        }

    }

})();