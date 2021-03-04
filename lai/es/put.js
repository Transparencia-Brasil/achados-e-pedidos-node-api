var async   		= require('async');
var _ 		= require('underscore');
var elasticsearch   = require('elasticsearch');
var loremIpsum = require('lorem-ipsum')


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    requestTimeout: 60000
});


var p = {};

p.Pedidos_Codigo 					= 1;
p.Pedidos_Usuarios_Codigo			= 100;
p.Pedidos_Usuarios_Nome				= 'João da Silva';
p.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p.Pedidos_Agentes_Codigo			= 200;
p.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p.Pedidos_TipoPedidoSituacao_Codigo = 410;
p.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p.Pedidos_StatusPedido_Codigo 		= 510;
p.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p.Pedidos_StatusPedidoInterno_Codigo = 610;
p.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p.Pedidos_Protocolo		= 128;
p.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p.Pedidos_DataEnvio 	= '20120102';
p.Pedidos_FoiProrrogado = false;
p.Pedidos_Anonimo	 	= true;
p.Pedidos_Criacao 		= '20120102';
p.Pedidos_Alteracao 	= '20120102';

p.PedidosInteracoes_Codigo = 1000;
p.PedidosInteracoes_TipoPedidosResposta_Codigo = 123;
p.PedidosInteracoes_TipoPedidosResposta_Nome = 'Pedido';
p.PedidosInteracoes_Descricao = 'Gostaria de saber a quantidade de multas feitas por radares eletrônicos e pelos CETs separadamente e no período entre 2012 e 2014';
p.PedidosInteracoes_Criacao = '20141012';
p.PedidosInteracoes_Alteracao = '20141012';




var p2 = {};

p2.Pedidos_Codigo 					= 1;
p2.Pedidos_Usuarios_Codigo			= 100;
p2.Pedidos_Usuarios_Nome				= 'João da Silva';
p2.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p2.Pedidos_Agentes_Codigo			= 200;
p2.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p2.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p2.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p2.Pedidos_TipoPedidoSituacao_Codigo = 410;
p2.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p2.Pedidos_StatusPedido_Codigo 		= 510;
p2.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p2.Pedidos_StatusPedidoInterno_Codigo = 610;
p2.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p2.Pedidos_Protocolo		= 128;
p2.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p2.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p2.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p2.Pedidos_DataEnvio 	= '20120102';
p2.Pedidos_FoiProrrogado = false;
p2.Pedidos_Anonimo	 	= true;
p2.Pedidos_Criacao 		= '20120102';
p2.Pedidos_Alteracao 	= '20120102';

p2.PedidosInteracoes_Codigo = 1001;
p2.PedidosInteracoes_TipoPedidosResposta_Codigo = 124;
p2.PedidosInteracoes_TipoPedidosResposta_Nome = 'Resposta do Pedido';
p2.PedidosInteracoes_Descricao = 'Caro Paulo, segue em anexo um excel com o número de multas feitas por radares eletronicos e por CETs dividido por dia, mês e ano.';
p2.PedidosInteracoes_Criacao = '20141013';
p2.PedidosInteracoes_Alteracao = '20141013';

p2.PedidosAnexos_Codigo = 10001;
p2.PedidosAnexos_Arquivo = '/asdasd/asdasda/pedido1_anexo_10001.pdf';
p2.PedidosAnexos_ConteudoArquivo = loremIpsum();
p2.PedidosAnexos_Criacao = '20141013';
p2.PedidosAnexos_Alteracao = '20141013';




var p3 = {};

