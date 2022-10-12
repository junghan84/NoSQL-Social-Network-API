const { Schema, model, Types } = require('mongoose');
const dataFormat = require("../utils/dataFormat");
const reactionSchema = require('./Reaction');

// Schema to create User model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: [({ length }) => length > 0 && length <= 280, 'Thoughts can only be between 1 and 280 characters long!']
    },

    createAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },

    username: {
        type: String,
        require: true
      },
      reactions: [reactionSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);
  
// Create a virtual property `reactionCount` that gets and sets the user's full name
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;