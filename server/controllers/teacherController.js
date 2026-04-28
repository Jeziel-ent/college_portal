const User = require("../models/User");
const Marks = require("../models/Marks");
const Attendance = require("../models/Attendance");
const Material = require("../models/Material");

// ✅ GET ASSIGNED STUDENTS
exports.getStudents = async (req, res) => {
  try {
    const teacherId = req.user.uid;

    const students = await User.find({
      role: "student",
      tutor: teacherId
    });

    res.json(students);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ MARKS
exports.uploadMarks = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const data = await Marks.create({
      studentId: req.body.studentId, // ✅ Mongo _id
      subject: req.body.subject,
      marks: req.body.marks,
      teacher: req.user.uid
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ ATTENDANCE
exports.uploadAttendance = async (req, res) => {
  try {
    const data = await Attendance.create({
      ...req.body,
      teacher: req.user.uid
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ MATERIAL (FIXED)
exports.uploadMaterial = async (req, res) => {
  try {
    console.log("📂 FILE RECEIVED:", req.file); // 🔥 DEBUG

    // ❌ if no file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Cloudinary safe extraction
    const fileUrl = req.file.path || req.file.secure_url;

    const data = await Material.create({
      fileUrl,
      teacher: req.user.uid
    });

    res.json(data);

  } catch (err) {
    console.error("UPLOAD ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET MATERIALS
exports.getMaterials = async (req, res) => {
  try {
    const data = await Material.find().sort({ createdAt: -1 });
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};