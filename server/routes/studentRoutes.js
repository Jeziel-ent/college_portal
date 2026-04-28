const router = require("express").Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getMarks,
  getAttendance
} = require("../controllers/studentController");

// ✅ ROUTES
router.get("/marks", verifyToken, getMarks);
router.get("/attendance", verifyToken, getAttendance);

// ✅ CORRECT EXPORT
module.exports = router;