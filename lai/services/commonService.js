(function () {

    var elasticsearch   = require('elasticsearch');
    var _               = require("underscore");
    var s               = require("underscore.string");
    // var loggerService   = require('../services/loggerService.js');

    module.exports = {

        preencheFormBodyParaConsulta: function(raw, callback) {

            var b = {};

            b.value                 = raw.value                 || "";
            b.currentPage           = raw.currentPage           || "";
            b.enviadoPara           = raw.enviadoPara           || "";
            b.por                   = raw.por                   || "";
            b.dataDe                = raw.dataDe                || "";
            b.dataAte               = raw.dataAte               || "";
            b.chkEmTramitacao       = raw.chkEmTramitacao       || "";
            b.chkFinalizada         = raw.chkFinalizada         || "";
            //2017-10-02 Paulo Campos: Adicionado filtro 
            b.chkNaoObteveResposta  = raw.chkNaoObteveResposta  || "";
            b.pedidosRecursoSim     = raw.pedidosRecursoSim     || "";
            b.pedidosRecursoNao     = raw.pedidosRecursoNao     || "";
            b.chkAtendido           = raw.chkAtendido           || "";
            b.chkNaoAtendido        = raw.chkNaoAtendido        || "";
            b.chkParcAtendido       = raw.chkParcAtendido       || "";
            b.chkFederal            = raw.chkFederal            || "";
            b.chkEstadual           = raw.chkEstadual           || "";
            b.chkMunicipal          = raw.chkMunicipal          || "";
            b.chkLegislativo        = raw.chkLegislativo        || "";
            b.chkExecutivo          = raw.chkExecutivo          || "";
            b.chkJudiciario         = raw.chkJudiciario         || "";
            b.chkMinisterio         = raw.chkMinisterio         || ""; 
            b.scope_search          = raw.scope_search          || ""; 

            return b;

        },

        gerarArrayEnriqueciemnto: function(data, callback) {

            var a = {};
       
            var pedidos = [];
            var pedidosToGet = [];
            var interacoes = [];
            var interacoesToGet = [];

            _.each(data.hits.hits, function(item) {

                if (item._index == 'pedidos') {
                    pedidos.push(item._source.Codigo);
                }

                if (item._index == 'interacoes') {
                    interacoes.push(item._source.Codigo);
                }

                if (item._source.Pedidos_Codigo) { 
                    pedidosToGet.push(item._source.Pedidos_Codigo);
                }

                if (item._source.Interacoes_Codigo) { 
                    interacoesToGet.push(item._source.Interacoes_Codigo);
                }

            }); 
            
            // console.log(pedidosToGet);
            // console.log(interacoesToGet);
            // console.log('************************************************');
            // console.log(pedidos);
            // console.log(interacoes);
            // console.log('************************************************');
            // console.log(_.difference(pedidosToGet, pedidos));
            // console.log(_.difference(interacoesToGet, interacoes));

            var result              = {};
            result.pedidos          = _.uniq(pedidos);
            result.interacoes       = _.uniq(interacoes);
            result.pedidosToGet     = _.uniq(_.difference(pedidosToGet, pedidos));
            result.interacoesToGet  = _.uniq(_.difference(interacoesToGet, interacoes));

            return callback(null, result);

        },

        // enriquecer: function(consultaInicial, enriquecidos, ultimasInteacoes, callback) {
        enriquecerFullJoin: function(consultaInicial, enriquecedores, callback) {

            var consTratado = [];

            var pedidos = [];
            var interacoes = [];

            _.each(enriquecedores.docs, function(item) {

                if (item._index == 'interacoes') {
                    interacoes.push(item._source);
                }

                if (item._index == 'pedidos') {
                    pedidos.push(item._source);
                }

            });

            _.each(consultaInicial.hits.hits, function(item) {

                //console.log(item);

                if (item._index == 'interacoes') {
                    interacoes.push(item._source);
                }

                if (item._index == 'pedidos') {
                    pedidos.push(item._source);
                }

            });

            // Trecho responsavel por tentar incluir ultima intercao no pedido
            //      eu acreditava que esses dados iam na tela
            // var interacoesStatusAtualPedidos = [];
            // _.each(ultimasInteacoes, function(item) {
            //     interacoesStatusAtualPedidos.push(item.group_docs.hits.hits[0]._source);
            // });


            var p = {};
            var i = {};
            var a = {};
            var t = {};

            //TODO: colocar aqui ultimo status de interacao NO pedido
            _.each(consultaInicial.hits.hits, function(item) {

                if (item._index == 'pedidos') {

                    p = {};
                    p = item._source;

                    p.Tipo = 'pedido';
                    p.Score = item._score;
                    p.highlight = item.highlight;

                    consTratado.push(p);
                }


                if (item._index == 'interacoes') {

                    t = {};
                    t = _.where(pedidos, { Codigo: item._source.Pedidos_Codigo } )[0];
                    
                    // console.log(')))))))))))))))))))))))))))))');
                    // console.log(t);
                    // console.log('XXXXXXXXXXXXXXXX   ');
                    i = {};
                    i = item._source;

                    i.Tipo = 'interacao';
                    i.Score = item._score;
                    i.highlight = item.highlight;

                    i.Pedidos_Codigo = item._source.Pedidos_Codigo;
                    i.Pedidos_Usuarios_Nome = t.Usuarios_Nome;
                    i.Pedidos_Usuarios_Email = t.Usuarios_Email;
                    i.Pedidos_Agentes_Nome = t.Agentes_Nome;
                    i.Pedidos_TipoPedidosOrigem_Nome = t.TipoPedidosOrigem_Nome;
                    i.Pedidos_TipoPedidoSituacao_Nome = t.TipoPedidoSituacao_Nome;
                    i.Pedidos_StatusPedido_Nome = t.StatusPedido_Nome;
                    i.Pedidos_StatusPedidoInterno_Nome = t.StatusPedidoInterno_Nome;
                    i.Pedidos_Protocolo = t.Protocolo;
                    i.Pedidos_Titulo = t.Titulo;
                    i.Pedidos_Slug = t.Slug;
                    i.Pedidos_Descricao = t.Descricao;

                    consTratado.push(i);
                }

                if (item._index == 'anexos') {
                    
                    t = {};
                    t = _.where(pedidos, { Codigo: item._source.Pedidos_Codigo } )[0];
                    
                    a = {};
                    a = item._source;

                    a.Tipo = 'anexo';
                    a.Score = item._score;
                    a.highlight = item.highlight;

                    a.Pedidos_Codigo = item._source.Pedidos_Codigo;
                    a.Pedidos_Usuarios_Nome = t.Usuarios_Nome;
                    a.Pedidos_Usuarios_Email = t.Usuarios_Email;
                    a.Pedidos_Agentes_Nome = t.Agentes_Nome;
                    a.Pedidos_TipoPedidosOrigem_Nome = t.TipoPedidosOrigem_Nome;
                    a.Pedidos_TipoPedidoSituacao_Nome = t.TipoPedidoSituacao_Nome;
                    a.Pedidos_StatusPedido_Nome = t.StatusPedido_Nome;
                    a.Pedidos_StatusPedidoInterno_Nome = t.StatusPedidoInterno_Nome;
                    a.Pedidos_Protocolo = t.Protocolo;
                    a.Pedidos_Titulo = t.Titulo;
                    a.Pedidos_Slug = t.Slug;
                    a.Pedidos_Descricao = t.Descricao;


                    t = {};
                    t = _.where(interacoes, { Codigo: item._source.Interacoes_Codigo } )[0];

                    a.Interacoes_TipoPedidosResposta_Codigo = t.TipoPedidosResposta_Codigo;
                    a.Interacoes_TipoPedidosResposta_Nome = t.TipoPedidosResposta_Nome;
                    a.Interacoes_Descricao = t.Descricao;
                    a.Interacoes_Criacao = t.Criacao;
                    a.Interacoes_Alteracao = t.Alteracao;


                    consTratado.push(a);


                }


            });

            var res = _.sortBy(consTratado, 'score');

            return callback(null, res);

        },

        enriquecer: function(consultaInicial, enriquecedores, callback) {

            var consTratado = [];

            var pedidos = [];
            var interacoes = [];

            _.each(enriquecedores.docs, function(item) {

                if (item._index == 'interacoes') {
                    interacoes.push(item._source);
                }

                if (item._index == 'pedidos') {
                    pedidos.push(item._source);
                }

            });

            _.each(consultaInicial.hits.hits, function(item) {

                //console.log(item);

                if (item._index == 'interacoes') {
                    interacoes.push(item._source);
                }

                if (item._index == 'pedidos') {
                    pedidos.push(item._source);
                }

            });

            var p = {};
            var i = {};
            var a = {};
            var t = {};

            //TODO: colocar aqui ultimo status de interacao NO pedido
            _.each(consultaInicial.hits.hits, function(item) {

                if (item._index == 'pedidos') {

                    p = {};
                    p = item._source;

                    p.Tipo = 'pedido';
                    p.Score = item._score;
                    p.highlight = item.highlight;

                    consTratado.push(p);
                }


                if (item._index == 'interacoes') {

                    t = {};
                    t = _.where(pedidos, { Codigo: item._source.Pedidos_Codigo } )[0];
                    
                    i = {};
                    i = item._source;

                    i.Tipo = 'interacao';
                    i.Score = item._score;
                    i.highlight = item.highlight;

                    i.Pedidos_Codigo = item._source.Pedidos_Codigo;
                    i.Pedidos_Usuarios_Nome = t.Usuarios_Nome;
                    // i.Pedidos_Usuarios_Email = t.Usuarios_Email;
                    // i.Pedidos_Agentes_Nome = t.Agentes_Nome;
                    i.Pedidos_TipoPedidosOrigem_Nome = t.TipoPedidosOrigem_Nome;
                    i.Pedidos_TipoPedidoSituacao_Nome = t.TipoPedidoSituacao_Nome;
                    i.Pedidos_StatusPedido_Nome = t.StatusPedido_Nome;
                    i.Pedidos_StatusPedidoInterno_Nome = t.StatusPedidoInterno_Nome;
                    i.Pedidos_Protocolo = t.Protocolo;
                    i.Pedidos_Titulo = t.Titulo;
                    i.Pedidos_Slug = t.Slug;
                    i.Pedidos_Descricao = t.Descricao;

                    consTratado.push(i);
                }

                if (item._index == 'anexos') {
                    
                    t = {};
                    t = _.where(pedidos, { Codigo: item._source.Pedidos_Codigo } )[0];
                    
                    a = {};
                    a = item._source;

                    a.Tipo = 'anexo';
                    a.Score = item._score;
                    a.highlight = item.highlight;

                    a.Pedidos_Codigo = item._source.Pedidos_Codigo;
                    a.Pedidos_Usuarios_Nome = t.Usuarios_Nome;
                    // a.Pedidos_Usuarios_Email = t.Usuarios_Email;
                    a.Pedidos_Agentes_Nome = t.Agentes_Nome;
                    a.Pedidos_TipoPedidosOrigem_Nome = t.TipoPedidosOrigem_Nome;
                    a.Pedidos_TipoPedidoSituacao_Nome = t.TipoPedidoSituacao_Nome;
                    a.Pedidos_StatusPedido_Nome = t.StatusPedido_Nome;
                    a.Pedidos_StatusPedidoInterno_Nome = t.StatusPedidoInterno_Nome;
                    a.Pedidos_Protocolo = t.Protocolo;
                    a.Pedidos_Titulo = t.Titulo;
                    a.Pedidos_Slug = t.Slug;
                    a.Pedidos_Descricao = t.Descricao;


                    t = {};
                    t = _.where(interacoes, { Codigo: item._source.Interacoes_Codigo } )[0];

                    a.Interacoes_TipoPedidosResposta_Codigo = t.TipoPedidosResposta_Codigo;
                    a.Interacoes_TipoPedidosResposta_Nome = t.TipoPedidosResposta_Nome;
                    a.Interacoes_Descricao = t.Descricao;
                    // a.Interacoes_Criacao = t.Criacao;
                    // a.Interacoes_Alteracao = t.Alteracao;

                    consTratado.push(a);

                }


            });

            var res = _.sortBy(consTratado, 'score');

            return callback(null, res);

        }

    }

})();
