const router = require("express").Router();
const {
  addReaction,
  removeReaction,
} = require("../../controllers/reaction-controller");

router.route("/:reactionId").post(addReaction);

router.route("/:thoughtId/:reactionId").put(addReaction).delete(removeReaction);

module.exports = router;