const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage configuration - uploads directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: isVideo ? "chefora/videos" : "chefora/images",
      resource_type: isVideo ? "video" : "image",
      // Unique public_id, similar to your old filename logic
      public_id:
        Date.now() + "-" + Math.round(Math.random() * 1e9),
    };
  },
});

// File filter - same as before
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;