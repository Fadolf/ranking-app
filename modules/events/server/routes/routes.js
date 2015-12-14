'use strict';

var ctrl = require('../controllers/controller.js');

module.exports = function(app) {
  app.route('/events').get(ctrl.getAllEvents);
  app.route('/events/:id').get(ctrl.findSingle);
};