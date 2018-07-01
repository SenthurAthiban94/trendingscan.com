const 	express = require('express'),
		path = require('path'),
		app = express(),
		webpack = require('webpack'),
		webpackDevMiddleware = require('webpack-dev-middleware'),
		webpackHotMiddleware = require('webpack-hot-middleware'),
		webpackHotServerMiddleware = require('webpack-hot-server-middleware'),
		config = require('./../webpack.development.config.js'),
		compiler = webpack(config);

const 	portno=3002;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKEND Settings
const compression = require('compression'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      Task = require('./server/api/models/apiModel'),                          //created model loading here
      Apiroutes = require('./server/api/routes/apiRoutes');                    //importing route
      trends = require('node-google-search-trends');
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
// Front End Hot Reload Settings

app.use(webpackDevMiddleware(compiler, {
	publicPath: "/build/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(portno);
console.log(`\n\nListening at http://localhost:${portno}`);