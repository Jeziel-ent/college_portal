const User = require("../models/User");
const Marks = require("../models/Marks");
const Attendance = require("../models/Attendance");

// ✅ GET MARKS
exports.getMarks = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);

    // 🔥 find Mongo user using email
    const user = await User.findOne({ email: req.user.email });

    console.log("MONGO USER:", user);

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ use Mongo _id
    const data = await Marks.find({
      studentId: user._id
    });

    console.log("MARKS:", data);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ATTENDANCE
exports.getAttendance = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    console.log("ATT USER:", user);

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    const data = await Attendance.find({
      studentId: user._id
    });

    console.log("ATT DATA:", data);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};