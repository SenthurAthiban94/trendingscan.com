'use strict';

var mongoose = require('mongoose'),
    Sites = mongoose.model('SitesList');

exports.list_sites_by_city=function(req,res){
  var country=req.params.countryName;
  var count=req.params.resultCount ? parseInt(req.params.resultCount) : 10;
      if(country && count){
        // Retriving from our database
        Sites.find({countryName: country})
        .sort({'date': -1})
        .limit(count)
        .sort({$natural:-1})
        .exec(function(err, sites) {
             // `posts` will be of length 20
             if(err) return console.log(err);
             res.json(sites);
        });
      }
      else{
        res.json({status:0,msg:"Country is required for getting the top searches!!"});
      }


  // trends(country, count, function(err, data) {
  //     if (err) return console.err(err);
  //     let topSites=[];
  //     topSites=Object.keys(data).map((e)=>{
  //     var singlesite={};
  //         singlesite.title=(data[e]['title'].length) ? data[e]['title'][0] : "";
  //         singlesite.description=data[e]['description'].length ? data[e]['description'][0] : "";
  //         singlesite.traffic=data[e]['ht:approx_traffic'].length ? data[e]['ht:approx_traffic'][0].replace(/,/g,'').replace('+','') : "";
  //         singlesite.contentLink=data[e]['ht:news_item'].length ? ((data[e]['ht:news_item'][0]['ht:news_item_url'].length) ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "" ) : "";
  //         singlesite.contentImageUrl=data[e]['ht:picture'].length ? data[e]['ht:picture'][0] : "";
  //         singlesite.dateTracked=data[e]['pubDate'].length ? data[e]['pubDate'][0] : "";
  //         if(data[e]['ht:news_item'].length){
  //           singlesite.summary={
  //             title   : data[e]['ht:news_item'][0]['ht:news_item_title'] ? data[e]['ht:news_item'][0]['ht:news_item_title'][0] : "",
  //             content : data[e]['ht:news_item'][0]['ht:news_item_snippet'] ? data[e]['ht:news_item'][0]['ht:news_item_snippet'][0] : "",
  //             link    : data[e]['ht:news_item'][0]['ht:news_item_url'] ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "",
  //             source  : data[e]['ht:news_item'][0]['ht:news_item_source'] ? data[e]['ht:news_item'][0]['ht:news_item_source'][0] : ""
  //           }
  //         }
  //         topSites.push(singlesite);
  //         if(Object.keys(data).length == topSites.length){
  //           res.send(JSON.stringify(topSites));      
  //         }
  //     });
  //   });
}

exports.list_all_Sites = function(req, res) {
    Sites.find({}, function(err, site) {
    if (err)
      res.send(err);
    res.json(site);
  });
};


exports.create_a_Site = function(req, res) {
  var update  = { expire: new Date() },
      options = { upsert: true },
      payload = req.body;
      payload.map((e,k) => {
        var findelement={countryName: e.countryName}
        if(e.contentLink && e.contentLink.length > 0){
          findelement.contentLink=e.contentLink;
        }else{
          if(e.contentImageUrl && e.contentImageUrl.length > 0){
            findelement.contentImageUrl=e.contentImageUrl;
          }else{
            if(e.summary && Object.keys(e.summary).length){
              findelement.summary=e.summary;
            }else{
              if(e.description && e.description.length > 0){
                findelement.description=e.description;
              }else{
                findelement.title=e.title;
              }
            }
          }
        }
        // Find the document
        Sites.findOneAndUpdate(findelement, options, function(error, result) {
          if (!error) {
              // If the document doesn't exist
              if (!result) {
                  // Create it
                  // console.log(findelement);
                  // console.log(e);
                  result = new Sites(e);
              }
              result.traffic=e.traffic;
              // Save the document
              result.save(function(error) {
                  if (!error) {
                      // Do something with the document
                      console.log("Inserted Successfully");                      
                    } else {
                      console.log("Error on inserting "+error)
                      throw error;
                    }
                    if(!payload[k+1]){
                      res.json({status:1,msg:"Documents Added without duplicates!!"});
                    }
              });
          }
        });
    });

};


function SaveAll(payload){
  var response=Object.keys(payload).filter((e,i)=>{
      var new_site = new Sites(payload[e]);
      new_site.save(function(err, site) {
          if (err){
            res.send(err);
          }
          else{
            // response.push(site);
            return site;
          }
      });
  });
  return response;
}

exports.read_a_Site = function(req, res) {
    Sites.findById(req.params.siteId, function(err, site) {
    if (err){
      res.send(err);
    }else{
      res.json(site);
    }
  });
};


exports.update_a_Site = function(req, res) {
    Sites.findOneAndUpdate({_id: req.params.siteId}, req.body, {new: true}, function(err, site) {
    if (err){
      res.send(err);
    }else{
      res.json(site);
    }
  });
};


exports.delete_a_Site = function(req, res) {
  Sites.remove({
    _id: req.params.siteId
  }, function(err, site) {
    if (err)
      res.send(err);
    res.json({ message: 'Site deleted successfully!!' });
  });
};

exports.delete_all_Sites = function(req, res) {
    Sites.remove({},function(err,site){
        if(err)
            res.send(err);
        res.json({ message: 'All Sites Deleted Successfully!!'})
    });
}