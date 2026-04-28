const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "college-materials",

      resource_type: "auto", // ✅ critical

      // ✅ dynamic format detection
      format: file.mimetype.split("/")[1],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;