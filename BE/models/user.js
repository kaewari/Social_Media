const mongoose = require("mongoose");
const properties = process.env;
const { ObjectId } = require("mongodb");
const DOCUMENT_NAME = "user";

const schema = new mongoose.Schema({
  user_firstName: {
    type: String,
    trim: true,
    required: [true, "Please provide your first name"],
  },
  user_lastName: {
    type: String,
    trim: true,
    required: [true, "Please provide your last name"],
  },
  user_username: {
    type: String,
    trim: true,
    min: [5, "Username must be at least 5 characters"],
    max: [20, "Username must be less or equal to 10 characters"],
    unique: true,
    required: [true, "Please provide your username"],
  },
  user_email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^(?=.+[a-z0-9])(?=.+[@])(?=.+[.])([@.a-z0-9])*$/,
      "This is not a valid email address",
    ],
    required: [true, "Please provide your email address"],
  },
  user_phone: {
    type: String,
    trim: true,
    unique: true,
    match: [/^[0-9]{10}$/, "Phone number must have 10 digits"],
    required: [true, "Please provide your phone number"],
  },
  user_gender: {
    type: String,
    enum: { values: ["male", "female"], message: "{VALUE} is not supported" },
  },
  user_birthday: { type: Date },
  user_address: { type: String, trim: true },
  user_password: {
    type: String,
    match: [
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,})$/,
      "Passwords must contain at least 8 characters, " +
        "at least 1 number, at least 1 lowercase character, " +
        "at least 1 uppercase character and at least 1 special character",
    ],
    required: [true, "Please provide your password"],
  },
  user_avatar: {
    type: String,
    default: properties.AVATAR,
  },
  user_isActive: { type: Boolean, default: false },
  user_createdDate: {
    type: Date,
    default: Date.now(),
  },
  user_updatedDate: {
    type: Date,
    default: Date.now(),
  },
  user_friends: { type: Array(ObjectId) },
});
const user = mongoose.model(DOCUMENT_NAME, schema);
module.exports = user;
