const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dla4zrrt7", // ✅ FIXED
  api_key: "475455194623757",
  api_secret: "Ayaj-yyPeyg8evYYkCGfg1zCwFw",
});

module.exports = cloudinary;