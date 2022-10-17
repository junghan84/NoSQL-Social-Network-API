const {Schema, model,Types} = require("mongoose");

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    thoughts: [],

    friends: [this],
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
  
// Create a virtual property `friendCount` that gets and sets the user's full name
UserSchema.virtual(`friendCount`).get(function () {
  return this.friends.length;
});


const User = model('User', UserSchema);

module.exports = User;