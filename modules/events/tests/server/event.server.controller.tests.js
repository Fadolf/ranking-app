'use strict';

var controller = require('../../server/controllers/controller.js'),
  mongoose = require('mongoose'),
  EventModel = require('../../server/models/event.js');

describe('Event controller', function() {

  //Closure makes this variables accesible from any point in this
  //describe block.
  var req,
    res,
    statusCode,
    sentData;

  beforeEach(function(){
    //Overriding the Express function, we can store the content
    //of the response variables in our own variables.
    //This way, we can check the return values and write our
    //tests.      
    res = {
      send: function(code, data){
        statusCode = code;
        sentData = data;
      }
    };

    EventModel.find = function(callback){
      callback(null, [{ name: 'event1' }]);
    };

  });



  describe('When fetching all events', function() {   

    it('should return 200', function() {
      controller.getAllEvents(req,res);
      statusCode.should.equal(200);
    });

    it('should sent back the right data', function() {
      controller.getAllEvents(req,res);
      sentData[0].name.should.equal('event1');
    });

    it('should return 500 when find errors', function() {
      EventModel.find = function(callback){
        callback({ err: 1 }, null);
      };

      controller.getAllEvents(req,res);
      statusCode.should.equal(500);
    });

  });

  describe('When fetching single event', function() {
    beforeEach(function(){
      req = {
        params :  {
          id: 1
        }
      };
    });


    it('should return 404 when not found', function(){
      EventModel.findById = function(id, callback){
        callback(undefined, undefined);
      };

      controller.findSingle(req,res);

      statusCode.should.equal(404);
    });

    it('should return 500 when find errors', function() {
      EventModel.findById = function(id, callback){
        callback({ err:1 }, undefined);
      };

      controller.findSingle(req,res);
      statusCode.should.equal(500);
    });

    it('should return data when successful', function(){
      EventModel.findById = function(id, callback){
        callback(undefined, { id: id, name: 'Test event' });
      };

      controller.findSingle(req,res);
      sentData.id.should.equal(1);

    });

  });

});