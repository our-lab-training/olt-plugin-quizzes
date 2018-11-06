// Initializes the `quizzes` service on path `/quizzes`
const createService = require('feathers-mongoose');
const createModel = require('../../models/quizzes.model');
const hooks = require('./quizzes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/quizzes', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('quizzes');

  service.hooks(hooks);
};
