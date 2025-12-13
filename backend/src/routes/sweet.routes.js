const express = require("express");
const router = express.Router();
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);

router.put("/:id", protect, updateSweet);
router.delete("/:id", protect, deleteSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, restockSweet);

module.exports = router;
