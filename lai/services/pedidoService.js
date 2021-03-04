(function () {

    var elasticsearch = require('elasticsearch');
    var config          = require('../config.js');
    // var loggerService   = require('../services/loggerService.js');

    module.exports = {

        preencheModel: function(codigo, raw, callback) {

            var p = {};


            p.pedidos_codigo_local                  = codigo;
            p.usuarios_codigo_local                 = raw.usuarios_codigo_local                 || "";
            p.usuarios_nome_local                   = raw.usuarios_nome_local                   || "";
            p.usuarios_slug_local                   = raw.usuarios_slug_local                   || "";
            p.usuarios_email_local                  = raw.usuarios_email_local                  || "";
            p.agentes_codigo_local                  = raw.agentes_codigo_local                  || "";
            p.agentes_slug_local                    = raw.agentes_slug_local                    || "";
            p.agentes_nome_local                    = raw.agentes_nome_local                    || "";
            p.tipo_pedido_situacao_codigo_local     = raw.tipo_pedido_situacao_codigo_local     || "";
            p.tipo_pedido_situacao_nome_local       = raw.tipo_pedido_situacao_nome_local       || "";
            p.status_pedido_codigo_local            = raw.status_pedido_codigo_local            || "";
            p.status_pedido_nome_local              = raw.status_pedido_nome_local              || "";
            p.status_pedido_interno_codigo_local    = raw.status_pedido_interno_codigo_local    || "";
            p.status_pedido_interno_nome_local      = raw.status_pedido_interno_nome_local      || "";
           
            p.tipo_pedido_origem_codigo_local       = raw.tipo_pedido_origem_codigo_local       || "";
            p.tipo_pedido_origem_nome_local         = raw.tipo_pedido_origem_nome_local         || "";
            p.tipo_poder_codigo_local               = raw.tipo_poder_codigo_local               || "";
            p.tipo_poder_nome_local                 = raw.tipo_poder_nome_local                 || "";
            p.tipo_nivel_federativo_codigo_local    = raw.tipo_nivel_federativo_codigo_local    || "";
            p.tipo_nivel_federativo_nome_local      = raw.tipo_nivel_federativo_nome_local      || "";

            p.tipo_pedidos_resposta_codigo          = raw.tipo_pedidos_resposta_codigo          || "";
            p.tipo_pedidos_resposta_nome            = raw.tipo_pedidos_resposta_nome            || "";
        
            p.pedidos_protocolo_local               = raw.pedidos_protocolo_local               || "";
            p.pedidos_titulo_local                  = raw.pedidos_titulo_local                  || "";
            p.pedidos_slug_local                    = raw.pedidos_slug_local                    || "";
            p.pedidos_descricao_local               = raw.pedidos_descricao_local               || "";
            p.pedidos_enviado_para_local            = raw.pedidos_enviado_para_local            || "";
            p.pedidos_data_envio_local              = raw.pedidos_data_envio_local              || "";
            p.pedidos_foi_prorrogado_local          = raw.pedidos_foi_prorrogado_local          || "";
            p.pedidos_anonimo_local                 = raw.pedidos_anonimo_local                 || "";

            return p;

        },
    } 

})();
