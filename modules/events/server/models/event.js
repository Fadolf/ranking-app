'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  EventSchema = new Schema({
    ratings: []
  });

EventSchema.pre('save', function(next){
  var totalRatings = 0;

  for(var i=0;i<this.ratings.length;i++)
    totalRatings+=this.ratings[i].rating;

  this.averageRating = totalRatings / this.ratings.length;
  next();
});

module.exports = mongoose.model('Event', EventSchema);