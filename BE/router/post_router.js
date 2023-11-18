const express = require("express");
const router = express.Router();
const jwtAuth = require("../configs/jwtAuth");
const post_controller = require("../controllers/post_controller");

router.post("/", jwtAuth.verifyToken, post_controller.createPost);
// router.get("/", jwtAuth.verifyToken, post_controller.getPosts);
// router.get(
//   "/profile/posts",
//   jwtAuth.verifyToken,
//   post_controller.getPostsByUserId
// );
// router.post(
//   "/post/update/like",
//   jwtAuth.verifyToken,
//   post_controller.updateLike
// );
router.get(":postId", jwtAuth.verifyToken, post_controller.getPostById);
// router.get(
//   "/post/get/likes",
//   jwtAuth.verifyToken,
//   post_controller.getPostLikes
// );
// router.patch("/post/:postId", jwtAuth.verifyToken, post_controller.updatePost);
module.exports = router;
