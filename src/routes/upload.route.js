const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload-middleware");

router.post("/", upload.single("image"), (req, res) => {
  try {
    // payload file kosong
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Gagal upload! File tidak ditemukan." });
    }

    // response sukses
    return res.status(200).json({
      message: "File berhasil diunggah!",
      fileInfo: {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
