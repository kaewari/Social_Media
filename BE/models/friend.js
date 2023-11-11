const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const DOCUMENT_NAME = "friend";

const schema = new mongoose.Schema({
  friend_requester: { type: ObjectId, ref: "user", required: true },
  friend_recipient: { type: ObjectId, ref: "user", required: true },
  friend_state: {
    type: String,
    enum: ["ACCEPTED", "CANCELLED", "PENDING", "REQUESTED"],
    required: true,
  },
  friend_createdDate: { type: Date, default: Date.now() },
});
const friend = mongoose.model(DOCUMENT_NAME, schema);
module.exports = friend;
