'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TopSites = new Schema({
  countryName: {
    type: String,
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  traffic:{
      type: Number,
      default:0
  },
  contentLink:{
      type: String
  },
  contentImageUrl:{
      type:String
  },
  summary:{
    title: String,
    content: String,
    link: String,
    source: String
  },
  dateTracked:{
      type:Date
  },
  created_date: {
    type: Date,
    default: Date.now
  }
//   status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
});

module.exports = mongoose.model('SitesList', TopSites);