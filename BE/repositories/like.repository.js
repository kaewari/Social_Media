const like = require("../models/like");
import errorMessages from "../constants/error_msg";
import statusCodes from "../constants/status_code";
import successMessages from "../constants/success_msg";
import post from "../models/post";
import PostRepository from "./post.repository";
class LikeRepository {
  static async updateLike(postId, userId) {
    try {
      const p = await post.findOne(postId);
      if (p) {
        await like
          .findOneAndDelete({
            like_userId: userId,
            like_postId: postId,
          })
          .then(async (res) => {
            if (res) {
              await p
                .updateOne({
                  $inc: { post_content: -1 },
                })
                .then(() => {
                  return statusCodes.OK;
                });
            } else {
              await like
                .create({ like_userId: userId, like_postId: postId })
                .then(() => {
                  p.updateOne({
                    $inc: { post_content: 1 },
                  });
                  return statusCodes.CREATED;
                });
            }
          });
      }
      throw new Error(statusCodes.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = LikeRepository;