p3.Pedidos_Codigo 					= 1;
p3.Pedidos_Usuarios_Codigo			= 100;
p3.Pedidos_Usuarios_Nome				= 'João da Silva';
p3.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p3.Pedidos_Agentes_Codigo			= 200;
p3.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p3.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p3.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p3.Pedidos_TipoPedidoSituacao_Codigo = 410;
p3.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p3.Pedidos_StatusPedido_Codigo 		= 510;
p3.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p3.Pedidos_StatusPedidoInterno_Codigo = 610;
p3.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p3.Pedidos_Protocolo		= 128;
p3.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p3.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p3.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p3.Pedidos_DataEnvio 	= '20120102';
p3.Pedidos_FoiProrrogado = false;
p3.Pedidos_Anonimo	 	= true;
p3.Pedidos_Criacao 		= '20120102';
p3.Pedidos_Alteracao 	= '20120102';

p3.PedidosInteracoes_Codigo = 1002;
p3.PedidosInteracoes_TipoPedidosResposta_Codigo = 125;
p3.PedidosInteracoes_TipoPedidosResposta_Nome = 'Recurso - 1ª Instância';
p3.PedidosInteracoes_Descricao = 'Faltaram os dados de 2014, favor revisar a planilha.';
p3.PedidosInteracoes_Criacao = '20141014';
p3.PedidosInteracoes_Alteracao = '20141014';










var p4 = {};

p4.Pedidos_Codigo 					= 1;
p4.Pedidos_Usuarios_Codigo			= 100;
p4.Pedidos_Usuarios_Nome				= 'João da Silva';
p4.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p4.Pedidos_Agentes_Codigo			= 200;
p4.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p4.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p4.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p4.Pedidos_TipoPedidoSituacao_Codigo = 410;
p4.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p4.Pedidos_StatusPedido_Codigo 		= 510;
p4.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p4.Pedidos_StatusPedidoInterno_Codigo = 610;
p4.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p4.Pedidos_Protocolo		= 128;
p4.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p4.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p4.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p4.Pedidos_DataEnvio 	= '20120102';
p4.Pedidos_FoiProrrogado = false;
p4.Pedidos_Anonimo	 	= true;
p4.Pedidos_Criacao 		= '20120102';
p4.Pedidos_Alteracao 	= '20120102';

p4.PedidosInteracoes_Codigo = 1003;
p4.PedidosInteracoes_TipoPedidosResposta_Codigo = 126;
p4.PedidosInteracoes_TipoPedidosResposta_Nome = 'Resposta do Recurso - 1ª Instância';
p4.PedidosInteracoes_Descricao = 'Caro Palulo, Desculpe, segue em anexo a planilha de 2014.';
p4.PedidosInteracoes_Criacao = '20141015';
p4.PedidosInteracoes_Alteracao = '20141015';

p4.PedidosAnexos_Codigo = 10002;
p4.PedidosAnexos_Arquivo = '/asdasd/asdasda/pedido1_anexo_10002.pdf';
p4.PedidosAnexos_ConteudoArquivo = loremIpsum();
p4.PedidosAnexos_Criacao = '20141015';
p4.PedidosAnexos_Alteracao = '20141015';












var p5 = {};

p5.Pedidos_Codigo 					= 1;
p5.Pedidos_Usuarios_Codigo			= 100;
p5.Pedidos_Usuarios_Nome				= 'João da Silva';
p5.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p5.Pedidos_Agentes_Codigo			= 200;
p5.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p5.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p5.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p5.Pedidos_TipoPedidoSituacao_Codigo = 410;
p5.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p5.Pedidos_StatusPedido_Codigo 		= 510;
p5.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p5.Pedidos_StatusPedidoInterno_Codigo = 610;
p5.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p5.Pedidos_Protocolo		= 128;
p5.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p5.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p5.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p5.Pedidos_DataEnvio 	= '20120102';
p5.Pedidos_FoiProrrogado = false;
p5.Pedidos_Anonimo	 	= true;
p5.Pedidos_Criacao 		= '20120102';
p5.Pedidos_Alteracao 	= '20120102';

p5.PedidosInteracoes_Codigo = 1004;
p5.PedidosInteracoes_TipoPedidosResposta_Codigo = 127;
p5.PedidosInteracoes_TipoPedidosResposta_Nome = 'Recurso - 2ª Instância';
p5.PedidosInteracoes_Descricao = 'Esses dados não me convencem, acho que tem um número errado, favor revisar essa rua.';
p5.PedidosInteracoes_Criacao = '20141016';
p5.PedidosInteracoes_Alteracao = '20141016';






