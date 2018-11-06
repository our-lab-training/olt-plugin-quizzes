const services = require('./services');

module.exports = (app) => {
  app.configure(services);
};