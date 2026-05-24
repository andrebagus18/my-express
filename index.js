const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./src/routes/user.route");
const courseRouter = require("./src/routes/course.route");
const uploadRouter = require("./src/routes/upload.route");

app.use(express.json());
// const { sequelize } = require("./src/models/index");
// sequelize.sync({ alter: true }).then(() => {
//   console.log("✅ Semua tabel (Courses & Users) berhasil disinkronisasi!");
// });

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/upload", uploadRouter);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
