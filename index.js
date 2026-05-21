const express = require("express");
const app = express();
const port = 3000;
const router = require("./src/routes/router");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/posts", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
