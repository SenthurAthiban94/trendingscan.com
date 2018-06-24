import path from 'path';
import express from 'express';
const app=express();
const compression = require('compression'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      Task = require('./api/models/apiModel'),                      //created model loading here
      trends = require('node-google-search-trends'),
      publicpath=express.static(path.join(__dirname,'../')),
      indexPath = path.join(__dirname,'../index.html');



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://senthur:senthur8@ds263109.mlab.com:63109/blogger'); 

// compress responses
app.use(compression())
// app.use(compression({filter: shouldCompress}));


// other settings
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

// Base Path
app.use(publicpath);

app.get('*',(req,res)=>{
    res.sendFile(indexPath);
});

// Compression Advanced
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

export default app;