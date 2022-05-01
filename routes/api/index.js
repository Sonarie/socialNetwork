const router = require("express").Router();
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");
const friendRoutes = require("./friend-routes");
const reactionRoutes = require("./reaction-routes");

router.use("/thoughts", thoughtRoutes);

router.use("/users", userRoutes);

router.use("./friends", friendRoutes);

router.use("./reactions", reactionRoutes);

module.exports = router;
