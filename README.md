# Operacoes e Rotinas

## Criar indices no Elasticsearch

1. Conectar via SSH na VM do Google Cloud.
2. Entrar na pasta do Kibana:

```
cd /elastic/kibana-5.0.2-linux-x86_64/bin/
```

3. Subir o Kibana e aguardar ficar pronto:

```
sudo ./kibana
```

Acompanhar o log ate aparecer:

```
[info][status][ui settings] Status changed from yellow to green - Ready
```

4. Abrir no navegador:

- http://stage.achadosepedidos.org.br:5601/
- http://www.achadosepedidos.org.br:5601/

5. Baixar o arquivo de comandos e abrir:

- https://drive.google.com/file/d/0B1y4vtTHPfvETEtreUFrR1lsbWc/view

6. No Kibana, abrir **Dev Tools**.
7. Colar cada comando (ex.: comeca com `PUT /pedidos/ { ... }`).
8. Clicar no botao **Play** (icone verde).
9. Repetir com todos os comandos.

## Verificar dados no Elasticsearch

- http://www.achadosepedidos.org.br:9200/pedidos/_search

## Documentacao da API

- http://www.achadosepedidos.org.br:8080/doc_api/

## Status, stop e start da API

Entrar na pasta:

```
cd /elastic/lai
```

Ver status:

```
sudo forever list
```

Deve aparecer: `Forever processes running`.

Stopar:

```
sudo forever stop 0
```

Start node:

```
sudo node serverLai.js
```

Start com forever:

```
sudo forever start serverLai.js
```

## Start e stop do Elasticsearch (porta 9200)

```
sudo /etc/init.d/elasticsearch start
sudo /etc/init.d/elasticsearch stop
```

Testar:

- http://stage.achadosepedidos.org.br:9200/pedidos/_search

## Montar bucket (Google Cloud Storage)

```
cd /mnt
sudo gcsfuse -o allow_other --dir-mode 777 --file-mode 777 achados-e-pedidos-bucket achados-e-pedidos-bucket
```

Tornar o bucket automatico:

- https://cloud.google.com/compute/docs/disks/add-persistent-disk

Arquivo para teste:

- http://www.achadosepedidos.org.br/uploads/pedidos/RESPOSTASICProtocolon9898173895143969_1.pdf

Criar symbolic link para a pasta de upload dentro da aplicacao:

```
cd /var/www/stage.achadosepedidos.org.br/webroot/uploads
sudo ln -s /mnt/achados-e-pedidos-bucket/pedidos pedidos
```

## Indexacao de arquivos no Elasticsearch (sistema obsoleto)

Sistema obsoleto: sera utilizado a API Vision do Google (atualizado em 3-11-2020).

Repositorio:

- https://github.com/icij/extract

Diretorio:

```
cd /opt/extract
```

Arquivo de configuracao:

- conf/spew.properties

Ajuda:

```
./extract help spew
```

Executar o script:

```
sudo ./extract_spew
```

## Banco de dados

Entrar no banco:

```
mysql -u [user] -p [table name]
```

Credenciais:

- User: root
- Table Name: tblai

### Como funciona a integracao

No MySQL, le a tabela `pedidos_anexos` na coluna `CodigoStatusExportacaoES`:

- Seleciona registros com status esperando.
- Le a coluna `ArquivoFullPath` para pegar o caminho completo do arquivo.

Utiliza uma API para enviar o texto para o Elasticsearch:

- http://www.achadosepedidos.org.br:8080/doc_api/#atualizar-anexo-pelo-extractor

Gerar relatorio de indexacao de arquivos (somente via terminal dentro do servidor):

```
mysql tblai -u root -p -e "select * from pedidos_anexos" -B | sed "s/'/\'/;s/\t/\",\"/g;s/^/\"/;s/$/\"/;s/\n//g" > report_arquivos.csv
```

## Comandos do Elasticsearch

Pasta com os dados do Elasticsearch (precisa de sudo para listar):

- /var/lib/elasticsearch

Para executar comandos, abrir o Kibana e entrar em **Dev Tools**.

Buscar pedido por slug:

```
GET pedidos/_search
{
  "query": {
    "term": {
      "pedidos_slug_local": "teste-de-pedido-do-paulo-47921"
    }
  }
}
```

Deletar um pedido:

```
Delete /pedidos/data/(_id do pedido)
```

Id 47931

## Configurar systemd (subir servicos ao reiniciar)

Colocar `serverLai.js` no systemd:

```
cd /elastic/lai
```

OBS: O pm2 tem que rodar com o usuario `achadosepedidos`.

```
sudo su achadosepedidos
sudo npm install pm2 -g
pm2 start serverLai.js
pm2 startup systemd
pm2 save
pm2 unstartup systemd
```

Ref:

- https://stackoverflow.com/questions/21506505/how-to-use-pm2-startup-command-on-debian-platform

Configurar Elasticsearch no systemd:

```
sudo systemctl enable elasticsearch.service
sudo systemctl disable elasticsearch.service
```

## Reiniciar importador (Python)

Sempre que alterar algum arquivo python do importador (extensoes .py), rodar:

```
sudo touch /var/www/importador.achadosepedidos.org.br/achadosepedidos/achadosepedidos/wsgi.py
```

Obs.: alteracoes em arquivos .html nao precisam reiniciar o Python.

## Inicializacao: montar bucket no boot

Criar arquivo dentro de `/etc/init.d` e adicionar o header + comandos do mount:

```
#!/bin/sh
### BEGIN INIT INFO
# Provides: mountbucket.sh
# Required-Start: $local_fs $remote_fs $network $syslog
# Required-Stop: $local_fs $remote_fs $network $syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Start mountbucket.sh at boot time
# Description: Enable service provided by mountbucket.sh.
### END INIT INFO
```

Dar permissao:

```
sudo chmod 755
```

Registrar o arquivo:

```
update-rc.d [nomedoarquivo] defaults
```

## Outros comandos

Roda o Kibana via tunel SSH:

```
ssh -i paulocampos-studiocuboweb -L 5601:localhost:5601 paulo_campos@104.197.226.92
```

## Outras informacoes

- Chaves SSL utilizadas pelo Apache: /etc/ssl-keys

