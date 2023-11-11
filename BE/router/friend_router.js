const express = require("express");
const router = express.Router();
const friend_controller = require("../controllers/friend_controller");
const jwtAuth = require("../configs/jwtAuth");
router.get("/", jwtAuth.verifyToken, friend_controller.get_friends);
router.post("/request", jwtAuth.verifyToken, friend_controller.request_friend);
router.post("/add", jwtAuth.verifyToken, friend_controller.accept_friend);
router.delete("/cancel", jwtAuth.verifyToken, friend_controller.reject_friend);
router.delete("/delete", jwtAuth.verifyToken, friend_controller.delete_friend);
router.post("/multi", jwtAuth.verifyToken, friend_controller.add_multi_friend);
module.exports = router;