const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addImage,
  getImages,
  deleteImage,
} = require("../controllers/galleryController");

// 🔥 IMPORTANT CHANGE
router.post("/", upload.single("image"), addImage);

router.get("/", getImages);
router.delete("/:id", deleteImage);

module.exports = router;