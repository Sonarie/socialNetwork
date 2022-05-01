const { Schema, model, Types } = require("mongoose");
const validate = require("mongoose-validator");
const dateFormat = require("../public/utils/dateFormat");
const ReactionSchema = require("./reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
        validator: "isLength",
        arguments: [1, 280],
        message: "Text should be between 1 and 280 characters only",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.replies.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
