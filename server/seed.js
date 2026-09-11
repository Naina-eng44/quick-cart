const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const Cart = require("./models/Cart");

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with clear sound.",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smart Watch",
    description: "Smart watch with fitness and notification features.",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes for everyday use.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Backpack",
    description: "Spacious backpack for college and daily use.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with powerful and clear audio.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mechanical Keyboard",
    description: "Responsive mechanical keyboard for work and gaming.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Wireless Mouse",
    description: "Smooth and comfortable wireless mouse.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Laptop Stand",
    description: "Adjustable stand for a comfortable working position.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Travel Bottle",
    description: "Reusable bottle for travel, college and everyday use.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses suitable for everyday outdoor use.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smartphone",
    description: "Modern smartphone for everyday work and entertainment.",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Casual T-Shirt",
    description: "Comfortable everyday t-shirt with a clean modern style.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Clear old cart data
    await Cart.deleteMany();

    // Clear old products
    await Product.deleteMany();

    // Add fresh products
    await Product.insertMany(products);

    console.log("12 products added successfully");
    console.log("Old cart data cleared successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();