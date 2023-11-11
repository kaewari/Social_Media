const multer = require("multer");
const errorMessages = require("../constants/error_msg");
const statusCodes = require("../constants/status_code");
const successMessages = require("../constants/success_msg");
const PostService = require("../services/post.service");
const { parser } = require("../middlewares/multerMiddleware");
const { ObjectId } = require("bson");
exports.createPost = async (req, res) => {
  try {
    parser(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        switch (err.message) {
          case "LIMIT_FILE_COUNT": {
            return res
              .status(statusCodes.BAD_REQUEST)
              .send({ message: errorMessages.FILE_COUNT_LIMIT });
          }
          case "LIMIT_FILE_SIZE": {
            return res
              .status(statusCodes.BAD_REQUEST)
              .send({ message: errorMessages.FILE_TOO_LARGE });
          }
        }
      } else if (err) {
        if (err.message === errorMessages.UNSUPPORTED_FILE)
          return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: errorMessages.UNSUPPORTED_FILE });
        // Handle unknown error
        return res
          .status(statusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: errorMessages.UPLOAD_FILE_FAILED });
      } else {
        const post_images = req.files["image"]
          ? req.files["image"].map((file) => ({
              image_url: file.path,
              image_format: file.originalname.substring(
                file.originalname.lastIndexOf(".")
              ),
              image_name: file.originalname,
              image_size: file.size,
            }))
          : [];
        const post_videos = req.files["video"]
          ? req.files["video"].map((file) => ({
              video_url: file.path,
              video_format: file.originalname.substring(
                file.originalname.lastIndexOf(".")
              ),
              video_name: file.originalname,
              video_size: file.size,
            }))
          : [];
        const post_fields = req.body;
        if (
          post_fields.post_userId &&
          (post_fields.post_content || post_images[0] || post_videos[0])
        ) {
          const post = {
            post_fields: post_fields,
            post_images: post_images,
            post_videos: post_videos,
          };
          const newPost = await PostService.createPost(post);
          return res
            .status(statusCodes.CREATED)
            .json({ message: successMessages.POST_CREATED, metadata: newPost });
        } else {
          return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: errorMessages.INVALID_INPUT });
        }
      }
    });
  } catch (error) {
    if (error.message === statusCodes.NOT_FOUND)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: errorMessages.POST_NOT_FOUND });
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const pageSize = process.env.PAGE_SIZE_POST;
    const lastPostId = req.body.lastPostId;
    const response = await PostService.getPostsFriends(lastPostId, pageSize);
    return res
      .status(statusCodes.OK)
      .json({ metadata: response.posts, hasMore: response.hasMore });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: errorMessages.INVALID_INPUT });
    }
    await PostService.deletePost(postId).then(() => {
      return res
        .status(statusCodes.OK)
        .json({ message: successMessages.POST_DELETED });
    });
  } catch (error) {
    if (error.message === statusCodes.NOT_FOUND)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: errorMessages.POST_NOT_FOUND });
    return res.status(500).json({ message: error.message });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const objectParams = req.body;
    if (!postId) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: errorMessages.INVALID_INPUT });
    }
    const updatedPost = await PostService.updatePost(postId, objectParams);
    return res
      .status(statusCodes.OK)
      .json({ message: successMessages.POST_UPDATED, metadata: updatedPost });
  } catch (error) {
    if (error.message === statusCodes.NOT_FOUND)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: errorMessages.POST_NOT_FOUND });
    return res.status(500).json({ message: error.message });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: errorMessages.INVALID_INPUT });
    }
    const p = await PostService.getPostById(postId);
    return res
      .status(statusCodes.OK)
      .json({ message: successMessages.POST_GOT, metadata: p });
  } catch (error) {
    if (error.message === statusCodes.NOT_FOUND)
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: errorMessages.POST_NOT_FOUND });
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: errorMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
exports.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: errorMessages.INVALID_INPUT });
    }
    const posts = await PostService.getPostsByUserId(userId);
    return res
      .status(statusCodes.OK)
      .json({ message: successMessages.LIST_POST_GOT, metadata: posts });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: errorMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
