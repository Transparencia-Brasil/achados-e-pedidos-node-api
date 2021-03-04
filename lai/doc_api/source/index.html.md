---
title: Documentação da API

language_tabs:
  - javascript
  - html

toc_footers:
  - <a href='http://www.nxcd.com.br'>Nextcode</a>

includes:
  - errors

search: true
---

# Introdução

Bem vindo à API do portal LAI. Neste documento encontram-se os detalhes de acesso dos endpoints de pesquida de pedidos no elasticsearch.

Os trechos de código apresentados aqui são trechos HTML e JS para serem usados com JQuery. Segue CDN para uso:

https://code.jquery.com/jquery-2.2.4.min.js


Para suporte utilize o email abaixo:

suporte@nxcd.com.br

# Autenticação

As APIs não precisam de autenticação. Através do arquivo config.js na raiz do projeto é possível configurar os IPs dos servidores que poderão acessar a aplicação.

Para liberaro o acesso de um servidor, acrescente seu IP no array de chave "allowedIPs".

# Pedidos

## Criar pedido

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnCriar" ).click(function() {
            criar();
        });        
    });

    function criar() {

        var data = { 
            "agentes_codigo_local" :  $('#agentes_codigo_local').val(),
            "agentes_nome_local" :  $('#agentes_nome_local').val(),
            "usuarios_codigo_local" :  $('#usuarios_codigo_local').val(),
            "usuarios_email_local" :  $('#usuarios_email_local').val(),
            "usuarios_nome_local" :  $('#usuarios_nome_local').val(),
            "status_pedido_codigo_local" :  $('#status_pedido_codigo_local').val(),
            "status_pedido_interno_codigo_local" :  $('#status_pedido_interno_codigo_local').val(),
            "status_pedido_interno_nome_local" :  $('#status_pedido_interno_nome_local').val(),
            "status_pedido_nome_local" :  $('#status_pedido_nome_local').val(),
            "tipo_pedido_situacao_codigo_local" :  $('#tipo_pedido_situacao_codigo_local').val(),
            "tipo_pedido_situacao_nome_local" :  $('#tipo_pedido_situacao_nome_local').val(),
            "tipo_pedido_origem_codigo_local"      :  $('#tipo_pedido_origem_codigo_local').val(),
            "tipo_pedido_origem_nome_local" :  $('#tipo_pedido_origem_nome_local').val(),
            "tipo_poder_codigo_local" :  $('#tipo_poder_codigo_local').val(),
            "tipo_poder_nome_local" :  $('#tipo_poder_nome_local').val(),
            "tipo_nivel_federativo_codigo_local" : $('#tipo_nivel_federativo_codigo_local').val(),
            "tipo_nivel_federativo_nome_local" : $('#tipo_nivel_federativo_nome_local').val(),
            "pedidos_protocolo_local" :  $('#pedidos_protocolo_local').val(),
            "pedidos_titulo_local" :  $('#pedidos_titulo_local').val(),
            "pedidos_slug_local" :  $('#pedidos_slug_local').val(),
            "pedidos_descricao_local" :  $('#pedidos_descricao_local').val(),
            "pedidos_foi_prorrogado_local" :  $('#pedidos_foi_prorrogado_local').val(),
            "pedidos_anonimo_local" :  $('#pedidos_anonimo_local').val(),
            "pedidos_data_envio_local" :  $('#pedidos_data_envio_local').val(),
            "pedidos_enviado_para_local" :  $('#pedidos_enviado_para_local').val(),
            "tipo_pedidos_resposta_codigo" :  $('#tipo_pedidos_resposta_codigo').val(),
            "tipo_pedidos_resposta_nome" :  $('#tipo_pedidos_resposta_nome').val()
            

        };

        var urlApi = '/achadosepedidos.org.br/api/pedidos/criar/' + $('#codigo_pedido').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Pedido criado");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Criar Pedido</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_pedido</td>
                <td><input type="text" id="codigo_pedido"></td>
            </tr>
            <tr>
                <td>agentes_codigo_local</td>
                <td><input type="text" id="agentes_codigo_local"></td>
            </tr>
            <tr>
                <td>agentes_nome_local</td>
                <td><input type="text" id="agentes_nome_local"></td>
            </tr>
            <tr>
                <td>usuarios_codigo_local</td>
                <td><input type="text" id="usuarios_codigo_local"></td>
            </tr>
            <tr>
                <td>usuarios_email_local</td>
                <td><input type="text" id="usuarios_email_local"></td>
            </tr>
            <tr>
                <td>usuarios_nome_local</td>
                <td><input type="text" id="usuarios_nome_local"></td>
            </tr>
            <tr>
                <td>status_pedido_codigo_local</td>
                <td><input type="text" id="status_pedido_codigo_local"></td>
            </tr>
            <tr>
                <td>status_pedido_interno_codigo_local</td>
                <td><input type="text" id="status_pedido_interno_codigo_local"></td>
            </tr>
            <tr>
                <td>status_pedido_interno_nome_local</td>
                <td><input type="text" id="status_pedido_interno_nome_local"></td>
            </tr>
            <tr>
                <td>status_pedido_nome_local</td>
                <td><input type="text" id="status_pedido_nome_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_situacao_codigo_local</td>
                <td><input type="text" id="tipo_pedido_situacao_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_situacao_nome_local</td>
                <td><input type="text" id="tipo_pedido_situacao_nome_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_origem_codigo_local</td>
                <td><input type="text" id="tipo_pedido_origem_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_origem_nome_local</td>
                <td><input type="text" id="tipo_pedido_origem_nome_local"></td>
            </tr>
            <tr>
                <td>tipo_poder_codigo_local</td>
                <td><input type="text" id="tipo_poder_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_poder_nome_local</td>
                <td><input type="text" id="tipo_poder_nome_local"></td>
            </tr>
            <tr>
                <td>tipo_nivel_federativo_codigo_local</td>
                <td><input type="text" id="tipo_nivel_federativo_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_podertipo_nivel_federativo_nome_local_nome_local</td>
                <td><input type="text" id="tipo_nivel_federativo_nome_local"></td>
            </tr>
            <tr>
                <td>pedidos_protocolo_local</td>
                <td><input type="text" id="pedidos_protocolo_local"></td>
            </tr>
            <tr>
                <td>pedidos_titulo_local</td>
                <td><input type="text" id="pedidos_titulo_local"></td>
            </tr>
            <tr>
                <td>pedidos_slug_local</td>
                <td><input type="text" id="pedidos_slug_local"></td>
            </tr>
            <tr>   
                <td>pedidos_descricao_local</td>
                <td><input type="text" id="pedidos_descricao_local"></td>
            </tr>
            <tr>
                <td>pedidos_foi_prorrogado_local</td>
                <td><input type="text" id="pedidos_foi_prorrogado_local"></td>
            </tr>
            <tr>
                <td>pedidos_anonimo_local</td>
                <td><input type="text" id="pedidos_anonimo_local"></td>
            </tr>
            <tr>
                <td>pedidos_data_envio_local</td>
                <td><input type="text" id="pedidos_data_envio_local"></td>
            </tr>
            <tr>
                <td>pedidos_enviado_para_local</td>
                <td><input type="text" id="pedidos_enviado_para_local"></td>
            </tr>
            <tr>
                <td>tipo_pedidos_resposta_codigo</td>
                <td><input type="text" id="tipo_pedidos_resposta_codigo"></td>
            </tr>
            <tr>
                <td>tipo_pedidos_resposta_nome</td>
                <td><input type="text" id="tipo_pedidos_resposta_nome"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnCriar" value="Criar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar pedidos no elasticsearch, caso o código do pedido já tenha sido utilizado, o endpoint resultará em erro. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/pedidos/criar/$CODIGO_PEDIDO`


### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_PEDIDO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
agentes_codigo_local | Número | 
agentes_nome_local | Texto | 
usuarios_codigo_local | Número | 
usuarios_email_local | Texto | 
usuarios_nome_local | Texto | 
status_pedido_codigo_local | Número | 
status_pedido_interno_codigo_local | Número | 
status_pedido_interno_nome_local | Texto | 
status_pedido_nome_local | Texto | 
tipo_pedido_situacao_codigo_local | Número | 
tipo_pedido_situacao_nome_local | Texto |  
tipo_pedido_origem_codigo_local | Número |
tipo_pedido_origem_nome_local | Texto | 
tipo_poder_codigo_local | Número |
tipo_poder_nome_local | Texto | 
tipo_nivel_federativo_codigo_local | Número |
tipo_nivel_federativo_nome_local | Texto | 
pedidos_protocolo_local | Texto | 
pedidos_titulo_local | Texto | 
pedidos_slug_local | Texto | 
pedidos_descricao_local | Texto | 
pedidos_foi_prorrogado_local | Texto | 
pedidos_anonimo_local | Texto | 
pedidos_data_envio_local | Texto | Timestamp em formato "aaaa-mm-dd"
pedidos_enviado_para_local | Texto | 
tipo_pedidos_resposta_codigo | Número | 
tipo_pedidos_resposta_nome | Texto | 



## Gravar pedido

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnGravar" ).click(function() {
            gravar();
        });        
    });

    function gravar() {

        var data = { 
            "agentes_codigo_local" :  $('#agentes_codigo_local').val(),
            "agentes_nome_local" :  $('#agentes_nome_local').val(),
            "usuarios_codigo_local" :  $('#usuarios_codigo_local').val(),
            "usuarios_email_local" :  $('#usuarios_email_local').val(),
            "usuarios_nome_local" :  $('#usuarios_nome_local').val(),
            "status_pedido_codigo_local" :  $('#status_pedido_codigo_local').val(),
            "status_pedido_interno_codigo_local" :  $('#status_pedido_interno_codigo_local').val(),
            "status_pedido_interno_nome_local" :  $('#status_pedido_interno_nome_local').val(),
            "status_pedido_nome_local" :  $('#status_pedido_nome_local').val(),
            "tipo_pedido_situacao_codigo_local" :  $('#tipo_pedido_situacao_codigo_local').val(),
            "tipo_pedido_situacao_nome_local" :  $('#tipo_pedido_situacao_nome_local').val(),
            "tipo_pedido_origem_codigo_local"      :  $('#tipo_pedido_origem_codigo_local').val(),
            "tipo_pedido_origem_nome_local" :  $('#tipo_pedido_origem_nome_local').val(),
            "tipo_poder_codigo_local" :  $('#tipo_poder_codigo_local').val(),
            "tipo_poder_nome_local" :  $('#tipo_poder_nome_local').val(),
            "tipo_nivel_federativo_codigo_local" : $('#tipo_nivel_federativo_codigo_local').val(),
            "tipo_nivel_federativo_nome_local" : $('#tipo_nivel_federativo_nome_local').val(),
            "pedidos_protocolo_local" :  $('#pedidos_protocolo_local').val(),
            "pedidos_titulo_local" :  $('#pedidos_titulo_local').val(),
            "pedidos_slug_local" :  $('#pedidos_slug_local').val(),
            "pedidos_descricao_local" :  $('#pedidos_descricao_local').val(),
            "pedidos_foi_prorrogado_local" :  $('#pedidos_foi_prorrogado_local').val(),
            "pedidos_anonimo_local" :  $('#pedidos_anonimo_local').val(),
            "pedidos_data_envio_local" :  $('#pedidos_data_envio_local').val(),
            "pedidos_enviado_para_local" :  $('#pedidos_enviado_para_local').val(),
            "tipo_pedidos_resposta_codigo" :  $('#tipo_pedidos_resposta_codigo').val(),
            "tipo_pedidos_resposta_nome" :  $('#tipo_pedidos_resposta_nome').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/pedidos/gravar/' + $('#codigo_pedido').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Pedido salvo");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Gravar Pedido</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_pedido</td>
                <td><input type="text" id="codigo_pedido"></td>
            </tr>
            <tr>
                <td>agentes_codigo_local</td>
                <td><input type="text" id="agentes_codigo_local"></td>
            </tr>
            <tr>
                <td>agentes_nome_local</td>
                <td><input type="text" id="agentes_nome_local"></td>
            </tr>
            <tr>
                <td>usuarios_codigo_local</td>
                <td><input type="text" id="usuarios_codigo_local"></td>
            </tr>
            <tr>
                <td>usuarios_email_local</td>
                <td><input type="text" id="usuarios_email_local"></td>
            </tr>
            <tr>
                <td>usuarios_nome_local</td>
                <td><input type="text" id="usuarios_nome_local"></td>
            </tr>
            <tr>
                <td>status_pedido_codigo_local</td>
                <td><input type="text" id="status_pedido_codigo_local"></td>
            </tr>
            <tr>
                <td>status_pedido_interno_codigo_local</td>
                <td><input type="text" id="status_pedido_interno_codigo_local"></td>
            </tr>
            <tr>
                <td>status_pedido_interno_nome_local</td>
                <td><input type="text" id="status_pedido_interno_nome_local"></td>
            </tr>
            <tr>
                <td>status_pedido_nome_local</td>
                <td><input type="text" id="status_pedido_nome_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_situacao_codigo_local</td>
                <td><input type="text" id="tipo_pedido_situacao_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_situacao_nome_local</td>
                <td><input type="text" id="tipo_pedido_situacao_nome_local"></td>
            </tr>     
            <tr>
                <td>tipo_pedido_origem_codigo_local</td>
                <td><input type="text" id="tipo_pedido_origem_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_pedido_origem_nome_local</td>
                <td><input type="text" id="tipo_pedido_origem_nome_local"></td>
            </tr>
            
            <tr>
                <td>tipo_poder_codigo_local</td>
                <td><input type="text" id="tipo_poder_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_poder_nome_local</td>
                <td><input type="text" id="tipo_poder_nome_local"></td>
            </tr>

            <tr>
                <td>tipo_nivel_federativo_codigo_local</td>
                <td><input type="text" id="tipo_nivel_federativo_codigo_local"></td>
            </tr>
            <tr>
                <td>tipo_nivel_federativo_nome_local</td>
                <td><input type="text" id="tipo_nivel_federativo_nome_local"></td>
            </tr> 
            <tr>
                <td>pedidos_protocolo_local</td>
                <td><input type="text" id="pedidos_protocolo_local"></td>
            </tr>
            <tr>
                <td>pedidos_titulo_local</td>
                <td><input type="text" id="pedidos_titulo_local"></td>
            </tr>
            <tr>
                <td>pedidos_slug_local</td>
                <td><input type="text" id="pedidos_slug_local"></td>
            </tr>
            <tr>   
                <td>pedidos_descricao_local</td>
                <td><input type="text" id="pedidos_descricao_local"></td>
            </tr>
            <tr>
                <td>pedidos_foi_prorrogado_local</td>
                <td><input type="text" id="pedidos_foi_prorrogado_local"></td>
            </tr>
            <tr>
                <td>pedidos_anonimo_local</td>
                <td><input type="text" id="pedidos_anonimo_local"></td>
            </tr>
            <tr>
                <td>pedidos_data_envio_local</td>
                <td><input type="text" id="pedidos_data_envio_local"></td>
            </tr>
            <tr>
                <td>pedidos_enviado_para_local</td>
                <td><input type="text" id="pedidos_enviado_para_local"></td>
            </tr>
            <tr>
                <td>tipo_pedidos_resposta_codigo</td>
                <td><input type="text" id="tipo_pedidos_resposta_codigo"></td>
            </tr>
            <tr>
                <td>tipo_pedidos_resposta_nome</td>
                <td><input type="text" id="tipo_pedidos_resposta_nome"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnGravar" value="Gravar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar pedidos no elasticsearch, caso o código do pedido já tenha sido utilizado, o endpoint sobreescreverá o json no elasticsearch. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/pedidos/gravar/$CODIGO_PEDIDO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_PEDIDO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
agentes_codigo_local | Número | 
agentes_nome_local | Texto | 
usuarios_codigo_local | Número | 
usuarios_email_local | Texto | 
usuarios_nome_local | Texto | 
status_pedido_codigo_local | Número | 
status_pedido_interno_codigo_local | Número | 
status_pedido_interno_nome_local | Texto | 
status_pedido_nome_local | Texto | 
tipo_pedido_situacao_codigo_local | Número | 
tipo_pedido_situacao_nome_local | Texto | 
tipo_pedido_origem_codigo_local | Número |
tipo_pedido_origem_nome_local | Texto | 
tipo_poder_codigo_local | Número |
tipo_poder_nome_local | Texto | 
tipo_nivel_federativo_codigo_local | Número |
tipo_nivel_federativo_nome_local | Texto | 
pedidos_protocolo_local | Texto | 
pedidos_titulo_local | Texto | 
pedidos_slug_local | Texto | 
pedidos_descricao_local | Texto | 
pedidos_foi_prorrogado_local | Texto | 
pedidos_anonimo_local | Texto | 
pedidos_data_envio_local | Texto | Timestamp em formato "aaaa-mm-dd"
pedidos_enviado_para_local | Texto | 
tipo_pedidos_resposta_codigo | Número | 
tipo_pedidos_resposta_nome | Texto |


## Apagar pedido

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnApagar" ).click(function() {
            apagar();
        });        
    });

    function apagar() {

        var urlApi = '/achadosepedidos.org.br/api/pedidos/apagar/' + $('#codigo_pedido').val();

        $.ajax(urlApi, {
            method: "DELETE",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Pedido salvo");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Apagar Pedido</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_pedido</td>
                <td><input type="text" id="codigo_pedido"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnApagar" value="Apagar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para apagar um pedido no elasticsearch. 

### HTTP Request

`DELETE /achadosepedidos.org.br/api/pedidos/apagar/$CODIGO_PEDIDO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_PEDIDO | Número | Obrigatório






## Consultar pedido por ID

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/pedidos/consultar/' + $('#codigo_pedido').val();

        $.ajax(urlApi, {
            method: "GET",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Pedido encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Pedido</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_pedido</td>
                <td><input type="text" id="codigo_pedido"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "... objeto do pedido ..."
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar um pedido no elasticsearch através de seu ID. 

### HTTP Request

`GET /achadosepedidos.org.br/api/pedidos/consultar/$CODIGO_PEDIDO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_PEDIDO | Número | Obrigatório







## Consultar pedido

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var data = { 
            "value" :  $('#value').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/pedidos/consultar/';

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert("Pedido encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Pedido</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Value</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "total": 0,
    "max_score": null,
    "hits": [
        "... array de pedidos ..."
    ]
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar um pedido no elasticsearch através de qualquer palavra inserida no corpo do pedido.

### HTTP Request

`POST /achadosepedidos.org.br/api/pedidos/consultar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório




## Contar pedidos

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/pedidos/contar/';

        var data = { 
            "value" :  $('#value').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert(result);
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Contar Pedidos</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna número inteiro com a quantidade de documentos que satisfazem a pesquisa:

```json
0
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para contar a quantidade de pedidos no elasticsearch através de qualquer palavra inserida no corpo do pedido. 

### HTTP Request

`POST /achadosepedidos.org.br/api/pedidos/contar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório

















# Interações

## Criar interação

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnCriar" ).click(function() {
            criar();
        });        
    });

    function criar() {

        var data = { 
            "pedidos_codigo" :  $('#pedidos_codigo').val(),
            "usuarios_codigo" :  $('#usuarios_codigo').val(),
            "usuarios_nome" :  $('#usuarios_nome').val(),
            "usuarios_email" :  $('#usuarios_email').val(),
            "agentes_codigo" :  $('#agentes_codigo').val(),
            "agentes_nome" :  $('#agentes_nome').val(),
            "tipo_pedido_situacao_codigo" :  $('#tipo_pedido_situacao_codigo').val(),
            "tipo_pedido_situacao_nome" :  $('#tipo_pedido_situacao_nome').val(),
            "status_pedido_codigo" :  $('#status_pedido_codigo').val(),
            "status_pedido_nome" :  $('#status_pedido_nome').val(),
            "status_pedido_interno_codigo" :  $('#status_pedido_interno_codigo').val(),
            "status_pedido_interno_nome" :  $('#status_pedido_interno_nome').val(),
            "tipo_pedido_origem_codigo"      :  $('#tipo_pedido_origem_codigo').val(),
            "tipo_pedido_origem_nome" :  $('#tipo_pedido_origem_nome').val(),
            "tipo_poder_codigo" :  $('#tipo_poder_codigo').val(),
            "tipo_poder_nome" :  $('#tipo_poder_nome').val(),
            "tipo_nivel_federativo_codigo" : $('#tipo_nivel_federativo_codigo').val(),
            "tipo_nivel_federativo_nome" : $('#tipo_nivel_federativo_nome').val(),
            "pedidos_protocolo" :  $('#pedidos_protocolo').val(),
            "pedidos_titulo" :  $('#pedidos_titulo').val(),
            "pedidos_slug" :  $('#pedidos_slug').val(),
            "pedidos_descricao" :  $('#pedidos_descricao').val(),
            "pedidos_enviado_para" :  $('#pedidos_enviado_para').val(),
            "pedidos_data_envio" :  $('#pedidos_data_envio').val(),
            "pedidos_foi_prorrogado" :  $('#pedidos_foi_prorrogado').val(),
            "pedidos_anonimo" :  $('#pedidos_anonimo').val(),
            "interacoes_codigo_local" :  $('#interacoes_codigo_local').val(),
            "tipo_pedidos_resposta_codigo_local" :  $('#tipo_pedidos_resposta_codigo_local').val(),
            "tipo_pedidos_resposta_nome_local" :  $('#tipo_pedidos_resposta_nome_local').val(),
            "interacoes_descricao_local" :  $('#interacoes_descricao_local').val(),
            "interacoes_data_resposta_local" :  $('#interacoes_data_resposta_local').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/interacoes/criar/' + $('#interacoes_codigo_local').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Interação criada");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Criar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr><td>interacoes_codigo</td><td><input type="text" id="interacoes_codigo_local"></td></tr>
            <tr><td>tipo_pedidos_resposta_codigo_local</td><td><input type="text" id="tipo_pedidos_resposta_codigo_local"></td></tr>
            <tr><td>tipo_pedidos_resposta_nome_local</td><td><input type="text" id="tipo_pedidos_resposta_nome_local"></td></tr>
            <tr><td>interacoes_descricao_local</td><td><input type="text" id="interacoes_descricao_local"></td></tr>
            <tr><td>interacoes_data_resposta_local</td><td><input type="text" id="interacoes_data_resposta_local"></td></tr>
            <tr><td>codigo_pedido</td><td><input type="text" id="pedidos_codigo"></td></tr>
            <tr><td>usuarios_codigo</td><td><input type="text" id="usuarios_codigo"></td></tr>
            <tr><td>usuarios_nome</td><td><input type="text" id="usuarios_nome"></td></tr>
            <tr><td>usuarios_email</td><td><input type="text" id="usuarios_email"></td></tr>
            <tr><td>agentes_codigo</td><td><input type="text" id="agentes_codigo"></td></tr>
            <tr><td>agentes_nome</td><td><input type="text" id="agentes_nome"></td></tr>
            <tr><td>tipo_pedido_origem_codigo</td><td><input type="text" id="tipo_pedidos_origem_codigo"></td></tr>
            <tr><td>tipo_pedido_origem_nome</td><td><input type="text" id="tipo_pedidos_origem_nome"></td></tr>
            <tr><td>tipo_poder_codigo_local</td><td><input type="text" id="tipo_poder_codigo_local"></td></tr>
            <tr><td>tipo_poder_nome_local</td><td><input type="text" id="tipo_poder_nome_local"></td></tr>
            <tr><td>tipo_nivel_federativo_codigo_local</td><td><input type="text" id="tipo_nivel_federativo_codigo_local"></td></tr>
            <tr><td>tipo_nivel_federativo_nome_local</td><td><input type="text" id="tipo_nivel_federativo_nome_local"></td></tr>
            <tr><td>tipo_pedido_situacao_codigo</td><td><input type="text" id="tipo_pedido_situacao_codigo"></td></tr>
            <tr><td>tipo_pedido_situacao_nome</td><td><input type="text" id="tipo_pedido_situacao_nome"></td></tr>
            <tr><td>status_pedido_codigo</td><td><input type="text" id="status_pedido_codigo"></td></tr>
            <tr><td>status_pedido_nome</td><td><input type="text" id="status_pedido_nome"></td></tr>
            <tr><td>status_pedido_interno_codigo</td><td><input type="text" id="status_pedido_interno_codigo"></td></tr>
            <tr><td>status_pedido_interno_nome</td><td><input type="text" id="status_pedido_interno_nome"></td></tr>
            <tr><td>pedidos_protocolo</td><td><input type="text" id="pedidos_protocolo"></td></tr>
            <tr><td>pedidos_titulo</td><td><input type="text" id="pedidos_titulo"></td></tr>
            <tr><td>pedidos_slug</td><td><input type="text" id="pedidos_slug"></td></tr>
            <tr><td>pedidos_descricao</td><td><input type="text" id="pedidos_descricao"></td></tr>
            <tr><td>pedidos_enviado_para</td><td><input type="text" id="pedidos_enviado_para"></td></tr>
            <tr><td>pedidos_data_envio</td><td><input type="text" id="pedidos_data_envio"></td></tr>
            <tr><td>pedidos_foi_prorrogado</td><td><input type="text" id="pedidos_foi_prorrogado"></td></tr>
            <tr><td>pedidos_anonimo</td><td><input type="text" id="pedidos_anonimo"></td></tr>
            <tr><td colspan="2"><input type="button" id="btnGravar" value="Gravar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar interações no elasticsearch, caso o código da interação já tenha sido utilizado, o endpoint resultará em erro. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/interacoes/criar/$CODIGO_INTERACAO`


### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_INTERACAO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
interacoes_codigo | Número | Obrigatório
tipo_pedidos_resposta_codigo_local | Número | 
tipo_pedidos_resposta_nome_local | Texto | 
interacoes_descricao_local | Texto | 
interacoes_data_resposta_local | Data | Timestamp em formato "aaaa-mm-dd"
codigo_pedido | Número | Obrigatório
usuarios_codigo | Número | 
usuarios_nome | Texto | 
usuarios_email | Texto | 
agentes_codigo | Número | 
agentes_nome | Texto | 
tipo_pedido_situacao_codigo | Número | 
tipo_pedido_situacao_nome | Texto | 
status_pedido_codigo | Número | 
status_pedido_nome | Texto | 
status_pedido_interno_codigo | Número | 
status_pedido_interno_nome | Texto | 
tipo_pedido_origem_codigo | Número |
tipo_pedido_origem_nome | Texto | 
tipo_poder_codigo | Número |
tipo_poder_nome | Texto | 
tipo_nivel_federativo_codigo | Número |
tipo_nivel_federativo_nome | Texto | 
pedidos_protocolo | Texto | 
pedidos_titulo | Texto | 
pedidos_slug | Texto | 
pedidos_descricao | Texto | 
pedidos_enviado_para | Texto | 
pedidos_data_envio | Data | Timestamp em formato "aaaa-mm-dd"
pedidos_foi_prorrogado | Boolean | 
pedidos_anonimo | Boolean | 






## Gravar interação

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnGravar" ).click(function() {
            gravar();
        });        
    });

    function gravar() {

        var data = { 
            "pedidos_codigo" :  $('#pedidos_codigo').val(),
            "usuarios_codigo" :  $('#usuarios_codigo').val(),
            "usuarios_nome" :  $('#usuarios_nome').val(),
            "usuarios_email" :  $('#usuarios_email').val(),
            "agentes_codigo" :  $('#agentes_codigo').val(),
            "agentes_nome" :  $('#agentes_nome').val(),
            "tipo_pedido_situacao_codigo" :  $('#tipo_pedido_situacao_codigo').val(),
            "tipo_pedido_situacao_nome" :  $('#tipo_pedido_situacao_nome').val(),
            "status_pedido_codigo" :  $('#status_pedido_codigo').val(),
            "status_pedido_nome" :  $('#status_pedido_nome').val(),
            "status_pedido_interno_codigo" :  $('#status_pedido_interno_codigo').val(),
            "status_pedido_interno_nome" :  $('#status_pedido_interno_nome').val(),
            "tipo_pedido_origem_codigo"      :  $('#tipo_pedido_origem_codigo').val(),
            "tipo_pedido_origem_nome" :  $('#tipo_pedido_origem_nome').val(),
            "tipo_poder_codigo" :  $('#tipo_poder_codigo').val(),
            "tipo_poder_nome" :  $('#tipo_poder_nome').val(),
            "tipo_nivel_federativo_codigo" : $('#tipo_nivel_federativo_codigo').val(),
            "tipo_nivel_federativo_nome" : $('#tipo_nivel_federativo_nome').val(),
            "pedidos_protocolo" :  $('#pedidos_protocolo').val(),
            "pedidos_titulo" :  $('#pedidos_titulo').val(),
            "pedidos_slug" :  $('#pedidos_slug').val(),
            "pedidos_descricao" :  $('#pedidos_descricao').val(),
            "pedidos_enviado_para" :  $('#pedidos_enviado_para').val(),
            "pedidos_data_envio" :  $('#pedidos_data_envio').val(),
            "pedidos_foi_prorrogado" :  $('#pedidos_foi_prorrogado').val(),
            "pedidos_anonimo" :  $('#pedidos_anonimo').val(),
            "interacoes_codigo_local" :  $('#interacoes_codigo_local').val(),
            "tipo_pedidos_resposta_codigo_local" :  $('#tipo_pedidos_resposta_codigo_local').val(),
            "tipo_pedidos_resposta_nome_local" :  $('#tipo_pedidos_resposta_nome_local').val(),
            "interacoes_descricao_local" :  $('#interacoes_descricao_local').val(),
            "interacoes_data_resposta_local" :  $('#interacoes_data_resposta_local').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/interacoes/gravar/' + $('#interacoes_codigo_local').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Interação salva");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Gravar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr><td>interacoes_codigo</td><td><input type="text" id="interacoes_codigo_local"></td></tr>
            <tr><td>tipo_pedidos_resposta_codigo_local</td><td><input type="text" id="tipo_pedidos_resposta_codigo_local"></td></tr>
            <tr><td>tipo_pedidos_resposta_nome_local</td><td><input type="text" id="tipo_pedidos_resposta_nome_local"></td></tr>
            <tr><td>interacoes_descricao_local</td><td><input type="text" id="interacoes_descricao_local"></td></tr>
            <tr><td>interacoes_data_resposta_local</td><td><input type="text" id="interacoes_data_resposta_local"></td></tr>
            <tr><td>codigo_pedido</td><td><input type="text" id="pedidos_codigo"></td></tr>
            <tr><td>usuarios_codigo</td><td><input type="text" id="usuarios_codigo"></td></tr>
            <tr><td>usuarios_nome</td><td><input type="text" id="usuarios_nome"></td></tr>
            <tr><td>usuarios_email</td><td><input type="text" id="usuarios_email"></td></tr>
            <tr><td>agentes_codigo</td><td><input type="text" id="agentes_codigo"></td></tr>
            <tr><td>agentes_nome</td><td><input type="text" id="agentes_nome"></td></tr>
            <tr><td>tipo_pedido_origem_codigo</td><td><input type="text" id="tipo_pedidos_origem_codigo"></td></tr>
            <tr><td>tipo_pedido_origem_nome</td><td><input type="text" id="tipo_pedidos_origem_nome"></td></tr>
            <tr><td>tipo_poder_codigo_local</td><td><input type="text" id="tipo_poder_codigo_local"></td></tr>
            <tr><td>tipo_poder_nome_local</td><td><input type="text" id="tipo_poder_nome_local"></td></tr>
            <tr><td>tipo_nivel_federativo_codigo_local</td><td><input type="text" id="tipo_nivel_federativo_codigo_local"></td></tr>
            <tr><td>tipo_nivel_federativo_nome_local</td><td><input type="text" id="tipo_nivel_federativo_nome_local"></td></tr>
            <tr><td>tipo_pedido_situacao_codigo</td><td><input type="text" id="tipo_pedido_situacao_codigo"></td></tr>
            <tr><td>tipo_pedido_situacao_nome</td><td><input type="text" id="tipo_pedido_situacao_nome"></td></tr>
            <tr><td>status_pedido_codigo</td><td><input type="text" id="status_pedido_codigo"></td></tr>
            <tr><td>status_pedido_nome</td><td><input type="text" id="status_pedido_nome"></td></tr>
            <tr><td>status_pedido_interno_codigo</td><td><input type="text" id="status_pedido_interno_codigo"></td></tr>
            <tr><td>status_pedido_interno_nome</td><td><input type="text" id="status_pedido_interno_nome"></td></tr>
            <tr><td>pedidos_protocolo</td><td><input type="text" id="pedidos_protocolo"></td></tr>
            <tr><td>pedidos_titulo</td><td><input type="text" id="pedidos_titulo"></td></tr>
            <tr><td>pedidos_slug</td><td><input type="text" id="pedidos_slug"></td></tr>
            <tr><td>pedidos_descricao</td><td><input type="text" id="pedidos_descricao"></td></tr>
            <tr><td>pedidos_enviado_para</td><td><input type="text" id="pedidos_enviado_para"></td></tr>
            <tr><td>pedidos_data_envio</td><td><input type="text" id="pedidos_data_envio"></td></tr>
            <tr><td>pedidos_foi_prorrogado</td><td><input type="text" id="pedidos_foi_prorrogado"></td></tr>
            <tr><td>pedidos_anonimo</td><td><input type="text" id="pedidos_anonimo"></td></tr>
            <tr><td colspan="2"><input type="button" id="btnGravar" value="Gravar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar interações no elasticsearch, caso o código da interação já tenha sido utilizado, o endpoint sobreescreverá o json no elasticsearch. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/interacoes/gravar/$CODIGO_INTERACAO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_INTERACAO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
interacoes_codigo | Número | Obrigatório
tipo_pedidos_resposta_codigo_local | Número | 
tipo_pedidos_resposta_nome_local | Texto | 
interacoes_descricao_local | Texto | 
interacoes_data_resposta_local | Data | Timestamp em formato "aaaa-mm-dd"
codigo_pedido | Número | Obrigatório
usuarios_codigo | Número | 
usuarios_nome | Texto | 
usuarios_email | Texto | 
agentes_codigo | Número | 
agentes_nome | Texto | 
tipo_pedido_situacao_codigo | Número | 
tipo_pedido_situacao_nome | Texto | 
status_pedido_codigo | Número | 
status_pedido_nome | Texto | 
status_pedido_interno_codigo | Número | 
status_pedido_interno_nome | Texto | 
tipo_pedido_origem_codigo | Número |
tipo_pedido_origem_nome | Texto | 
tipo_poder_codigo | Número |
tipo_poder_nome | Texto | 
tipo_nivel_federativo_codigo | Número |
tipo_nivel_federativo_nome | Texto | 
pedidos_protocolo | Texto | 
pedidos_titulo | Texto | 
pedidos_slug | Texto | 
pedidos_descricao | Texto | 
pedidos_enviado_para | Texto | 
pedidos_data_envio | Data | Timestamp em formato "aaaa-mm-dd"
pedidos_foi_prorrogado | Boolean | 
pedidos_anonimo | Boolean | 





## Apagar interação

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnApagar" ).click(function() {
            apagar();
        });        
    });

    function apagar() {

        var urlApi = '/achadosepedidos.org.br/api/interacoes/apagar/' + $('#codigo_interacao').val();

        $.ajax(urlApi, {
            method: "DELETE",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Interação apagada");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Apagar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_interacao</td>
                <td><input type="text" id="codigo_interacao"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnApagar" value="Apagar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para apagar uma interação no elasticsearch. 

### HTTP Request

`DELETE /achadosepedidos.org.br/api/interacoes/apagar/$CODIGO_INTERACAO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_INTERACAO | Número | Obrigatório



## Consultar interação por ID

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/interacoes/consultar/' + $('#codigo_interacao').val();

        $.ajax(urlApi, {
            method: "GET",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Interação encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_interacao</td>
                <td><input type="text" id="codigo_interacao"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "... objeto da interação ..."
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar uma integração no elasticsearch através de seu ID. 

### HTTP Request

`GET /achadosepedidos.org.br/api/interacoes/consultar/$CODIGO_INTERACAO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_INTERACAO | Número | Obrigatório







## Consultar interação

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/interacoes/consultar/';

        var data = { 
            'value' :  $('#value').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert("Interação encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "total": 0,
    "max_score": null,
    "hits": [
        "... array de interações ..."
    ]
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar uma interação no elasticsearch através de qualquer palavra inserida no corpo da interação. 

### HTTP Request

`POST /achadosepedidos.org.br/api/interacoes/consultar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório



## Contar interações

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/interacoes/contar/';

        var data = { 
            'value' :  $('#value').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert(result);
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Contar Interações</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna número inteiro com a quantidade de documentos que satisfazem a pesquisa:

```json
0
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para contar a quantidade de interações no elasticsearch através de qualquer palavra inserida no corpo da interação. 

### HTTP Request

`POST /achadosepedidos.org.br/api/interacoes/contar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório















# Anexos

## Criar anexo

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnCriar" ).click(function() {
            criar();
        });        
    });

    function criar() {

        var data = { 
            "pedidos_codigo" :  $('#pedidos_codigo').val(),
            "usuarios_codigo" :  $('#usuarios_codigo').val(),
            "usuarios_nome" :  $('#usuarios_nome').val(),
            "usuarios_email" :  $('#usuarios_email').val(),
            "agentes_codigo" :  $('#agentes_codigo').val(),
            "agentes_nome" :  $('#agentes_nome').val(),
            "tipo_pedido_situacao_codigo" :  $('#tipo_pedido_situacao_codigo').val(),
            "tipo_pedido_situacao_nome" :  $('#tipo_pedido_situacao_nome').val(),
            "status_pedido_codigo" :  $('#status_pedido_codigo').val(),
            "status_pedido_nome" :  $('#status_pedido_nome').val(),
            "status_pedido_interno_codigo" :  $('#status_pedido_interno_codigo').val(),
            "status_pedido_interno_nome" :  $('#status_pedido_interno_nome').val(),
            "tipo_pedido_origem_codigo"      :  $('#tipo_pedido_origem_codigo').val(),
            "tipo_pedido_origem_nome" :  $('#tipo_pedido_origem_nome').val(),
            "tipo_poder_codigo" :  $('#tipo_poder_codigo').val(),
            "tipo_poder_nome" :  $('#tipo_poder_nome').val(),
            "tipo_nivel_federativo_codigo" : $('#tipo_nivel_federativo_codigo').val(),
            "tipo_nivel_federativo_nome" : $('#tipo_nivel_federativo_nome').val(),
            "pedidos_protocolo" :  $('#pedidos_protocolo').val(),
            "pedidos_titulo" :  $('#pedidos_titulo').val(),
            "pedidos_slug" :  $('#pedidos_slug').val(),
            "pedidos_descricao" :  $('#pedidos_descricao').val(),
            "pedidos_enviado_para" :  $('#pedidos_enviado_para').val(),
            "pedidos_data_envio" :  $('#pedidos_data_envio').val(),
            "pedidos_foi_prorrogado" :  $('#pedidos_foi_prorrogado').val(),
            "pedidos_anonimo" :  $('#pedidos_anonimo').val(),
            "interacoes_codigo" :  $('#interacoes_codigo').val(),
            "tipo_pedidos_resposta_codigo" :  $('#tipo_pedidos_resposta_codigo').val(),
            "tipo_pedidos_resposta_nome" :  $('#tipo_pedidos_resposta_nome').val(),
            "interacoes_descricao" :  $('#interacoes_descricao').val(),
            "interacoes_data_resposta" :  $('#interacoes_data_resposta').val(),
            "anexos_codigo" :  $('#anexos_codigo').val(),
            "anexos_arquivo" :  $('#anexos_arquivo').val(),
            "anexos_conteudo_arquivo" :  $('#anexos_conteudo_arquivo').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/anexos/criar/' + $('#anexos_codigo').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Anexo criado");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Criar Anexo</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr><td>anexos_codigo</td><td><input type="text" id="anexos_codigo"></td></tr>
            <tr><td>anexos_arquivo</td><td><input type="text" id="anexos_arquivo"></td></tr>
            <tr><td>anexos_conteudo_arquivo</td><td><input type="text" id="anexos_conteudo_arquivo"></td></tr>
            <tr><td>codigo_pedido</td><td><input type="text" id="pedidos_codigo"></td></tr>
            <tr><td>usuarios_codigo</td><td><input type="text" id="usuarios_codigo"></td></tr>
            <tr><td>usuarios_nome</td><td><input type="text" id="usuarios_nome"></td></tr>
            <tr><td>usuarios_email</td><td><input type="text" id="usuarios_email"></td></tr>
            <tr><td>agentes_codigo</td><td><input type="text" id="agentes_codigo"></td></tr>
            <tr><td>agentes_nome</td><td><input type="text" id="agentes_nome"></td></tr>
            <tr><td>tipo_pedido_origem_codigo</td><td><input type="text" id="tipo_pedidos_origem_codigo"></td></tr>
            <tr><td>tipo_pedido_origem_nome</td><td><input type="text" id="tipo_pedidos_origem_nome"></td></tr>
            <tr><td>tipo_poder_codigo_local</td><td><input type="text" id="tipo_poder_codigo_local"></td></tr>
            <tr><td>tipo_poder_nome_local</td><td><input type="text" id="tipo_poder_nome_local"></td></tr>
            <tr><td>tipo_nivel_federativo_codigo_local</td><td><input type="text" id="tipo_nivel_federativo_codigo_local"></td></tr>
            <tr><td>tipo_nivel_federativo_nome_local</td><td><input type="text" id="tipo_nivel_federativo_nome_local"></td></tr>
            <tr><td>tipo_pedido_situacao_codigo</td><td><input type="text" id="tipo_pedido_situacao_codigo"></td></tr>
            <tr><td>tipo_pedido_situacao_nome</td><td><input type="text" id="tipo_pedido_situacao_nome"></td></tr>
            <tr><td>status_pedido_codigo</td><td><input type="text" id="status_pedido_codigo"></td></tr>
            <tr><td>status_pedido_nome</td><td><input type="text" id="status_pedido_nome"></td></tr>
            <tr><td>status_pedido_interno_codigo</td><td><input type="text" id="status_pedido_interno_codigo"></td></tr>
            <tr><td>status_pedido_interno_nome</td><td><input type="text" id="status_pedido_interno_nome"></td></tr>
            <tr><td>pedidos_protocolo</td><td><input type="text" id="pedidos_protocolo"></td></tr>
            <tr><td>pedidos_titulo</td><td><input type="text" id="pedidos_titulo"></td></tr>
            <tr><td>pedidos_slug</td><td><input type="text" id="pedidos_slug"></td></tr>
            <tr><td>pedidos_descricao</td><td><input type="text" id="pedidos_descricao"></td></tr>
            <tr><td>pedidos_enviado_para</td><td><input type="text" id="pedidos_enviado_para"></td></tr>
            <tr><td>pedidos_data_envio</td><td><input type="text" id="pedidos_data_envio"></td></tr>
            <tr><td>pedidos_foi_prorrogado</td><td><input type="text" id="pedidos_foi_prorrogado"></td></tr>
            <tr><td>pedidos_anonimo</td><td><input type="text" id="pedidos_anonimo"></td></tr>
            <tr><td>interacoes_codigo</td><td><input type="text" id="interacoes_codigo"></td></tr>
            <tr><td>tipo_pedidos_resposta_codigo</td><td><input type="text" id="tipo_pedidos_resposta_codigo"></td></tr>
            <tr><td>tipo_pedidos_resposta_nome</td><td><input type="text" id="tipo_pedidos_resposta_nome"></td></tr>
            <tr><td>interacoes_descricao</td><td><input type="text" id="interacoes_descricao"></td></tr>
            <tr><td>interacoes_data_resposta</td><td><input type="text" id="interacoes_data_resposta"></td></tr>
            <tr><td colspan="2"><input type="button" id="btnGravar" value="Criar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar anexos no elasticsearch, caso o código do anexo já tenha sido utilizado, o endpoint resultará em erro. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/anexos/criar/$CODIGO_ANEXO`


### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_ANEXO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
anexos_codigo | Número | Obrigatório
anexos_arquivo | Texto |
anexos_conteudo_arquivo | Texto |
interacoes_codigo | Número | Obrigatório
tipo_pedidos_resposta_codigo | Número | 
tipo_pedidos_resposta_nome | Texto | 
interacoes_descricao | Texto | 
interacoes_data_resposta | Data | Timestamp em formato "aaaa-mm-dd"
codigo_pedido | Número | Obrigatório
usuarios_codigo | Número | 
usuarios_nome | Texto | 
usuarios_email | Texto | 
agentes_codigo | Número | 
agentes_nome | Texto | 
tipo_pedido_situacao_codigo | Número | 
tipo_pedido_situacao_nome | Texto | 
status_pedido_codigo | Número | 
status_pedido_nome | Texto | 
status_pedido_interno_codigo | Número | 
status_pedido_interno_nome | Texto | 
tipo_pedido_origem_codigo | Número |
tipo_pedido_origem_nome | Texto | 
tipo_poder_codigo | Número |
tipo_poder_nome | Texto | 
tipo_nivel_federativo_codigo | Número |
tipo_nivel_federativo_nome | Texto | 
pedidos_protocolo | Texto | 
pedidos_titulo | Texto | 
pedidos_slug | Texto | 
pedidos_descricao | Texto | 
pedidos_enviado_para | Texto | 
pedidos_data_envio | Data | Timestamp em formato "aaaa-mm-dd"
pedidos_foi_prorrogado | Boolean | 
pedidos_anonimo | Boolean | 


## Gravar Anexo

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnGravar" ).click(function() {
            gravar();
        });        
    });

    function gravar() {

        var data = { 
            "pedidos_codigo" :  $('#pedidos_codigo').val(),
            "usuarios_codigo" :  $('#usuarios_codigo').val(),
            "usuarios_nome" :  $('#usuarios_nome').val(),
            "usuarios_email" :  $('#usuarios_email').val(),
            "agentes_codigo" :  $('#agentes_codigo').val(),
            "agentes_nome" :  $('#agentes_nome').val(),
            "tipo_pedidos_origem_codigo" :  $('#tipo_pedidos_origem_codigo').val(),
            "tipo_pedidos_origem_nome" :  $('#tipo_pedidos_origem_nome').val(),
            "tipo_pedido_situacao_codigo" :  $('#tipo_pedido_situacao_codigo').val(),
            "tipo_pedido_situacao_nome" :  $('#tipo_pedido_situacao_nome').val(),
            "status_pedido_codigo" :  $('#status_pedido_codigo').val(),
            "status_pedido_nome" :  $('#status_pedido_nome').val(),
            "status_pedido_interno_codigo" :  $('#status_pedido_interno_codigo').val(),
            "status_pedido_interno_nome" :  $('#status_pedido_interno_nome').val(),
            "tipo_pedido_origem_codigo"      :  $('#tipo_pedido_origem_codigo').val(),
            "tipo_pedido_origem_nome" :  $('#tipo_pedido_origem_nome').val(),
            "tipo_poder_codigo" :  $('#tipo_poder_codigo').val(),
            "tipo_poder_nome" :  $('#tipo_poder_nome').val(),
            "tipo_nivel_federativo_codigo" : $('#tipo_nivel_federativo_codigo').val(),
            "tipo_nivel_federativo_nome" : $('#tipo_nivel_federativo_nome').val(),
            "pedidos_protocolo" :  $('#pedidos_protocolo').val(),
            "pedidos_titulo" :  $('#pedidos_titulo').val(),
            "pedidos_slug" :  $('#pedidos_slug').val(),
            "pedidos_descricao" :  $('#pedidos_descricao').val(),
            "pedidos_enviado_para" :  $('#pedidos_enviado_para').val(),
            "pedidos_data_envio" :  $('#pedidos_data_envio').val(),
            "pedidos_foi_prorrogado" :  $('#pedidos_foi_prorrogado').val(),
            "pedidos_anonimo" :  $('#pedidos_anonimo').val(),
            "interacoes_codigo" :  $('#interacoes_codigo').val(),
            "tipo_pedidos_resposta_codigo" :  $('#tipo_pedidos_resposta_codigo').val(),
            "tipo_pedidos_resposta_nome" :  $('#tipo_pedidos_resposta_nome').val(),
            "interacoes_descricao" :  $('#interacoes_descricao').val(),
            "interacoes_data_resposta" :  $('#interacoes_data_resposta').val(),
            "anexos_codigo" :  $('#anexos_codigo').val(),
            "anexos_arquivo" :  $('#anexos_arquivo').val(),
            "anexos_conteudo_arquivo" :  $('#anexos_conteudo_arquivo').val()
        };

        var urlApi = '/achadosepedidos.org.br/api/anexos/gravar/' + $('#anexos_codigo').val();

        $.ajax(urlApi, {
            method: "PUT",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Anexo salvo");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Gravar Interação</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr><td>anexos_codigo</td><td><input type="text" id="anexos_codigo"></td></tr>
            <tr><td>anexos_arquivo</td><td><input type="text" id="anexos_arquivo"></td></tr>
            <tr><td>anexos_conteudo_arquivo</td><td><input type="text" id="anexos_conteudo_arquivo"></td></tr>
            <tr><td>codigo_pedido</td><td><input type="text" id="pedidos_codigo"></td></tr>
            <tr><td>usuarios_codigo</td><td><input type="text" id="usuarios_codigo"></td></tr>
            <tr><td>usuarios_nome</td><td><input type="text" id="usuarios_nome"></td></tr>
            <tr><td>usuarios_email</td><td><input type="text" id="usuarios_email"></td></tr>
            <tr><td>agentes_codigo</td><td><input type="text" id="agentes_codigo"></td></tr>
            <tr><td>agentes_nome</td><td><input type="text" id="agentes_nome"></td></tr>
            <tr><td>tipo_pedido_origem_codigo</td><td><input type="text" id="tipo_pedidos_origem_codigo"></td></tr>
            <tr><td>tipo_pedido_origem_nome</td><td><input type="text" id="tipo_pedidos_origem_nome"></td></tr>
            <tr><td>tipo_poder_codigo_local</td><td><input type="text" id="tipo_poder_codigo_local"></td></tr>
            <tr><td>tipo_poder_nome_local</td><td><input type="text" id="tipo_poder_nome_local"></td></tr>
            <tr><td>tipo_nivel_federativo_codigo_local</td><td><input type="text" id="tipo_nivel_federativo_codigo_local"></td></tr>
            <tr><td>tipo_nivel_federativo_nome_local</td><td><input type="text" id="tipo_nivel_federativo_nome_local"></td></tr>
            <tr><td>tipo_pedido_situacao_codigo</td><td><input type="text" id="tipo_pedido_situacao_codigo"></td></tr>
            <tr><td>tipo_pedido_situacao_nome</td><td><input type="text" id="tipo_pedido_situacao_nome"></td></tr>
            <tr><td>status_pedido_codigo</td><td><input type="text" id="status_pedido_codigo"></td></tr>
            <tr><td>status_pedido_nome</td><td><input type="text" id="status_pedido_nome"></td></tr>
            <tr><td>status_pedido_interno_codigo</td><td><input type="text" id="status_pedido_interno_codigo"></td></tr>
            <tr><td>status_pedido_interno_nome</td><td><input type="text" id="status_pedido_interno_nome"></td></tr>
            <tr><td>pedidos_protocolo</td><td><input type="text" id="pedidos_protocolo"></td></tr>
            <tr><td>pedidos_titulo</td><td><input type="text" id="pedidos_titulo"></td></tr>
            <tr><td>pedidos_slug</td><td><input type="text" id="pedidos_slug"></td></tr>
            <tr><td>pedidos_descricao</td><td><input type="text" id="pedidos_descricao"></td></tr>
            <tr><td>pedidos_enviado_para</td><td><input type="text" id="pedidos_enviado_para"></td></tr>
            <tr><td>pedidos_data_envio</td><td><input type="text" id="pedidos_data_envio"></td></tr>
            <tr><td>pedidos_foi_prorrogado</td><td><input type="text" id="pedidos_foi_prorrogado"></td></tr>
            <tr><td>pedidos_anonimo</td><td><input type="text" id="pedidos_anonimo"></td></tr>
            <tr><td>interacoes_codigo</td><td><input type="text" id="interacoes_codigo"></td></tr>
            <tr><td>tipo_pedidos_resposta_codigo</td><td><input type="text" id="tipo_pedidos_resposta_codigo"></td></tr>
            <tr><td>tipo_pedidos_resposta_nome</td><td><input type="text" id="tipo_pedidos_resposta_nome"></td></tr>
            <tr><td>interacoes_descricao</td><td><input type="text" id="interacoes_descricao"></td></tr>
            <tr><td>interacoes_data_resposta</td><td><input type="text" id="interacoes_data_resposta"></td></tr>
            <tr><td colspan="2"><input type="button" id="btnGravar" value="Gravar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve pra criar anexos no elasticsearch, caso o código do anexo já tenha sido utilizado, o endpoint sobreescreverá o json no elasticsearch. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/anexos/gravar/$CODIGO_ANEXO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_ANEXO | Número | Obrigatório


### Parâmetros do Request

Parâmetro | Tipo | Observação
--------- | ------- | -----------
anexos_codigo | Número | Obrigatório
anexos_arquivo | Texto |
anexos_conteudo_arquivo | Texto |
interacoes_codigo | Número | Obrigatório 
interacoes_descricao | Texto | 
interacoes_data_resposta | Data | Timestamp em formato "aaaa-mm-dd"
codigo_pedido | Número | Obrigatório
usuarios_codigo | Número | 
usuarios_nome | Texto | 
usuarios_email | Texto | 
agentes_codigo | Número | 
agentes_nome | Texto | 
tipo_pedidos_origem_codigo | Número | 
tipo_pedidos_origem_nome | Texto | 
tipo_pedido_situacao_codigo | Número | 
tipo_pedido_situacao_nome | Texto | 
status_pedido_codigo | Número | 
status_pedido_nome | Texto | 
status_pedido_interno_codigo | Número | 
status_pedido_interno_nome | Texto | 
tipo_pedido_origem_codigo | Número |
tipo_pedido_origem_nome | Texto | 
tipo_poder_codigo | Número |
tipo_poder_nome | Texto | 
tipo_nivel_federativo_codigo | Número |
tipo_nivel_federativo_nome | Texto | 
pedidos_protocolo | Texto | 
pedidos_titulo | Texto | 
pedidos_slug | Texto | 
pedidos_descricao | Texto | 
pedidos_enviado_para | Texto | 
pedidos_data_envio | Data | Timestamp em formato "aaaa-mm-dd"
pedidos_foi_prorrogado | Boolean | 
pedidos_anonimo | Boolean | 





## Apagar anexo

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnApagar" ).click(function() {
            apagar();
        });        
    });

    function apagar() {

        var urlApi = '/achadosepedidos.org.br/api/anexos/apagar/' + $('#anexos_codigo').val();

        $.ajax(urlApi, {
            method: "DELETE",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Anexo apagado");
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Apagar Anexo</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>anexos_codigo</td>
                <td><input type="text" id="anexos_codigo"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnApagar" value="Apagar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para apagar um anexo no elasticsearch. 

### HTTP Request

`DELETE /achadosepedidos.org.br/api/anexos/apagar/$CODIGO_ANEXO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_ANEXO | Número | Obrigatório














## Atualizar anexo pelo extractor

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnAtualizar" ).click(function() {
            atualizar();
        });        
    });

    function atualizar() {

        var urlApi = '/achadosepedidos.org.br/api/anexos/extractor-update/' + $('#anexos_codigo').val();

        var data = { 
            'value' :  $('#value').val(),
            'anexos_conteudo_arquivo' :  $('#anexos_conteudo_arquivo').val()
        };

        $.ajax(urlApi, {
            method: "PUT",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                console.log(result);
                alert('Ok');
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Atualizar anexo | extractor</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo</td>
                <td><input type="text" id="anexos_codigo"></td>
            </tr>
            <tr>
                <td>Conteudo do arquivo</td>
                <td><input type="text" id="anexos_conteudo_arquivo"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnAtualizar" value="Atualizar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "success": true
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para apagar um anexo no elasticsearch. 

### HTTP Request

`PUT /achadosepedidos.org.br/api/anexos/extractor-update/$CODIGO_ANEXO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_ANEXO | Número | Obrigatório


### Parâmetros - Body

Parâmetro | Tipo | Observação
--------- | ------- | -----------
anexos_conteudo_arquivo | Texto | Obrigatório, texto extraído do arquivo












## Consultar anexo por ID

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/anexos/consultar/' + $('#codigo_anexo').val();

        $.ajax(urlApi, {
            method: "GET",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert("Anexo encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Anexo</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>codigo_anexo</td>
                <td><input type="text" id="codigo_anexo"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "... objeto do anexo ..."
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar um anexo no elasticsearch através de seu ID. 

### HTTP Request

`GET /achadosepedidos.org.br/api/anexos/consultar/$CODIGO_ANEXO`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
CODIGO_ANEXO | Número | Obrigatório







## Consultar anexos

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/anexos/consultar/';

        var data = { 
            'value' :  $('#value').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert("Anexo encontrado");
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consultar Anexo</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "total": 0,
    "max_score": null,
    "hits": [
        "... array de anexos ..."
    ]
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para consultar um anexo no elasticsearch através de qualquer palavra inserida no corpo do anexo. 

### HTTP Request

`POST /achadosepedidos.org.br/api/anexos/consultar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório




## Contar anexos

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/anexos/contar/';

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            success: function (result) {
                alert(result);
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Contar Anexos</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna número inteiro com a quantidade de documentos que satisfazem a pesquisa:

```json
0
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para contar a quantidade de anexos no elasticsearch através de qualquer palavra inserida no corpo do anexo. 

### HTTP Request

`POST /achadosepedidos.org.br/api/anexos/contar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório


















# MultiIndex

## Contar documentos

```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/contar/';

        var data = { 
            'value' :  $('#value').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                alert(result);
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });
    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Contar Documentos</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna um objeto JSON com a quantidade de documentos que satisfazem a pesquisa para cada índice:

```json
{
    "interacoes": 0,
    "pedidos": 0,
    "anexos": 0
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint serve para contar a quantidade de pedidos, interações e anexos no elasticsearch através de qualquer palavra presente no corpo do documento dos 3 índices. 

### HTTP Request

`POST /achadosepedidos.org.br/api/contar/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório
















## Consulta simples


```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/consulta-simples/';

        var data = { 
            'value' :  $('#value').val(),
            'currentPage' : $('#currentPage').val()
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });

    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consulta Simples</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor:</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr>
                <td>Página atual na paginação:</td>
                <td><input type="text" id="currentPage"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "pagination": {
        "prelink": "",
        "current": 2,
        "previous": 1,
        "next": null,
        "first": 1,
        "last": null,
        "range": [
            1,
            2
        ],
        "fromResult": 3,
        "toResult": 4,
        "totalResult": 4,
        "pageCount": 2
    },
    "hits": {
        "took": 7,
        "timed_out": false,
        "_shards": {
            "total": 15,
            "successful": 15,
            "failed": 0
        },
        "hits": {
            "total": 0,
            "max_score": null,
            "hits": ["... objetos como resultado da busca são listados aqui ..."]
        }
    }
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint realiza uma consulta no elasticsearch nos índices de pedidos, interações e anexos simultaneamente, retornando além dos documentos como resultado um objeto com detalhes sobre a paginação e também os resultado da pesquisa em highlight. 

### HTTP Request

`POST /achadosepedidos.org.br/api/consulta-simples/`

### Parâmetros - Querystring

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório
currentPage | Número | Obrigatório, inteiro e maior que zero


### Parâmetros - Objeto pagination no resultado

Parâmetro | Tipo | Observação
--------- | ------- | -----------
prelink | Texto | Não utilizado
current | Número | Página atual
previous | Número | número da página anterior, retorna 'null' se a página atual é a primeira página 
next | Número | número da próxima página, retorna 'null' se a página atual for a última
first | Número | número da primeira página , retorna 'null' se a página atual é a primeira página 
last | Número | número da última página, retorna 'null' se a página atual for a última 
range | Número | Array contendo o número da página atual e mais duas páginas anteriores e duas próximas, para montar o objeto de paginação em tela 
fromResult | Número | Posição do objeto inicial da página. Ex: Consulta com 100 objetos e dez por página, na página dois o valor de fromResult é 11
toResult | Número | Posição do objeto final da página. Ex: Consulta com 100 objetos e dez por página, na página dois o valor de fromResult é 20
totalResult | Número | Quantidade de objetos retornados na pesquisa
pageCount | Número | Quantidade de páginas retornadas na pesquisa
















## Consulta com parâmetros


```javascript

$(function () {

    $(document).ready(function () {
        $( "#btnConsultar" ).click(function() {
            consultar();
        });        
    });

    function consultar() {

        var urlApi = '/achadosepedidos.org.br/api/consultar/';

        var data = { 
            'value'             : $('#value').val(),
            'currentPage'       : $('#currentPage').val(),
            'dataDe'            : $('#data-de').val(),
            'dataAte'           : $('#data-ate').val(),
            'chkEmTramitacao'   : $('#chkEmTramitacao').is(':checked'),
            'chkFinalizada'     : $('#chkFinalizada').is(':checked'),
            'chkNaoObteveResposta' : $('#chkNaoObteveResposta').is(':checked'),
            'pedidosRecursoSim' : $('input[id=pedidosRecursoSim]').filter(':checked').val(),
            'pedidosRecursoNao' : $('input[id=pedidosRecursoNao]').filter(':checked').val(),
            'chkAtendido'       : $('#chkAtendido').is(':checked'),
            'chkNaoAtendido'    : $('#chkNaoAtendido').is(':checked'),
            'chkParcAtendido'   : $('#chkParcAtendido').is(':checked'),
            'chkFederal'        : $('#chkFederal').is(':checked'),
            'chkEstadual'       : $('#chkEstadual').is(':checked'),
            'chkMunicipal'      : $('#chkMunicipal').is(':checked'),
            'chkLegislativo'    : $('#chkLegislativo').is(':checked'),
            'chkExecutivo'      : $('#chkExecutivo').is(':checked'),
            'chkJudiciario'     : $('#chkJudiciario').is(':checked'),
            'chkMinisterio'     : $('#chkMinisterio').is(':checked')
        };

        $.ajax(urlApi, {
            method: "POST",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function (err) {
                alert("Erro");
            }
        });

    }

});

```

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <title>Consulta Simples</title>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    </head>
    <body>
        <table>
            <tr>
                <td>Valor:</td>
                <td><input type="text" id="value"></td>
            </tr>
            <tr>
                <td>Página atual na paginação:</td>
                <td><input type="text" id="currentPage"></td>
            </tr>
            <tr>
                <td>De:</td>
                <td><input type="text" id="data-de"></td>
            </tr>
            <tr>
                <td>De:</td>
                <td><input type="text" id="data-ate"></td>
            </tr>
            
            <tr>
                <td>Em tramitacao</td>
                <td><input type="checkbox" id="chkEmTramitacao"></td>
            </tr>

            <tr>
                <td>Finalizada</td>
                <td><input type="checkbox" id="chkFinalizada"></td>
            </tr>
            <tr>
                <td>Finalizada - Não Obteve Resposta</td>
                <td><input type="checkbox" id="chkNaoObteveResposta"></td>
            </tr>

            <tr>
                <td>Com recurso</td>
                <td><input type="radio" name="pedidosRecurso" id="pedidosRecursoSim"></td>
            </tr>
            <tr>
                <td>Sem recurso</td>
                <td><input type="radio" name="pedidosRecurso" id="pedidosRecursoNao"></td>
            </tr>
            <tr>
                <td>Resposta do orgão: Atendido</td>
                <td><input type="checkbox" id="chkAtendido"></td>
            </tr>
            <tr>
                <td>Resposta do orgão: Não Atendido</td>
                <td><input type="checkbox" id="chkNaoAtendido"></td>
            </tr>
            <tr>
                <td>Resposta do orgão: Parcialmente Atendido</td>
                <td><input type="checkbox" id="chkParcAtendido"></td>
            </tr>
            <tr>
                <td>Federal</td>
                <td><input type="checkbox" id="chkFederal"></td>
            </tr>
            <tr>
                <td>Estadual</td>
                <td><input type="checkbox" id="chkEstadual"></td>
            </tr>
            <tr>
                <td>Municipal</td>
                <td><input type="checkbox" id="chkMunicipal"></td>
            </tr>
            <tr>
                <td>Poder: Legislativo e Tribunais de Contas</td>
                <td><input type="checkbox" id="chkLegislativo"></td>
            </tr>
            <tr>
                <td>Poder: Executivo</td>
                <td><input type="checkbox" id="chkExecutivo"></td>
            </tr>
            <tr>
                <td>Poder: Judiciário</td>
                <td><input type="checkbox" id="chkJudiciario"></td>
            </tr>
            <tr>
                <td>Poder: Ministério Público</td>
                <td><input type="checkbox" id="chkMinisterio"></td>
            </tr>
            <tr><td colspan="2"><input type="button" id="btnConsultar" value="Consultar"></td></tr>
        </table>
    </body>
</html>

```

> O código acima retorna o objeto abaixo em caso de sucesso:

```json
{
    "pagination": {
        "prelink": "",
        "current": 2,
        "previous": 1,
        "next": null,
        "first": 1,
        "last": null,
        "range": [
            1,
            2
        ],
        "fromResult": 3,
        "toResult": 4,
        "totalResult": 4,
        "pageCount": 2
    },
    "hits": {
        "took": 7,
        "timed_out": false,
        "_shards": {
            "total": 15,
            "successful": 15,
            "failed": 0
        },
        "hits": {
            "total": 0,
            "max_score": null,
            "hits": ["... objetos como resultado da busca são listados aqui ..."]
        }
    }
}
```
> O código acima retorna o objeto abaixo em caso de erro:

```json
{
    "error": {
        "source": "...",
        "message": "..."
    }
}
```

Este endpoint realiza uma consulta no elasticsearch nos índices de pedidos, interações e anexos simultaneamente, retornando além dos documentos como resultado um objeto com detalhes sobre a paginação e também os resultado da pesquisa em highlight, através da utilização de parametros para filtrar os dados. 

### HTTP Request

`POST /achadosepedidos.org.br/api/consultar/`

### Parâmetros

Parâmetro | Tipo | Observação
--------- | ------- | -----------
value | Texto | Obrigatório
currentPage | Número | Obrigatório, inteiro e maior que zero
dataDe | Data | Timestamp em formato "aaaa-mm-dd"
dataAte | Data | Timestamp em formato "aaaa-mm-dd"
chkEmTramitacao | Boleano | 
chkFinalizada | Boleano | 
chkNaoObteveResposta | Boleano | 
pedidosRecursoSim | Boleano | Valores possíveis 'on' ou null
pedidosRecursoNao | Boleano | Valores possíveis 'on' ou null
chkAtendido | Boleano | 
chkNaoAtendido | Boleano | 
chkParcAtendido | Boleano | 
chkFederal | Boleano | 
chkEstadual | Boleano | 
chkMunicipal | Boleano | 
chkLegislativo | Boleano | 
chkExecutivo | Boleano | 
chkJudiciario | Boleano | 
chkMinisterio | Boleano | 



### Parâmetros - Objeto pagination no resultado

Parâmetro | Tipo | Observação
--------- | ------- | -----------
prelink | Texto | Não utilizado
current | Número | Página atual
previous | Número | número da página anterior, retorna 'null' se a página atual é a primeira página 
next | Número | número da próxima página, retorna 'null' se a página atual for a última
first | Número | número da primeira página , retorna 'null' se a página atual é a primeira página 
last | Número | número da última página, retorna 'null' se a página atual for a última 
range | Número | Array contendo o número da página atual e mais duas páginas anteriores e duas próximas, para montar o objeto de paginação em tela 
fromResult | Número | Posição do objeto inicial da página. Ex: Consulta com 100 objetos e dez por página, na página dois o valor de fromResult é 11
toResult | Número | Posição do objeto final da página. Ex: Consulta com 100 objetos e dez por página, na página dois o valor de fromResult é 20
totalResult | Número | Quantidade de objetos retornados na pesquisa
pageCount | Número | Quantidade de páginas retornadas na pesquisa

