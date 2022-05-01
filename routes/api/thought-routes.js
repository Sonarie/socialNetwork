const router = require("express").Router();
const {
  addThought,
  removeThought,
  addThought,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/thoughts/<userId>
router.route("/:userId").post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route("/:userId/:thoughtId").put(addThought).delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<replyId>
router.route("/:userId/:thoughtId/:replyId").delete(removeThought);

module.exports = router;
