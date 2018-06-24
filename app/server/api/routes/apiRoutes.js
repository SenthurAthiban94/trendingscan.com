'use strict';

var mcache = require('memory-cache');

module.exports = function(app) {
  // mem-cache settings
  var maxAge=3000; //in seconds

  // Load controller 
  var Sites= require('../controllers/apiController');

  // Server Cache
  var cache = (duration="") => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, (duration=="" ? maxAge : duration) * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }

  // todoList Routes
  app.route('/sites')
    .get(cache(),Sites.list_all_Sites)
    .post(Sites.create_a_Site)
    .delete(cache(),Sites.delete_all_Sites);


  app.route('/sites/:siteId')
    .get(cache(),Sites.read_a_Site)
    .put(cache(),Sites.update_a_Site)
    .delete(cache(),Sites.delete_a_Site);
  
  app.route('/sitesbycities/:countryName/:resultCount')
  .get(cache(),Sites.list_sites_by_city)

};
