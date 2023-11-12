// multerMiddleware.js
const multer = require("multer");
const { storage } = require("../configs/cloudinary");
const errorMessages = require("../constants/error_msg");
const flag = false;
const fileFilter = (req, file, cb) =>
{
  console.log(req.files["media"].length);
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error(errorMessages.UNSUPPORTED_FILE), false);
  }
};

const parser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.FILE_SIZE),
    files: parseInt(process.env.FILE_NUMBERS),
  },
}).fields([{ name: "media" }]);

module.exports = { parser };
