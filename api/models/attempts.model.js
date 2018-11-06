// attempts-model.js - A mongoose model

const _ = require('lodash');
const randomRick = require('../rickRoll');
const DefaultSchema = require('../../../../types/default.schema');
const ObjectIdType = require('../../../../types/objectId.type');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const responseSchema = new Schema({
    questionId: ObjectIdType('questions', app),
    response: {
      type: Schema.Types.Mixed,
    },
    mark: {
      type: Number,
      max: 1,
      min: 0,
    },
  });

  const attempts = DefaultSchema(app);
  attempts.add({
    userId: ObjectIdType('users', app),
    quizId: ObjectIdType('quizzes', app),
    status: {
      type: String,
      required: true,
      default: 'inprogress',
      enum: ['inprogress', 'complete', 'exempt'],
    },
    responses: {
      type: [responseSchema],
      required: true,
    },
  });

  //implement default responses array, selects the questions
  attempts.pre('save', async function(){
    if(typeof this.responses !== 'undefined') return;
    const quiz = this.__ref_quizzes; //saved in the objectId validator 
    // get questions in order of priority
    let questions = await app.service('questions').find({
      paginate: false,
      query: {
        _id: {$in: quiz.questions},
      },
    });
    // randomise that order if configured that way
    if(quiz.randomise) questions = _.shuffle(questions);
    else questions = quiz.questions.map((q)=>_.find(questions, {_id: q}));
    // reduce the length of the questions to numQuestions (if specified and enough questions exist)
    if(quiz.numQuestions && questions.length > quiz.numQuestions) questions = questions.slice(quiz.numQuestions-1);
    // map the questions to the response format.
    this.responses = questions.map((q) => {return {questionId: q._id};});
  });

  attempts.virtual('questions').get(async function(){
    return (await app.service('questions').find({
      paginate: false,
      query: {
        _id: {$in: this.responses.map((r)=>r.questionId)},
      },
    })).map((q)=>_.set(q, 'answer', randomRick()));
  });

  return mongooseClient.model('attempts', attempts);
};
