const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "76ee5ca69cb025",
    pass: "70b0aa223b027c",
  },
});

// create
const create = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    if (!fullname || !username || !password || !email) {
      return res.status(400).json({
        message:
          "Semua data (Fullname, Username, Password, email) wajib diisi!",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const uniqueToken = uuidv4();

    const newUser = await userModel.create({
      fullname,
      username,
      password: hashedPassword,
      email,
      verification_token: uniqueToken,
      is_verified: false,
    });

    //  Kirim Email Verifikasi via Nodemailer
    const verificationLink = `http://localhost:3000/api/users/verifikasi-email?token=${uniqueToken}`;
    const mailOptions = {
      from: '"EduCourse App" <no-reply@educourse.com>',
      to: email,
      subject: "Verifikasi Akun EduCourse Anda",
      html: `<h3>Halo ${fullname},</h3>
             <p>Terima kasih telah mendaftar. Silakan klik link di bawah ini untuk memverifikasi akun Anda:</p>
             <a href="${verificationLink}" target="_blank">Klik Disini Untuk Verifikasi</a>
             <br><br>
             <p>Token Anda: <b>${uniqueToken}</b></p>`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Register Sukses! Silakan cek email Anda untuk verifikasi.",
      data: {
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const message = error.errors[0].message;
      return res.status(400).json({
        message: `Gagal Registrasi: ${message}. Silakan gunakan data lain.`,
      });
    }

    return res.status(500).json({ message: error.message });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi!" });
    }

    const user = await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Username tidak ditemukan!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah!" });
    }

    const secretKey = "RAHASIA_DONG";

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }, // Token kedaluwarsa 1 jam
    );

    return res.status(200).json({
      message: "Login Berhasil!",
      token: token,
      data: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token tidak ditemukan!" });
    }

    const user = await userModel.findOne({
      where: { verification_token: token },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Verification Token" });
    }

    await userModel.update(
      { is_verified: true, verification_token: null },
      { where: { id: user.id } },
    );

    return res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { create, login, verifyEmail };
