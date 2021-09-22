var config          = require('./config.js');
var loggerService   = require('./services/loggerService.js');
var anexoService    = require('./services/anexoService.js');
var anexo           = require('./models/anexo.js');
var fs              = require("fs");
var elasticsearch   = require('elasticsearch');
var JSONStream      = require('JSONStream');
var readline        = require('readline');

async function run() {
    var client = new elasticsearch.Client({
        host: 'localhost:9266',
        requestTimeout: 60000
    });

    // Abre o Arquivo do Backup
    const fileStream = fs.createReadStream("D:\\Backup_Anexos_Indices.json");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var foundIndexBegin = false;
    var foundIndexData = false;
    var iDoc = 0;

    var docindex = null;
    var docdata = null;

    for await (const line of rl) {
        var d = JSON.parse(line);

        if(!foundIndexData && d.hasOwnProperty("index")) {
            docindex = d;
            foundIndexBegin = true;
        } else if(foundIndexBegin && !d.hasOwnProperty("index") && !d.hasOwnProperty("settings")) {
            foundIndexData = true;
            docdata = d;
        } 
        
        if(foundIndexBegin && foundIndexData) {
            iDoc++;
            console.log("Indexando: " + iDoc + " = " + docdata.anexos_codigo);
            foundIndexBegin = false;
            foundIndexData = false;

            await client.index({
                index: 'anexos',
                type: 'data',
                id: docindex._id,
                body: docdata
            });
        }
    }
}

run().catch(console.log);