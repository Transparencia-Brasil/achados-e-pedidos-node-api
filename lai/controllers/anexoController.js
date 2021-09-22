const JSZip = require('jszip');
const { assetsFolder } = require('../config.js');

(function () {

    var jwt             = require('jsonwebtoken');
    var _               = require("underscore");
    var s               = require("underscore.string");
    var isNumeric       = require("isnumeric");
    var config          = require('../config.js');
    var loggerService   = require('../services/loggerService.js');
    var anexoService    = require('../services/anexoService.js');
    var anexo           = require('../models/anexo.js');
    var jszip           = require("jszip");
    var FileSaver       = require('file-saver');

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

        gravarVarios: function(req, res, next) {

            var dataSet = [];

            req.body.forEach(element => {
                var a = anexoService.preencheModel(element.anexos_codigo, element);

                dataSet.push(a);
            });

         
            anexo.gravarVarios(dataSet, function (err, result) {   
                if (err) {
                    return res.status(err.status).send({"result": "error", message: err.message});
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

            var a = anexoService.preencheModel(codigo, req.body);

            anexo.gravar(a, function (err, result) {   
                if (err) {
                    return res.status(err.status).send({"result": "error", message: err.message});
                } else {
                    return res.json({"success": true});
                }
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

        listar: function(req, res, next) {
                        
            anexo.listar(function (err, result) {

                if (err) {
                    console.log(err);
                    return res.status(err.status).send({"success": false, message: err.message});
                } else {
                    return res.json(result.hits);
                }

            });
           
        },

        listarconteudo: function(req, resp, next) {             
            const zip = new JSZip();
            
            anexo.contarTodos(function (err, count) {
                if (err) {
                    console.log(err);
                    return resp.status(err.status).send({"success": false, message: err.message});
                } else {   
                    var pages = Math.ceil(count / 1000);   
                    var cFrom = 0;
                    var pagesToDo = pages;

                    console.log("Extraindo TODOS anexos...");
                    var iQtd = 0;

                    for (let iPage = 0; iPage < pages; iPage++) {
                        cFrom = iPage * 1000;
                        console.log("Pagina " + iPage);

                        anexo.listarconteudo(function (err, res) {
                            if (err) {
                                console.log(err);
                                return resp.status(err.status).send({"success": false, message: err.message});
                            } else {

                                res.hits.hits.forEach(itm => {
                                    var item = itm._source;
                                    
                                    var nome = item.anexos_codigo + "_" + item.pedidos_codigo + ".json";
                                  //  zip.file(nome, item.anexos_codigo + "|" + item.pedidos_codigo + "|" + item.pedidos_titulo + "|" 
                                  //      + item.agentes_nome + "|" + item.usuarios_nome + "\r\n|" + item.anexos_conteudo_arquivo);

                                    zip.file(nome, JSON.stringify(item));
                                    iQtd++;

                                    console.log("Anexo " + iQtd);
                                });    
                                
                                zip.file("total.txt", JSON.stringify(iQtd));
                            } 
                            
                            pagesToDo--;

                            if(pagesToDo == 0) {                                        
                                // Salva o Arquivo
                                zip.generateAsync({type: 'nodebuffer'})
                                .then(function(content)
                                {
                                    resp.setHeader('Content-type', 'application/zip');
                                    resp.setHeader('Content-disposition', 'attachment; filename=anexos.zip');
                                    resp.send(content);
                                }.bind(resp));  
                            }
                        }, cFrom, 1000);  
                    }        
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
           
        },

        consultarPorCodigo: function(req, res, next) {

            var codigo = req.params.codigo;

            if (!isNumeric(codigo)) {
                return res.status(404).send({ 
                    error : {
                        source    : 'controller',
                        message   : 'O código na rota é obrigatório e numérico. Ex: /api/anexos/buscar/99999'
                    } 
                });
            }

            anexo.consultarPorCodigo(codigo, function (err, result) {

                if (err) {
                    return res.status(err.status).send( { 'success' : false, 'message' : err.message});
                } else {
                    if(result.hits.total > 0) {
                        return res.json(result.hits.hits[0]._source);
                    }
                    else {
                        return res.status(404).send( { 'success' : false, 'message' : 'Nao encontrado'});
                    }
                }

            });
           
        }

    }

})();