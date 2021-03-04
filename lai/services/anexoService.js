(function () {

    var elasticsearch = require('elasticsearch');
    var config          = require('../config.js');
    // var loggerService   = require('../services/loggerService.js');

    module.exports = {

        preencheModel: function(codigo, raw, callback) {

            var a = {};

            a.pedidos_codigo                  = raw.pedidos_codigo;
            a.usuarios_codigo                 = raw.usuarios_codigo                 || "";
            a.usuarios_nome                   = raw.usuarios_nome                   || "";
            a.usuarios_slug                   = raw.usuarios_slug                   || "";
	    a.usuarios_email                  = raw.usuarios_email                  || "";
            a.agentes_codigo                  = raw.agentes_codigo                  || "";
            a.agentes_nome                    = raw.agentes_nome                    || "";
            a.agentes_slug                    = raw.agentes_slug                    || "";
            a.tipo_pedido_situacao_codigo     = raw.tipo_pedido_situacao_codigo     || "";
            a.tipo_pedido_situacao_nome       = raw.tipo_pedido_situacao_nome       || "";
            a.status_pedido_codigo            = raw.status_pedido_codigo            || "";
            a.status_pedido_nome              = raw.status_pedido_nome              || "";
            a.status_pedido_interno_codigo    = raw.status_pedido_interno_codigo    || "";
            a.status_pedido_interno_nome      = raw.status_pedido_interno_nome      || "";
            
            a.tipo_pedido_origem_codigo       = raw.tipo_pedido_origem_codigo       || "";
            a.tipo_pedido_origem_nome         = raw.tipo_pedido_origem_nome         || "";
            a.tipo_poder_codigo               = raw.tipo_poder_codigo               || "";
            a.tipo_poder_nome                 = raw.tipo_poder_nome                 || "";
            a.tipo_nivel_federativo_codigo    = raw.tipo_nivel_federativo_codigo    || "";
            a.tipo_nivel_federativo_nome      = raw.tipo_nivel_federativo_nome      || "";
            
            a.pedidos_protocolo               = raw.pedidos_protocolo               || "";
            a.pedidos_titulo                  = raw.pedidos_titulo                  || "";
            a.pedidos_slug                    = raw.pedidos_slug                    || "";
            a.pedidos_descricao               = raw.pedidos_descricao               || "";
            a.pedidos_enviado_para            = raw.pedidos_enviado_para            || "";
            a.pedidos_data_envio              = raw.pedidos_data_envio              || "";
            a.pedidos_foi_prorrogado          = raw.pedidos_foi_prorrogado          || "";
            a.pedidos_anonimo                 = raw.pedidos_anonimo                 || "";

            a.interacoes_codigo               = raw.interacoes_codigo               || "";
            a.tipo_pedidos_resposta_codigo    = raw.tipo_pedidos_resposta_codigo    || "";
            a.tipo_pedidos_resposta_nome      = raw.tipo_pedidos_resposta_nome      || "";
            a.interacoes_descricao            = raw.interacoes_descricao            || "";
            a.interacoes_data_resposta        = raw.interacoes_data_resposta        || "";

            a.anexos_codigo                   = codigo;
            a.anexos_arquivo                  = raw.anexos_arquivo                  || "";
            a.anexos_conteudo_arquivo         = raw.anexos_conteudo_arquivo         || "";

            return a;

        }

    } 

})();
