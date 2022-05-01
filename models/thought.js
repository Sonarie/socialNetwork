const { Schema, model, Types } = require("mongoose");
const validate = require("mongoose-validator");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema({
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
  reactions: [reactionSchema],
});

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    validate: {
      validator: "isLength",
      arguments: [280],
      message: "Text should be a minimum of 280 characters only",
    },
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

ReactionSchema.virtual("reactionsCount").get(function () {
    return this.replies.length;
  });
  
  const Reaction = model("Reaction", ReactionSchema);
  
  module.exports = Reaction;
