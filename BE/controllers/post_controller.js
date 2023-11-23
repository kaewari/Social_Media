const multer = require("multer");
const { parser } = require("../middlewares/multerMiddleware");
const errorMessages = require("../constants/error_msg");
const statusCodes = require("../constants/status_code");
const successMessages = require("../constants/success_msg");
const PostService = require("../services/post.service");
const AppError = require("../errors/AppError");
exports.createPost = async (req, res) => {
  try {
    parser(req, res, async (err) => {
      try {
        if (err instanceof multer.MulterError) {
          switch (err.message) {
            case "LIMIT_FILE_COUNT":
              return res
                .status(statusCodes.BAD_REQUEST)
                .send({ message: errorMessages.FILE_COUNT_LIMIT });
            case "LIMIT_FILE_SIZE":
              return res.status(statusCodes.BAD_REQUEST).send({
                code: statusCodes.BAD_REQUEST,
                message: errorMessages.FILE_TOO_LARGE,
              });
            default:
              return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
                code: statusCodes.INTERNAL_SERVER_ERROR,
                message: err.message,
              });
          }
        }
        if (err instanceof Error) {
          if (err.message === errorMessages.UNSUPPORTED_FILE)
            return res.status(statusCodes.BAD_REQUEST).json({
              code: statusCodes.BAD_REQUEST,
              message: errorMessages.UNSUPPORTED_FILE,
            });
          return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
            code: statusCodes.INTERNAL_SERVER_ERROR,
            message: err.message,
          });
        }
        const post_images = [];
        const post_videos = [];
        req.files["media"].map((file) => {
          if (file.mimetype.startsWith("image")) post_images.push(file);
          else if (file.mimetype.startsWith("video")) post_videos.push(file);
        });
        const post_fields = req.body;
        post_fields.post_userId = req.user_id;
        if (post_fields.post_content || post_images[0] || post_videos[0]) {
          const post = { post_fields, post_images, post_videos };
          const newPost = await PostService.createPost(post);
          if (newPost instanceof AppError) {
            return res.status(newPost.statusCode).json({
              code: newPost.statusCode,
              message: newPost.message,
            });
          }
          return res.status(statusCodes.CREATED).json({
            code: statusCodes.CREATED,
            message: successMessages.POST_CREATED,
            metadata: newPost,
          });
        } else {
          return res.status(statusCodes.BAD_REQUEST).json({
            code: statusCodes.BAD_REQUEST,
            message: errorMessages.INVALID_INPUT,
          });
        }
      } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
          code: statusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      }
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      code: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const pageSize = process.env.PAGE_SIZE_POST;
    const lastPostId = req.body.lastPostId;
    const response = await PostService.getPosts(lastPostId, pageSize);
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
