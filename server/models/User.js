const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,

  // 🔥 ADD THIS (VERY IMPORTANT)
  firebaseUID: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  },

  // common
  department: String,
  phone: String,
  address: String,

  // 👨‍🎓 student only
  degree: String,

  // 🔥 THIS MUST STORE TEACHER UID
  tutor: {
    type: String, // teacher's firebaseUID
    default: null
  },

  parentName: String,
  parentPhone: String,
  rollNumber: String,

  // 👨‍🏫 teacher only
  qualification: String
});

module.exports = mongoose.model("User", userSchema);