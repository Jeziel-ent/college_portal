const Announcement = require("../models/Announcement");

// CREATE
exports.createAnnouncement = async (req, res) => {
  const data = await Announcement.create(req.body);
  res.json(data);
};

// READ
exports.getAnnouncements = async (req, res) => {
  const data = await Announcement.find().sort({ createdAt: -1 });
  res.json(data);
};

// DELETE
exports.deleteAnnouncement = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};