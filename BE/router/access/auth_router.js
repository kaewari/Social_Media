const express = require("express");
const router = express.Router();
const auth_controller = require("../../controllers/auth_controller");
const jwtAuth = require("../../configs/jwtAuth");

router.post("/register", auth_controller.register);
router.post("/sign_in", auth_controller.sign_in);
router.get(
  "/current_user",
  jwtAuth.verifyToken,
  auth_controller.get_current_user
);
router.post("/token", auth_controller.refresh_token);
router.delete("/logout", auth_controller.logout);
module.exports = router;
