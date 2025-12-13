const express = require("express");
const router = express.Router();
const {
  addSweet,
  getAllSweets,
  searchSweets,
} = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);

module.exports = router;
