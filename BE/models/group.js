const { ObjectId } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = ["group", "member"];
// Declare the Schema of the Mongo model
const groupSchema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    group_totalMember: {
      type: Number,
      required: true,
    },
    group_totalPost: {
      type: Number,
      required: true,
    },
    group_type: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
      required: true,
    },
    group_description: {
      type: String,
      required: true,
      trim: true,
    },
    group_rules: {
      type: String,
      required: false,
    },
    group_createdDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    group_updatedDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);
const memberSchema = new mongoose.Schema(
  {
    member_groupId: { type: ObjectId, required: true, ref: "group" },
    member_userId: { type: ObjectId, required: true, ref: "user" },
    member_role: {
      type: String,
      required: true,
      enum: ["Admin", "Member", "Moderator"],
    },
    member_joinedDate: { type: Date, required: true, default: Date.now() },
  },
  { timestamps: true }
);
//Export the model
const group = mongoose.model(DOCUMENT_NAME[0], groupSchema);
const member = mongoose.model(DOCUMENT_NAME[1], memberSchema);
module.exports = { group, member };
