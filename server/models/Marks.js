const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  marks: Number,
  teacher: String
});

module.exports = mongoose.model("Marks", marksSchema);