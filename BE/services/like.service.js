const like = require("../models/like");
import LikeRepository from "../repositories/like.repository";
class likeService {
  static async updateLike(userId, postId) {
    try {
      return LikeRepository.updateLike(userId, postId);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = likeService;
