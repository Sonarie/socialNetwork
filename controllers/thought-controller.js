const { Thought } = require("../models");

const thoughtController = {
    //get all thoughts
    getAllThought(req,res) {
        Thought.find({})
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    //get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //post(create) a new thought
    userThought({ body }, res) {
        Thought.create(body)
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(400).json(err));
      },

    //update thought by id
    updatethought({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thoughts found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
      },

    //delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.json(err));
      },
}

module.exports = thoughtController;