var p6 = {};

p6.Pedidos_Codigo 					= 1;
p6.Pedidos_Usuarios_Codigo			= 100;
p6.Pedidos_Usuarios_Nome				= 'João da Silva';
p6.Pedidos_Usuarios_Email			= 'joao@silva.com.br';
p6.Pedidos_Agentes_Codigo			= 200;
p6.Pedidos_Agentes_Nome				= 'Agente Smith da Silva Vasconcelos';
p6.Pedidos_TipoPedidosOrigem_Codigo	= 310;
p6.Pedidos_TipoPedidosOrigem_Nome	= 'Tipo Pedido Origem Pedido1';
p6.Pedidos_TipoPedidoSituacao_Codigo = 410;
p6.Pedidos_TipoPedidoSituacao_Nome 	= 'Tipo Situação Pedido1';
p6.Pedidos_StatusPedido_Codigo 		= 510;
p6.Pedidos_StatusPedido_Nome 		= 'Status Pedido NOme Pedido1';
p6.Pedidos_StatusPedidoInterno_Codigo = 610;
p6.Pedidos_StatusPedidoInterno_Nome  = 'Status Pedido Interno Pedido1';

p6.Pedidos_Protocolo		= 128;
p6.Pedidos_Titulo		= 'Informações sobre as multas de transito na cidade de são paulo';
p6.Pedidos_Slug			= 'informacoes-sobre-multas-transito-cidade-sao-paulo';
p6.Pedidos_Descricao 	= 'Informações detalhadas sobre as multas de transito na cidade de são paulo feitas por radares eletrônicos e pelos CETs separadamente';
p6.Pedidos_DataEnvio 	= '20120102';
p6.Pedidos_FoiProrrogado = false;
p6.Pedidos_Anonimo	 	= true;
p6.Pedidos_Criacao 		= '20120102';
p6.Pedidos_Alteracao 	= '20120102';

p6.PedidosInteracoes_Codigo = 1005;
p6.PedidosInteracoes_TipoPedidosResposta_Codigo = 128;
p6.PedidosInteracoes_TipoPedidosResposta_Nome = 'Resposta do Recurso - 2ª Instância';
p6.PedidosInteracoes_Descricao = 'Paulo, você tem razão, essa rua nunca teve radar automático. Estamos tirando essa informação do sistema. mas não conseguiremos te mandar a planilha atualizada.';
p6.PedidosInteracoes_Criacao = '20141017';
p6.PedidosInteracoes_Alteracao = '20141017';

p6.PedidosAnexos_Codigo = 10003;
p6.PedidosAnexos_Arquivo = '/asdasd/asdasda/pedido1_anexo_10003.pdf';
p6.PedidosAnexos_ConteudoArquivo = loremIpsum();
p6.PedidosAnexos_Criacao = '20141017';
p6.PedidosAnexos_Alteracao = '20141017';

// client.index({
// 	index: 'pedidos',
// 	type: 'data',
//  	body: p
// }, function (err, resp) {
// 	console.log(err);
// });


// client.index({
// 	index: 'pedidos',
// 	type: 'data',
//  	body: p2
// }, function (err, resp) {
// 	console.log(err);
// });

// client.index({
// 	index: 'pedidos',
// 	type: 'data',
//  	body: p3
// }, function (err, resp) {
// 	console.log(err);
// });

// client.index({
// 	index: 'pedidos',
// 	type: 'data',
//  	body: p4
// }, function (err, resp) {
// 	console.log(err);
// });

// client.index({
// 	index: 'pedidos',
// 	type: 'data',
//  	body: p5
// }, function (err, resp) {
// 	console.log(err);
// });

client.index({
	index: 'pedidos',
	type: 'data',
 	body: p6
}, function (err, resp) {
	console.log(err);
});





