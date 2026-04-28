const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");


// ================= VERIFY TOKEN =================
router.post("/verify", verifyToken, async (req, res) => {
  try {
    console.log("Decoded user:", req.user);

    if (!req.user || !req.user.email) {
      return res.status(400).json({ message: "Invalid token data" });
    }

    const { email, uid } = req.user;

    // 🔥 find by firebaseUID (NOT email)
    let user = await User.findOne({ firebaseUID: uid });

    // if not exists → create
    if (!user) {
      user = await User.create({
        email,
        firebaseUID: uid, // ✅ IMPORTANT
        role: "student",  // default role
      });
    }

    res.json({
      email: user.email,
      role: user.role,
      firebaseUID: user.firebaseUID
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= GET LOGGED USER =================
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;