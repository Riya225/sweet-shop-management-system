const Sweet = require("../models/Sweet");

const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json({
      message: "Sweet added successfully",
      sweet,
    });
  } catch (error) {
    console.error("Add sweet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    console.error("Search sweet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet updated", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSweet = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const restockSweet = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const { amount } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += Number(amount || 0);
    await sweet.save();

    res.json({ message: "Sweet restocked", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};


