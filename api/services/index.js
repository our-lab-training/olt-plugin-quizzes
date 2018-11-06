const quizzes = require('./quizzes/quizzes.service.js');
const questions = require('./questions/questions.service.js');
const attempts = require('./attempts/attempts.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(quizzes);
  app.configure(questions);
  app.configure(attempts);
};
