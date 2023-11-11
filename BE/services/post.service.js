const errorMessages = require("../constants/error_msg");
const PostRepository = require("../repositories/post.repository");
class PostService {
  static async createPost(post) {
    try {
      const metadata = await PostRepository.createPost(post);
      console.log(metadata);
      return metadata;
    } catch (error) {
      throw error;
    }
  }
  static async getPostById(post) {
    try {
      return await PostRepository.getPostById(post);
    } catch (error) {
      throw error;
    }
  }
  static async getPostByUserId(userId) {
    try {
      return await PostRepository.getPostByUserId(userId);
    } catch (error) {
      throw error;
    }
  }
  static async updatePost(postId, objectParams) {
    try {
      return await PostRepository.updatePost(postId, objectParams);
    } catch (error) {
      throw error;
    }
  }
  static async deletePost(postId) {
    try {
      return await PostRepository.deletePost(postId);
    } catch (error) {
      throw error;
    }
  }
  static async getPostsFriends(lastPostId, pageSize) {
    try {
      return await PostRepository.getPostsFriends(lastPostId, pageSize);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PostService;