var async   		= require('async');
var _ 		= require('underscore');
var elasticsearch   = require('elasticsearch');
var loremIpsum = require('lorem-ipsum')
var random = require("random-js")();


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    requestTimeout: 60000
});

var u1 = {};
u1.Usuarios_Codigo = 333;
u1.Usuarios_Nome = 'Kevin Lomax';
u1.Usuarios_Email = 'neo@matrix.com';

var u2 = {};
u2.Usuarios_Codigo = 444;
u2.Usuarios_Nome = 'Elliot Alderson';
u2.Usuarios_Email = 'elliot.alderson@mrrobot.com';

var a1 = {};
a1.Agentes_Codigo = 1234;
a1.Agentes_Nome = 'Homer Simpson';

var a2 = {};
a2.Agentes_Codigo = 4321;
a2.Agentes_Nome = 'Harry Houdini';

var ep1 = 'Controladoria Geral da União';
var ep2 = 'Tribunal Superior Eleitoral';

var tpo = [];
tpo.push( { Codigo: 1, Nome: 'Site' } );
tpo.push( { Codigo: 2, Nome: 'Admin' } );
tpo.push( { Codigo: 3, Nome: 'Importação' } );

var tps = [];
tps.push( { Codigo: 1, Nome: 'Em Tramitação' } );
tps.push( { Codigo: 2, Nome: 'Finalizado' } );
tps.push( { Codigo: 3, Nome: 'Finalizado - Não obteve resposta' } );

var sp = [];
sp.push( { Codigo: 1, Nome: 'Atendido' } );
sp.push( { Codigo: 2, Nome: 'Não Atendido' } );
sp.push( { Codigo: 3, Nome: 'Parcialmente Atendido' } );
sp.push( { Codigo: 4, Nome: 'Não Classificado' } );


var tr = [];
tr.push( { Codigo: 1, Nome: 'Pedido' } );
tr.push( { Codigo: 2, Nome: 'Resposta do Pedido' } );
tr.push( { Codigo: 3, Nome: 'Recurso - 1ª Instância' } );
tr.push( { Codigo: 4, Nome: 'Resposta do Recurso - 1ª Instância' } );
tr.push( { Codigo: 5, Nome: 'Recurso - 2ª Instância' } );
tr.push( { Codigo: 6, Nome: 'Resposta do Recurso - 2ª Instância' } );


var p = {};

p.pedidos_codigo 			= 10;
p.usuarios_codigo			= u1.Usuarios_Codigo;
p.usuarios_nome				= u1.Usuarios_Nome;
p.usuarios_email			= u1.Usuarios_Email;
p.agentes_codigo			= a1.Agentes_Codigo
p.agentes_nome				= a1.Agentes_Nome;
p.tipo_pedidos_origem_codigo	= tpo[0].Codigo;
p.tipo_pedidos_origem_nome	= tpo[0].Nome;
p.tipo_pedido_situacao_codigo = tps[2].Codigo;
p.tipo_pedido_situacao_nome 	= tps[2].Nome;
p.status_pedido_codigo 		= sp[2].Codigo;
p.status_pedido_nome 		= sp[2].Nome;
p.status_pedido_interno_codigo = sp[3].Codigo;
p.status_pedido_interno_nome  = sp[3].Nome;

p.pedidos_protocolo		= 123;
p.pedidos_titulo_local		= 'Informações sobre as multas de transito na cidade de são paulo';
p.pedidos_slug			= 'Informações sobre as multas de transito na cidade de são paulo';
p.pedidos_descricao_local 	= 'Gostaria de saber a quantidade de multas feitas por radares eletrônicos e pelos CETs separadamente e no período entre 2012 e 2014';
p.pedidos_data_envio 	= '2016-11-16';
p.pedidos_enviado_para  = ep1;
p.pedidos_foi_prorrogado = false;
p.pedidos_anonimo	 	= true;
p.pedidos_criacao 		= '2016-11-16';
p.pedidos_alteracao 	= '2016-11-16';







var i = {};
var arrI = [];

i = _(p).clone();
i.interacoes_codigo = 100;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[0].Codigo;
i.tipo_pedidos_resposta_nome = tr[0].Nome;
i.interacoes_descricao_local = 'Gostaria de saber a quantidade de multas feitas por radares eletrônicos e pelos CETs separadamente e no período entre 2012 e 2014';
i.interacoes_data_resposta = '2016-11-16';
i.interacoes_criacao = '2016-11-16';
i.interacoes_alteracao = '2016-11-16';
arrI.push(i);



