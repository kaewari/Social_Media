const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const DOCUMENT_NAME = "like";
const schema = new mongoose.Schema({
  like_userId: { type: ObjectId, ref: "user", required: true },
  like_postId: { type: ObjectId, ref: "post", required: true },
  like_isActive: { type: Boolean, required: true, default: true },
  like_createdDate: { type: Date, default: Date.now() },
});
const like = mongoose.model(DOCUMENT_NAME, schema);
module.exports = like;
