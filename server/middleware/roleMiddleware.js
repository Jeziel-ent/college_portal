const User = require("../models/User");

// 🔥 ADMIN
exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      firebaseUID: req.user.uid
    });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 TEACHER
exports.checkTeacher = async (req, res, next) => {
  try {
    const user = await User.findOne({
      firebaseUID: req.user.uid
    });

    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Teacher access only" });
    }

    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};