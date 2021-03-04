$(function () {


    $(document).ready(function () {


        autocomplete();

        $( "#btnsearchbar" ).click(function() {
            search($('#fieldValueBar').val());
        });

        $( "#btnsearch" ).click(function() {
            search($('#fieldValue').val(), 1);
        });        

    });

    function pagination(pagination) {

        $("#ulPagination").empty();

        var result = '';

        if (pagination.first == null) {
            $("#ulPagination").append('<li class="disabled"><span>«</span></li>');
        } else {
            $("#ulPagination").append('<li><span><a href="#" class="paginacao" id="page_'+pagination.first+'">«</a></span></li>');
        }

        _.each(pagination.range, function(item) {
            if (item == pagination.current) {
                $("#ulPagination").append('<li class="disabled"><a href="#">'+ item +'</a></li>');
            } else {
                $("#ulPagination").append('<li><a href="#" class="paginacao" id="'+item+'">'+ item +'</a></li>');
            }
        });

        if (pagination.last == null) {
            $("#ulPagination").append('<li class="disabled"><span>»</span></li>');
        } else {
            $("#ulPagination").append('<li><span><a href="#" class="paginacao" id="'+pagination.last+'">»</a></span></li>');
        }

        $( ".paginacao" ).click(function() {
            search($("#termo-display").html(), $(this).attr("id"));
        });

    }



    function search(fieldValue, page) {

        if (!fieldValue) {
            $("#boxes-resultados").empty();
            $("#boxes-resultados").html('Você deve digitar algum valor na caixa de pesquisa');
            return;
        }

        var data = { 
            "value" :  fieldValue,
            "currentPage" : page
        };

        $.ajax('api/consulta-simples', {
            method: "POST",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            // headers: { "x-csrf-token": ns.localStorage.get('token') }, 
            dataType: "json",
            success: function (result) {

                pagination(result.pagination);

                console.log(result);
                

                $("#termo-display").html( fieldValue );
                $("#hits-total-display").html( result.hits.hits.total );

                $("#paginacao-de").html( result.pagination.fromResult );
                $("#paginacao-ate").html( result.pagination.toResult );

                $( "#fieldValue" ).val('');
                $("#boxes-resultados").empty();

                _.each(result.hits.hits.hits, function(item) {
                    
                    switch (item._index) {
                        case "pedidos":
                            montaBoxPedido(item);
                            break;
                        case "interacoes":
                            montaBoxInteracao(item);
                            break;
                        case "anexos":
                            montaBoxAnexo(item);
                            break;
                    }

                });     
    

            },
            error: function (err) {
                
                console.log(err);

            }


        });

    }

    function retornaIconSituacao(value) {
        switch(value) {
            case "1":
                return '<img src="assets/images/pedidos/icon-em-tramitacao.png">';
            default:
                return '<img src="assets/images/pedidos/icon-finalizado.png">';
        }
    }

    function retornaIconStatusPedido(value, value_interno) {
        
        var icon = '';

        switch(value) {
            case "1":
                icon = 'icon-atendido';
            case "2":
                icon = 'icon-nao-atendido';
            case "3":
                icon = 'icon-parcialmente-atendido';
            case "4":
                icon = 'icon-finalizado';
            default:
                icon = 'icon-nao-atendido';
        }

        if (value_interno == "1") {
            icon += '-verificado';
        }

        return '<img src="assets/images/pedidos/' + icon + '.png">';
    }

    function ajustaData(data) {
        return data.substring(8, 10) + '/' + data.substring(5, 7) + '/' + data.substring(0, 4);
    }

    function montaBoxPedido(item) {

        var obj = item._source;
        var iconSituacao = retornaIconSituacao(obj.tipo_pedido_situacao_codigo_local);
        var iconStatusPedido =  retornaIconStatusPedido(obj.status_pedido_codigo_local, obj.status_pedido_interno_codigo_local); 
        var titulo = obj.pedidos_titulo_local;
        var descricao = obj.pedidos_titulo_local;

        if (_.has(item.highlight, 'pedidos_titulo_local')) {
            titulo = item.highlight.pedidos_titulo_local[0];
        } 

        if (_.has(item.highlight, 'pedidos_descricao_local')) {
            descricao = item.highlight.pedidos_descricao_local[0];
        } 

        var box = '<div class="col-md-12 col-sm-12 col-xs-12 box"><div class="col-md-8 col-sm-8 col-xs-12">';
        box += '<p class="title">' + titulo + '</p>';
        box += '<div class="enviado">Enviado para: <a href="#">' + obj.agentes_nome_local + '</a></div>';
        box += '<div class="por">Por: <a href="#">' + obj.usuarios_nome_local + '</a></div>';
        box += '<div class="em">Em: ' + ajustaData(obj.pedidos_data_envio_local) + '</div>';
        box += '<div class="situacao"><div class="col-md-6 col-sm-6 col-xs-12">' + iconSituacao;
        box += '<p>Situação:<br> <strong>' + obj.tipo_pedido_situacao_nome_local + '</strong></p></div>';
        box += '<div class="col-md-6 col-sm-6 col-xs-12">' + iconStatusPedido;
        box += '<p>Resposta:<br> <strong>' + obj.status_pedido_nome_local + '</strong></p>';
        box += retornaStatusVerificado(obj.status_pedido_interno_codigo_local) + '</div></div></div>';
        box += '<div class="col-md-4 col-sm-4 col-xs-12 highlight-box"><p class="highlight-session bgcolor1">';
        box += 'Pedido</p><p class="highlight-text">' + descricao;
        box += '</p></div><div class="col-md-3 col-sm-3 col-xs-12"><div class="bntVerMais pull-right"><a href="#">Ver <div class="seta seta-direita"></div></a></div></div></div>';

        $("#boxes-resultados").append(box);

    }

    function retornaStatusVerificado(status) {
        if (status == "1") {
            return '<p>(Status Verificado)</p>';
        } else {
            return '';
        }
    }

    function retornaTipoPedidoResposta(value) {
        switch(value) {
            case "1":
                return '<p class="highlight-session bgcolor1">Resposta do órgão público</p>';
            case "2":
                return '<p class="highlight-session bgcolor2">Reclamação</p>';
            case "3":
                return '<p class="highlight-session bgcolor2">Resposta da Reclamação</p>';
            case "4":
                return '<p class="highlight-session bgcolor3">Recurso - 1º Instância</p>';
            case "5":
                return '<p class="highlight-session bgcolor3">Resposta do recurso - 1º Instância</p>';
            case "6":
                return '<p class="highlight-session bgcolor4">Recurso - 2º Instância</p>';
            case "7":
                return '<p class="highlight-session bgcolor4">Resposta do recurso - 2º Instância</p>';
            case "8":
                return '<p class="highlight-session bgcolor5">Recurso - 3º Instância</p>';
            case "9":
                return '<p class="highlight-session bgcolor5">Resposta do recurso - 3º Instância</p>';
            case "10":
                return '<p class="highlight-session bgcolor6">Recurso - 4º Judicial</p>';
            case "11":
                return '<p class="highlight-session bgcolor6">Resposta do recurso - 4º Judicial</p>';
            default:
                return '<p class="highlight-session bgcolor1">Fora do RANGE</p>';
        }
    }

    function montaBoxInteracao(item) {

        var obj = item._source;
        var iconSituacao = retornaIconSituacao(obj.tipo_pedido_situacao_codigo);
        var iconStatusPedido =  retornaIconStatusPedido(obj.status_pedido_codigo, obj.status_pedido_interno_codigo); 
        var titulo = obj.pedidos_titulo;
        var descricao = obj.interacoes_descricao_local;

        if (_.has(item.highlight, 'interacoes_descricao_local')) {
            descricao = item.highlight.interacoes_descricao_local[0];
        } 

        var box = '<div class="col-md-12 col-sm-12 col-xs-12 box"><div class="col-md-8 col-sm-8 col-xs-12">';
        box += '<p class="title">' + titulo + '</p>';
        box += '<div class="enviado">Enviado para: <a href="#">' + obj.agentes_nome + '</a></div>';
        box += '<div class="por">Por: <a href="#">' + obj.usuarios_nome + '</a></div>';
        box += '<div class="em">Em: ' + ajustaData(obj.pedidos_data_envio) + '</div>';
        box += '<div class="situacao"><div class="col-md-6 col-sm-6 col-xs-12">' + iconSituacao;
        box += '<p>Situação:<br> <strong>' + obj.tipo_pedido_situacao_nome + '</strong></p></div>';
        box += '<div class="col-md-6 col-sm-6 col-xs-12">' + iconStatusPedido;
        box += '<p>Resposta:<br> <strong>' + obj.status_pedido_nome + '</strong></p>';
        box += retornaStatusVerificado(obj.status_pedido_interno_codigo) + '</div></div></div>';
        box += '<div class="col-md-4 col-sm-4 col-xs-12 highlight-box">';
        box += retornaTipoPedidoResposta(obj.tipo_pedidos_resposta_codigo_local);
        box += '<p class="highlight-text">' + descricao + '</p></div>';
        box += '<div class="col-md-3 col-sm-3 col-xs-12"><div class="bntVerMais pull-right"><a href="#">Ver <div class="seta seta-direita"></div></a></div></div></div>';

        $("#boxes-resultados").append(box);

    }

    function montaBoxAnexo(item) {

        var obj = item._source;
        var iconSituacao = retornaIconSituacao(obj.tipo_pedido_situacao_codigo);
        var iconStatusPedido =  retornaIconStatusPedido(obj.status_pedido_codigo, obj.status_pedido_interno_codigo); 
        var titulo = obj.pedidos_titulo;
        var descricao = obj.anexos_conteudo_arquivo;

        if (_.has(item.highlight, 'anexos_conteudo_arquivo')) {
            descricao = item.highlight.anexos_conteudo_arquivo[0];
        } 

        var box = '<div class="col-md-12 col-sm-12 col-xs-12 box"><div class="col-md-8 col-sm-8 col-xs-12">';
        box += '<p class="title">' + titulo + '</p>';
        box += '<div class="enviado">Enviado para: <a href="#">' + obj.agentes_nome + '</a></div>';
        box += '<div class="por">Por: <a href="#">' + obj.usuarios_nome + '</a></div>';
        box += '<div class="em">Em: ' + ajustaData(obj.pedidos_data_envio) + '</div>';
        box += '<div class="situacao"><div class="col-md-6 col-sm-6 col-xs-12">' + iconSituacao;
        box += '<p>Situação:<br> <strong>' + obj.tipo_pedido_situacao_nome + '</strong></p></div>';
        box += '<div class="col-md-6 col-sm-6 col-xs-12">' + iconStatusPedido;
        box += '<p>Resposta:<br> <strong>' + obj.status_pedido_nome + '</strong></p>';
        box += retornaStatusVerificado(obj.status_pedido_interno_codigo) + '</div></div></div>';
        box += '<div class="col-md-4 col-sm-4 col-xs-12 highlight-box">';
        box += retornaTipoPedidoResposta(obj.tipo_pedidos_resposta_codigo);
        box += '<p class="highlight-session"><a href="' + obj.anexos_arquivo + '"><img src="assets/images/pedidos/icon-arquivo.png" style="margin-right:3px;"> arquivo anexo</a></p>';
        box += '<p class="highlight-text">' + descricao + '</p></div>';
        box += '<div class="col-md-3 col-sm-3 col-xs-12"><div class="bntVerMais pull-right"><a href="#">Ver <div class="seta seta-direita"></div></a></div></div></div>';

        $("#boxes-resultados").append(box);

    }
   
    function autocomplete() {

         $( "#fieldValue" ).keyup(function(e) {

            var data = { 
                "data" :  $('#fieldValue').val()
                // "field" : "PedidosInteracoes_Descricao"
            };

            $.ajax('api/pedidos/searchasyoutype', {
                method: "POST",
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                // headers: { "x-csrf-token": ns.localStorage.get('token') }, 
                dataType: "json",
                success: function (result) {

                    console.log(result);
                    
                    // $( "#fieldList" ).val();
                    $("#fieldList").empty();

                    _.each(result, function(item) {

                        $( "#fieldList" ).append("<option value='"+ item +"'>");

                    });
          
                    
        

                },
                error: function (err) {
                    
                    console.log(err);

                }


            });


        });

    }
    



});
