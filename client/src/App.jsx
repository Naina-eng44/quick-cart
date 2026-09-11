import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState({ items: [] });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart"
        );

        if (!cancelled) {
          setCart(response.data);
        }
      } catch (error) {
        console.error("Cart loading error:", error);
      }
    };

    fetchCart();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        }
      );

      setCart(response.data);
      setCartOpen(true);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const cartCount = (cart?.items || []).filter(
    (item) => item.product
  ).length;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Quick<span>Cart</span>
        </div>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <main className="container">
        <section className="hero">
          <p className="hero-tag">
            SMART SHOPPING • SIMPLE & FAST
          </p>

          <h1>
            Shop smarter.
            <br />
            Shop with QuickCart.
          </h1>

          <p>
            Discover everyday products at great prices
            and enjoy a smooth shopping experience.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Now →
          </button>
        </section>

        <section
          className="products-section"
          id="products"
        >
          <div className="section-heading">
            <div>
              <p>EXPLORE OUR COLLECTION</p>
              <h2>Popular Products</h2>
            </div>

            <span>
              {cartCount} item
              {cartCount !== 1 ? "s" : ""} in cart
            </span>
          </div>

          <ProductList
            onAddToCart={handleAddToCart}
          />
        </section>
      </main>

      {cartOpen && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;