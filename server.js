/** VC Api-Server.js*/

// modules =================================================
const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        methodOverride  = require('method-override'),
        mongoose 	    = require('mongoose');

// configuration ===========================================
const   DB      = require('./config/db'),
        cors    = require('./config/cors');
    //policies = require('./config/policies');

// ==========================================================
// mongoose default promise
mongoose.Promise = global.Promise;
// connect to MongoDB Database
mongoose.connect(DB.CONNECTION,{ useMongoClient: true });
// ==========================================================

// Allow Cross Domain
app.use(cors);

// set server port as 3000
const port = 3000;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + './public'));

// serve index page 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

// Verify Auth Token =======================================
//app.use('/api', policies);

// routes ==================================================
require('./config/routes')(app); // configure our routes

// start app ===============================================
app.listen(port);

// Console.log server port
console.log('Api-Server Port : ' + port);

// =========================================================



