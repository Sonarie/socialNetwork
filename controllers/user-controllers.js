const { User } = require ("../models")

const UserController = {
    //get all users
    getAllUser(req,res) {
        User.find({})
        .populate({
          path: "users",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: "users",
            select: "-__v",
          })
          .select("-__v")
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //post(create) a new user
    userPizza({ body }, res) {
        User.create(body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(400).json(err));
      },

    //put to Update a user by its id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },

    //delete to remove user by its id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.json(err));
      },

    //delete thoughts by user (bonus)
};

module.exports = userController;