// quizzes-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const DefaultSchema = require('../../../../types/default.schema');
const NameType = require('../../../../types/name.type');
const ObjectIdType = require('../../../../types/objectId.type');
// const PermType = require('../../../../types/perm.type');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const quizzes = DefaultSchema(app);
  
  quizzes.add({
    name: NameType(),
    groupId: ObjectIdType('groups', app),
    timeLimit: { type: Number, required: false },
    passmark: { type: Number, required: true },
    repeats: { type: Number, required: true, default: 0, min: 0 },
    randomize: { type: Boolean, required: true, default: false },
    numQuestions: { type: Number, required: true, default: 0 },
    questions: { type: [ ObjectIdType('questions', app) ], default: []},
    public: {type: Boolean, required: true, default: false},
    permsGranted: {
      type: [ String ],// PermType()],
      default: [],
      required: true,
    },
    publish: {
      type: Date,
      default: Date.now,
      required: true,
      validate:{
        message: 'You cannot retrospectively publish a quiz',
        validator: function () {
          return (new Date(this.publish)) <= (new Date());
        }
      }
    },
    dueOn: {
      type: Date,
      required: false,
      validate:{
        message: 'Close date must be later than the due/publish date',
        validator: function (v) {
          return (new Date(this.publish)) <= (new Date(v));
        }
      }
    },
    closeOn: {
      type: Date,
      required: false,
      validate: {
        message: 'Close date must be later than the due/publish date',
        validator: function (v) {
          return (new Date(this.publish)) <= (new Date(v)) && (new Date(this.dueOn || 0)) <= (new Date(v));
        }
      }
    }
  });

  return mongooseClient.model('quizzes', quizzes);
};