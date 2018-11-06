// questions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.\

const DefaultSchema = require('../../../../types/default.schema');
const NameType = require('../../../../types/name.type');
const ObjectIdType = require('../../../../types/objectId.type');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const questions = DefaultSchema(app);
  
  questions.add({
    name: NameType(),
    contentId: ObjectIdType('content', app, false),
    answer: { type: [String], required: true },
    type: {
      type: String,
      enum: ['sa', 'la', 'mc', 'c', 'dd', 'fu'],
      required: true,
      validator: {
        message: 'This question looks like it requires some chices to be defined',
        validator: function (v) {
          return ['mc', 'c', 'dd'].indexOf(v) === -1 || (this.choices && this.choices.length() > 1);
        }
      }
    },
    choices: { type: [String], required: false },
    randomize: { type: Boolean, required: true, default: false },
    public: { type: Boolean, required: true, default: false },
  });

  return mongooseClient.model('questions', questions);
};