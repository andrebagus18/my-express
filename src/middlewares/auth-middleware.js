const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Autentikasi gagal! Token tidak ditemukan atau format salah.",
      });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    // 3. Verifikasi token dengan kunci rahasia yang SAMA dengan di controller
    const secretKey = "RAHASIA_DONG";

    const decoded = jwt.verify(token, secretKey);

    // simpan data ke objek request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Detail Error JWT:", error.message);

    return res.status(401).json({
      message: "Autentikasi gagal! Token tidak valid, rusak, atau kedaluwarsa.",
      error: error.message,
    });
  }
};

module.exports = { verifyToken };
