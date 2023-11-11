const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const jwtAuth = require("../configs/jwtAuth");
router.get("/", jwtAuth.verifyToken, user_controller.get_users);
router.get("/id/:id", jwtAuth.verifyToken, user_controller.get_user_by_id);
router.get(
  "/username/:username",
  jwtAuth.verifyToken,
  user_controller.get_user_by_username
);
module.exports = router;
