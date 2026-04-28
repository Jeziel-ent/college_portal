const admin = require("../config/firebase");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  try {
    const { email, password, role, tutor, ...rest } = req.body;

    // 🔥 Create Firebase user
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
    });

    // 🔥 Save in MongoDB
    const user = await User.create({
      email,
      role,
      firebaseUID: firebaseUser.uid, // ✅ IMPORTANT
      tutor: role === "student" ? tutor : null, // ✅ LINK TEACHER
      ...rest,
    });

    // 📧 SEND EMAIL
    await sendEmail(
      email,
      "College Portal Login Credentials",
      `Welcome to College Portal 🎓

Your account has been created.

Email: ${email}
Password: ${password}

Login here:
http://localhost:5173

Please change your password after login.`
    );

    res.status(201).json({
      message: "User created + email sent ✅",
      user,
    });

  } catch (err) {
    console.error("CREATE USER ERROR:", err);

    res.status(500).json({
      message: "Failed to create user",
      error: err.message,
    });
  }
};

// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);

  } catch (err) {
    console.error("GET USERS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Delete from Firebase (safe)
    try {
      if (user.firebaseUID) {
        await admin.auth().deleteUser(user.firebaseUID);
      }
    } catch (firebaseErr) {
      console.warn("⚠ Firebase delete skipped:", firebaseErr.message);
    }

    // 🔥 Delete from MongoDB
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully ✅" });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 🔥 Update MongoDB
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated ✅",
      user,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);

    res.status(500).json({
      message: "Failed to update user",
      error: err.message,
    });
  }
};