const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");

const app = express();

/* ✅ CORS FIX (IMPORTANT) */
app.use(
  cors({
    origin: "*", // allow frontend (Vite / Vercel / localhost)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Body parser */
app.use(express.json());

/* ✅ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

/* ✅ Health check */
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running");
});

/* ✅ Protected test route */
const { protect } = require("./middleware/auth.middleware");
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  });
});

module.exports = app;
