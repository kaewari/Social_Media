const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpeg", "jpg", "png", "mp4", "webm", "json", "csv"],
  params: async (req, file) => {
    let folder, resource_type;

    if (file.mimetype.startsWith("image")) {
      folder = "social_media/image_folder";
      resource_type = "image";
    } else if (file.mimetype.startsWith("video")) {
      folder = "social_media/video_folder";
      resource_type = "video";
    }

    return {
      folder: folder,
      resource_type: resource_type,
      public_id: Date.now(), // Optional: customize public ID
    };
  },
});

module.exports = { storage };
