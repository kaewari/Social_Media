const { post, image, video } = require("../models/post");
const statusCodes = require("../constants/status_code");
const { ObjectId } = require("bson");
const { default: mongoose } = require("mongoose");
class PostRepository {
  static async getPostById(postId) {
    try {
      const p = await post.findById(postId);
      if (p) return p;
      throw new Error(statusCodes.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }
  static async createPost(p) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      console.log(p);
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
      console.log("POST", newPost);
      if (p.post_images[0]) {
        const addPostId = p.post_images.map((image) => {
          return { image_postId: newPost[0]._id, ...image };
        });
        console.log("image", addPostId);
        const newImages = image.insertMany(addPostId, { session: session });
        promise.push(newImages);
      }
      if (p.post_videos[0]) {
        const addPostId = p.post_videos.map((video) => {
          return { video_postId: newPost[0]._id, ...video };
        });
        console.log("video", addPostId);
        const newVideos = video.insertMany(addPostId, { session: session });
        promise.push(newVideos);
      }
      const results = await Promise.all(promise)
        .then((results) => {
          return results;
        })
        .catch((error) => {
          throw new Error(error.message);
        });
      await session.commitTransaction();
      session.endSession();
      return results;
    } catch (error) {
      throw error;
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
  static async getPostsFriends(lastPostId, pageSize) {
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
