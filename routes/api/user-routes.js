const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUser).post(addUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
