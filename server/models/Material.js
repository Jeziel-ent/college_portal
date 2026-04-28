const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  fileUrl: String,
  teacher: String
});

module.exports = mongoose.model("Material", materialSchema);