i = {};
i = _(p).clone();
i.interacoes_codigo = 101;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[1].Codigo;
i.tipo_pedidos_resposta_nome = tr[1].Nome;
i.interacoes_descricao_local = 'Caro Paulo, segue em anexo um excel com o número de multas feitas por radares eletronicos e por CETs dividido por dia, mês e ano.';
i.interacoes_data_resposta = '2016-11-17';
i.interacoes_criacao = '2016-11-17';
i.interacoes_alteracao = '2016-11-17';
arrI.push(i);

i = {};
i = _(p).clone();
i.interacoes_codigo = 102;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[2].Codigo;
i.tipo_pedidos_resposta_nome = tr[2].Nome;
i.interacoes_descricao_local = 'Faltaram os dados de 2014, favor revisar a planilha.';
i.interacoes_data_resposta = '2016-11-18';
i.interacoes_criacao = '2016-11-18';
i.interacoes_alteracao = '2016-11-18';
arrI.push(i);


i = {};
i = _(p).clone();
i.interacoes_codigo = 103;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[3].Codigo;
i.tipo_pedidos_resposta_nome = tr[3].Nome;
i.interacoes_descricao_local = 'Caro Palulo, Desculpe, segue em anexo a planilha de 2014.';
i.interacoes_data_resposta = '2016-11-19';
i.interacoes_criacao = '2016-11-19';
i.interacoes_alteracao = '2016-11-19';
arrI.push(i);


i = {};
i = _(p).clone();
i.interacoes_codigo = 104;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[4].Codigo;
i.tipo_pedidos_resposta_nome = tr[4].Nome;
i.interacoes_descricao_local = 'Esses dados não me convencem, acho que tem um número errado, favor revisar essa rua';
i.interacoes_data_resposta = '2016-11-20';
i.interacoes_criacao = '2016-11-20';
i.interacoes_alteracao = '2016-11-20';
arrI.push(i);




i = {};
i = _(p).clone();
i.interacoes_codigo = 105;
i.pedidos_titulo = i.pedidos_titulo_local;
i.pedidos_descricao = i.pedidos_descricao_local;
delete i.pedidos_titulo_local;
delete i.pedidos_descricao_local;
i.tipo_pedidos_resposta_codigo = tr[5].Codigo;
i.tipo_pedidos_resposta_nome = tr[5].Nome;
i.interacoes_descricao_local = 'Paulo, você tem razão, essa rua nunca teve radar automático na cidade. Estamos tirando essa informação do sistema. mas não conseguiremos te mandar a planilha atualizada';
i.interacoes_data_resposta = '2016-11-21';
i.interacoes_criacao = '2016-11-21';
i.interacoes_alteracao = '2016-11-21';
arrI.push(i);






var a1 = {};
a1 = _(arrI[1]).clone();
a1.anexos_codigo = 1000;
a1.anexos_arquivo = '/asdasd/asdasda/1000.pdf';
a1.anexos_conteudo_arquivo = 'Teste Acentuação e '+ loremIpsum();
a1.anexos_criacao = '2016-11-17';
a1.anexos_alteracao = '2016-11-17';
a1.interacoes_descricao = a1.interacoes_descricao_local;
delete a1.interacoes_descricao_local;


var a2 = {};
a2 = _(arrI[3]).clone();
a2.anexos_codigo = 1001;
a2.anexos_arquivo = '/asdasd/asdasda/1001.pdf';
a2.anexos_conteudo_arquivo = 'Teste Acentuação e Descricao e cidade e '+ loremIpsum();
a2.anexos_criacao = '2016-11-19';
a2.anexos_alteracao = '2016-11-19';
a2.interacoes_descricao = a2.interacoes_descricao_local;
delete a2.interacoes_descricao_local;





client.index({
    index: 'pedidos',
    type: 'data',
    id: p.pedidos_codigo,
    body: p
}, function (err, resp) {
    console.log(err);
});


_.each(arrI, function(item) {
     
    client.index({
        index: 'interacoes',
        type: 'data',
        id: item.interacoes_codigo,
        body: item
    }, function (err, resp) {
        console.log(err);
    });

});



client.index({
    index: 'anexos',
    type: 'data',
    id: a1.anexos_codigo,
    body: a1
}, function (err, resp) {
    console.log(err);
});

client.index({
    index: 'anexos',
    type: 'data',
    id: a2.anexos_codigo,
    body: a2
}, function (err, resp) {
    console.log(err);
});