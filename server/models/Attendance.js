const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  status: String,
  teacher: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);