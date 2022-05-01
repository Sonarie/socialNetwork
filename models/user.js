const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true,
        },
        thoughts: {

        },
        friends: {

        },
    }
);


FriendSchema.virtual("friendsCount").get(function () {
    return this.friends.reduce(
      (total, friends) => total + user.friends.length + 1,
      0
    );
  });
  
  const friend = model("Friend", UserSchema);
  
  module.exports = Pizza;
  