// Initializes the `questions` service on path `/questions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/questions.model');
const hooks = require('./questions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/questions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('questions');

  service.hooks(hooks);
};
