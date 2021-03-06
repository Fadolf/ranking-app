'use strict';

var _ = require('lodash');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  EventSchema = new Schema({
    ratings: []
  });


EventSchema.methods.getTotalRating = function(){
  var totalRatings = 0;

  _.each(this.ratings, function(item){
    totalRatings += item.rating;
  });

  return totalRatings;
};

EventSchema.methods.calculateAverageRating = function(){
  var totalRatings = this.getTotalRating();

  if(this.ratings.length > 0)
  {
    this.averageRating = totalRatings / this.ratings.length;
  }
  else
  {
    this.averageRating = 0;
  }
};


//Before we save, we call this method
EventSchema.pre('save', function(next){
  this.calculateAverageRating();  
  next();
});

module.exports = mongoose.model('Event', EventSchema);