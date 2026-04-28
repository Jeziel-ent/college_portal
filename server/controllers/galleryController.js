const Gallery = require("../models/Gallery");

// CREATE IMAGE
exports.addImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const image = await Gallery.create({
      imageUrl,
      title: "Event",
    });

    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getImages = async (req, res) => {
  const images = await Gallery.find();
  res.json(images);
};

// DELETE
exports.deleteImage = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};