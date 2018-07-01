const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      Task = require('./server/api/models/apiModel'),                          //created model loading here
      Apiroutes = require('./server/api/routes/apiRoutes');                    //importing route
    //   trends = require('node-google-search-trends');
      
const ClientStatsPath = path.join(__dirname, '../build/stats.json');
const ServerRendererPath = path.join(__dirname, '../build/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);

const portno=3002;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BACKEND SETTINGS

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://senthur:senthur8@ds263109.mlab.com:63109/blogger'); 

// compress responses
app.use(compression())
// app.use(compression({filter: shouldCompress}));
// Compression Advanced
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

// other settings
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// APIS
Apiroutes(app);                                                         //register the API route

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname,'../build')));
// FrontEnd Settings
app.use(ServerRenderer(Stats));

app.listen(portno);
console.log(`\n\nListening at http://localhost:${portno}`);