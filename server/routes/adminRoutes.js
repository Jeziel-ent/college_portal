const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware"); // ✅ FIXED

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/adminController");

router.post("/create-user", verifyToken, checkAdmin, createUser);
router.get("/users", verifyToken, checkAdmin, getAllUsers);
router.put("/users/:id", verifyToken, checkAdmin, updateUser);
router.delete("/users/:id", verifyToken, checkAdmin, deleteUser);

module.exports = router;