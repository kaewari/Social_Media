const { post, image, video } = require("../models/post");
const user = require("../models/user");
const statusCodes = require("../constants/status_code");
const { default: mongoose } = require("mongoose");
const errorMessages = require("../constants/error_msg");
const AppError = require("../errors/AppError");
class PostRepository {
  static async getPostById(postId) {
    try {
      const p = await post.findById(postId);
      if (p) return p;
      return new AppError(errorMessages.POST_NOT_FOUND, statusCodes.NOT_FOUND);
    } catch (error) {
      return new AppError(error.message);
    }
  }
  static async createPost(p) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const promise = [];
      const newPost = await post.create(
        [
          {
            post_content: p.post_fields.post_content,
            post_userId: p.post_fields.post_userId,
          },
        ],
        { session: session }
      );
      if (p.post_images != null) {
        const addPostId = p.post_images.map((file) => ({
          image_url: file.path,
          image_format: file.originalname.substring(
            file.originalname.lastIndexOf(".")
          ),
          image_name: file.originalname,
          image_size: file.size,
          image_postId: newPost[0]._id,
        }));
        const newImages = image.insertMany(addPostId, { session: session });
        promise.push(newImages);
      }
      if (p.post_videos != null) {
        const addPostId = p.post_videos.map((file) => ({
          video_url: file.path,
          video_format: file.originalname.substring(
            file.originalname.lastIndexOf(".")
          ),
          video_name: file.originalname,
          video_size: file.size,
          video_thumbnail: file.video_thumbnail,
          video_postId: newPost[0]._id,
        }));
        const newVideos = video.insertMany(addPostId, { session: session });
        promise.push(newVideos);
      }
      const results = await Promise.all(promise)
        .then((results) => {
          return results;
        })
        .catch((error) => {
          return new AppError(error.message);
        });
      await session.commitTransaction();
      return results;
    } catch (error) {
      await session.abortTransaction();
      return new AppError();
    } finally {
      session.endSession();
    }
  }
  static async getPostByUserId(userId) {
    try {
      const posts = await post.find({ post_userId: userId });
      if (posts) return posts;
      throw new Error(statusCodes.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
  static async updatePost(postId, objectParams) {
    try {
      const updatedPost = await post.findByIdAndUpdate(postId, objectParams, {
        new: true,
      });
      if (!updatedPost) {
        throw new Error(statusCodes.NOT_FOUND);
      }
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
  static async deletePost(postId) {
    try {
      const deletedPost = post.findByIdAndDelete(postId);
      if (deletedPost) return true;
      throw new Error(statusCodes.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
  static async getPosts(lastPostId, pageSize) {
    try {
      if (lastPostId) {
        const posts = await post
          .find(
            { _id: { $gt: lastPostId } },
            { userId: 1, content: 1, image: 1, createdDate: 1 }
          )
          .limit(pageSize);
        return posts;
      } else {
        const posts = await post
          .find({}, { userId: 1, content: 1, image: 1, createdDate: 1 })
          .limit(pageSize);
        const hasMore = await findOne(
          {
            _id: { $gt: posts[pageSize - 1]._id },
          },
          { _id: 1 }
        );
        const response = { posts, hasMore };
        return response;
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PostRepository;
