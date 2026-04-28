const router = require("express").Router();

const verifyToken = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware");

const {
  createAnnouncement,
  getAnnouncements
} = require("../controllers/announcementController");

// 🔥 ADD DEBUG HERE
console.log("verifyToken:", typeof verifyToken);
console.log("checkAdmin:", typeof checkAdmin);
console.log("createAnnouncement:", typeof createAnnouncement);

// ================= ROUTES =================
router.post("/",
  verifyToken,
  checkAdmin,
  createAnnouncement
);

router.get("/", getAnnouncements);

module.exports = router;