const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running");
});

const { protect } = require("./middleware/auth.middleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user
  });
});

module.exports = app;
