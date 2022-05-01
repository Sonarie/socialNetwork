const { Friend, User } = require("../models");

const friendController = {
  //post(create) a new friend to users friend list
  addFriend({ params, id }, res) {
    Friend.create(id)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.friendId },
          { $push: { user: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //delete friend from users friend list
  removeFriend({ params }, res) {
    Friend.findOneAndDelete({ _id: params.friendId })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          return res.status(404).json({ message: "No Friend with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.friendId },
          { $pull: { users: params.friendId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = friendController;
