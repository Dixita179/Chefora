const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.mimetype.startsWith("image")) {
      cb(null, "uploads/images");
    }

    else if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");
    }

    else {
      cb(new Error("Only images and videos are allowed"));
    }
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1E9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

// File filter
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
  fileFilter
});

module.exports = upload;