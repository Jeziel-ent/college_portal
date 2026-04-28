const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 DEBUG (IMPORTANT)
console.log("authRoutes:", typeof authRoutes);
console.log("adminRoutes:", typeof adminRoutes);
console.log("announcementRoutes:", typeof announcementRoutes);
console.log("galleryRoutes:", typeof galleryRoutes);
console.log("teacherRoutes:", typeof teacherRoutes);
console.log("studentRoutes:", typeof studentRoutes);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("🚀 College Portal API running");
});

// DB
mongoose
  .connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(5000, () =>
      console.log("Server running on 5000 🚀")
    );
  })
  .catch((err) => console.error("MongoDB error ❌", err));