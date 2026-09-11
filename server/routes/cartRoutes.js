const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get cart
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne().populate("items.product");

    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update quantity
router.put("/update/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove product from cart
router.delete("/remove/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await cart.populate("items.product");

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;