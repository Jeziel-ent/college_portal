const admin = require("../config/firebase");

const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    // 🔥 handle both formats
    const token = header.startsWith("Bearer ")
      ? header.split(" ")[1]
      : header;

    console.log("Received token:", token); // debug

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;
    next();

  } catch (err) {
    console.error("TOKEN ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;