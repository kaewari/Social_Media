const errorMessages = require("../constants/error_msg");
const statusCodes = require("../constants/status_code");
const AppError = require("../errors/AppError");
const PostRepository = require("../repositories/post.repository");
class PostService {
  static async createPost(post) {
    try {
      const metadata = await PostRepository.createPost(post);
      return metadata;
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async getPostById(post) {
    try {
      const metadata = await PostRepository.getPostById(post);
      return metadata;
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async getPostByUserId(userId) {
    try {
      return await PostRepository.getPostByUserId(userId);
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async updatePost(postId, objectParams) {
    try {
      return await PostRepository.updatePost(postId, objectParams);
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async deletePost(postId) {
    try {
      return await PostRepository.deletePost(postId);
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async getPosts(lastPostId, pageSize) {
    try {
      return await PostRepository.getPosts(lastPostId, pageSize);
    } catch (error) {
      return new AppError(error.message);
    }
  }
}
module.exports = PostService;
