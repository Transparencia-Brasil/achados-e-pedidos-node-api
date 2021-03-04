var async   		= require('async');
var _ 		= require('underscore');
var elasticsearch   = require('elasticsearch');
var loremIpsum = require('lorem-ipsum')
var random = require("random-js")();


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    requestTimeout: 60000
});


var p = {};
var anexo = '/asdasd/asdasda/asd.com';





async.each(_.range(3000), function(x, callback) {

	p.Pedidos_Codigo 					= random.integer(1, 1000);
	p.Pedidos_Usuarios_Codigo			= random.integer(1, 1000);
	p.Pedidos_Usuarios_Nome				= 'Nome Usuário' + loremIpsum();
	p.Pedidos_Usuarios_Email			= 'usuario@teste.com';
	p.Pedidos_Agentes_Codigo			= random.integer(1, 1000) + random.integer(1, 1000);
	p.Pedidos_Agentes_Nome				= 'Nome Agente' + loremIpsum();
	p.Pedidos_TipoPedidosOrigem_Codigo	= random.integer(1, 1000) * 3 + 5;
	p.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem' + loremIpsum();
	p.Pedidos_TipoPedidoSituacao_Codigo = random.integer(1, 1000) * 4;
	p.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação' + loremIpsum();
	p.Pedidos_StatusPedido_Codigo 		= random.integer(1, 1000) * 4 + 3;
	p.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme' + loremIpsum();
	p.Pedidos_StatusPedidoInterno_Codigo = random.integer(1, 1000) * 7;
	p.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno' + loremIpsum();

	p.Pedidos_Protocolo		= random.integer(1, 1000);
	p.Pedidos_Titulo		= loremIpsum();
	p.Pedidos_Slug			= 'slug-de-teste-' + random.integer(1, 1000);
	p.Pedidos_Descricao 	= loremIpsum();
	p.Pedidos_DataEnvio 	= '20120102';
	p.Pedidos_FoiProrrogado = false;
	p.Pedidos_Anonimo	 	= true;
	p.Pedidos_Criacao 		= '20120102';
	p.Pedidos_Alteracao 	= '20120102';

	p.PedidosInteracoes_Codigo = random.integer(1, 1000);
	p.PedidosInteracoes_TipoPedidosResposta_Codigo = random.integer(1, 1000);
	p.PedidosInteracoes_TipoPedidosResposta_Nome = 'Tipo Resposta' + loremIpsum();
	p.PedidosInteracoes_Descricao = loremIpsum();
	p.PedidosInteracoes_Criacao = '20141012';
	p.PedidosInteracoes_Alteracao = '20141012';

    p.PedidosAnexos_Codigo = random.integer(1, 1000);
    p.PedidosAnexos_Arquivo = anexo;
    p.PedidosAnexos_ConteudoArquivo = loremIpsum();
    p.PedidosAnexos_Criacao = '20161122';
    p.PedidosAnexos_Alteracao = '20161122';


	client.index({
		index: 'pedidos4',
		type: 'data',
	 	body: p
	}, function (err, resp) {
		console.log(err);
	});


}, function(err) {
    if( err ) {
      console.log(err);
    } else {
      console.log('ACABOU');
    }

    

});



