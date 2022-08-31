// =======================
// get the packages we need
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var config = require('./config'); // get our config file
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({limit: '200mb',  extended: true }));
app.use(bodyParser.json({limit: '200mb'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

app.disable('x-powered-by');
app.set('etag', false);

//app.use(methodOverride());                  // simulate DELETE and PUT


// Middleware para coletar o ip do usuário 
var requestIp = require('request-ip');
app.use(requestIp.mw());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// LOADING CONTROLLERS (WITH ROUTES)
// =============================================================================
var routes = require("./routes");
routes.init(app);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);



var cron = require('cron');

var job1 = new cron.CronJob({
  cronTime: '* * 4 * * *',
  onTick: function() {
    //   console.log('asdad')
    require('./carga_dashboard/job.js')
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

