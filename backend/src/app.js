const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");

const app = express();

/* ✅ SAFE CORS CONFIG (Node 22 compatible) */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running");
});

const { protect } = require("./middleware/auth.middleware");
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  });
});

module.exports = app;
