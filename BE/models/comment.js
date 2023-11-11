const mongoose = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "comment";
// Declare the Schema of the Mongo model
const schema = new mongoose.Schema({
  comment_userId: {
    type: String,
    required: true,
  },
  comment_parentId: {
    type: String,
    required: true,
  },
  comment_content: {
    trim: true,
    type: String,
    required: true,
  },
  comment_createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  comment_updatedDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, schema);
