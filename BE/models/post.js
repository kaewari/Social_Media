const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const DOCUMENT_NAME = ["post", "image", "video"];
const postSchema = new mongoose.Schema({
  post_userId: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  post_content: { type: String, trim: true },
  post_totalLikes: { type: Number, required: true, default: 0 },
  post_createdDate: {
    type: Date,
    default: Date.now(),
  },
  post_updatedDate: {
    type: Date,
    default: Date.now(),
  },
});
const imageSchema = new mongoose.Schema({
  image_postId: { type: ObjectId, required: true, ref: "post" },
  image_url: { type: String, required: true },
  image_name: { type: String },
  image_size: { type: String },
  image_format: { type: String },
  image_altText: { type: String, trim: true, default: "This is image" },
  image_createdDate: { type: Date, default: Date.now() },
  image_updatedDate: { type: Date, default: Date.now() },
});
const videoSchema = new mongoose.Schema({
  video_postId: { type: ObjectId, required: true, ref: "post" },
  video_url: { type: String, required: true },
  video_name: { type: String },
  video_format: { type: String },
  video_size: { type: String },
  video_thumbnail: {
    type: String,
    default: process.env.THUMBNAIL_VIDEO,
  },
  video_createdDate: { type: Date, default: Date.now() },
  video_updatedDate: { type: Date, default: Date.now() },
});
const post = mongoose.model(DOCUMENT_NAME[0], postSchema);
const image = mongoose.model(DOCUMENT_NAME[1], imageSchema);
const video = mongoose.model(DOCUMENT_NAME[2], videoSchema);
module.exports = { post, image, video };
