const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { checkTeacher } = require("../middleware/roleMiddleware");

const {
  getStudents,
  uploadMarks,
  uploadAttendance,
  uploadMaterial
} = require("../controllers/teacherController");
const { getMaterials } = require("../controllers/teacherController");

const upload = require("../middleware/upload");

// 🔥 ROUTES
router.get("/students", verifyToken, checkTeacher, getStudents);

router.post("/marks", verifyToken, checkTeacher, uploadMarks);

router.post("/attendance", verifyToken, checkTeacher, uploadAttendance);

router.post(
  "/material",
  verifyToken,
  checkTeacher,
  upload.single("file"),
  uploadMaterial
);
router.get("/material", getMaterials);

module.exports = router;