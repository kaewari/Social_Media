// multerMiddleware.js
const multer = require("multer");
const { storage } = require("../configs/cloudinary");
const errorMessages = require("../constants/error_msg");
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error(errorMessages.UNSUPPORTED_FILE), false);
  }
};

const parser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: process.env.FILE_SIZE, files: process.env.FILE_NUMBERS },
}).fields([{ name: "image" }, { name: "video" }]);

module.exports = { parser };
