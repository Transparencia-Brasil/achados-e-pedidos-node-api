(function () {

    var elasticsearch = require('elasticsearch');
    var config          = require('../config.js');
    // var loggerService   = require('../services/loggerService.js');

    module.exports = {

        preencheModel: function(codigo, raw, callback) {

            var i = {};

            i.pedidos_codigo                  = raw.pedidos_codigo;
            i.usuarios_codigo                 = raw.usuarios_codigo                 || "";
            i.usuarios_nome                   = raw.usuarios_nome                   || "";
            i.usuarios_slug                   = raw.usuarios_slug                   || "";
	    i.usuarios_email                  = raw.usuarios_email                  || "";
            i.agentes_codigo                  = raw.agentes_codigo                  || "";
            i.agentes_nome                    = raw.agentes_nome                    || "";
            i.agentes_slug                    = raw.agentes_slug                    || "";
	    i.tipo_pedido_situacao_codigo     = raw.tipo_pedido_situacao_codigo     || "";
            i.tipo_pedido_situacao_nome       = raw.tipo_pedido_situacao_nome       || "";
            i.status_pedido_codigo            = raw.status_pedido_codigo            || "";
            i.status_pedido_nome              = raw.status_pedido_nome              || "";
            i.status_pedido_interno_codigo    = raw.status_pedido_interno_codigo    || "";
            i.status_pedido_interno_nome      = raw.status_pedido_interno_nome      || "";
            
            i.tipo_pedido_origem_codigo       = raw.tipo_pedido_origem_codigo       || "";
            i.tipo_pedido_origem_nome         = raw.tipo_pedido_origem_nome         || "";
            i.tipo_poder_codigo               = raw.tipo_poder_codigo               || "";
            i.tipo_poder_nome                 = raw.tipo_poder_nome                 || "";
            i.tipo_nivel_federativo_codigo    = raw.tipo_nivel_federativo_codigo    || "";
            i.tipo_nivel_federativo_nome      = raw.tipo_nivel_federativo_nome      || "";
            
            i.pedidos_protocolo               = raw.pedidos_protocolo               || "";
            i.pedidos_titulo                  = raw.pedidos_titulo                  || "";
            i.pedidos_slug                    = raw.pedidos_slug                    || "";
            i.pedidos_descricao               = raw.pedidos_descricao               || "";
            i.pedidos_enviado_para            = raw.pedidos_enviado_para            || "";
            i.pedidos_data_envio              = raw.pedidos_data_envio              || "";
            i.pedidos_foi_prorrogado          = raw.pedidos_foi_prorrogado          || "";
            i.pedidos_anonimo                 = raw.pedidos_anonimo                 || "";

            i.interacoes_codigo_local               = codigo;
            i.tipo_pedidos_resposta_codigo_local    = raw.tipo_pedidos_resposta_codigo_local    || "";
            i.tipo_pedidos_resposta_nome_local      = raw.tipo_pedidos_resposta_nome_local      || "";
            i.interacoes_descricao_local            = raw.interacoes_descricao_local            || "";
            i.interacoes_data_resposta_local        = raw.interacoes_data_resposta_local        || "";

            return i;

        },
    } 

})();
