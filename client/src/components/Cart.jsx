import axios from "axios";

function Cart({ cart, setCart, onClose }) {
  // Remove invalid cart items whose product no longer exists
  const items = (cart?.items || []).filter(
    (item) => item.product
  );

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/update/${productId}`,
        { quantity }
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal + delivery;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={onClose}
      ></div>

      <aside className="cart-drawer">

        <div className="cart-header">
          <div>
            <p className="cart-label">
              YOUR SHOPPING BAG
            </p>

            <h2>Shopping Cart</h2>
          </div>

          <button
            className="close-cart"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="cart-body">

          {items.length === 0 ? (
            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h3>Your cart is empty</h3>

              <p>
                Add some products and they will
                appear here.
              </p>

              <button
                className="continue-shopping"
                onClick={onClose}
              >
                Continue Shopping
              </button>

            </div>
          ) : (
            <>
              <div className="cart-items">

                {items.map((item) => (

                  <div
                    className="cart-item"
                    key={item.product._id}
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div className="cart-item-info">

                      <h3>
                        {item.product.name}
                      </h3>

                      <p className="cart-item-price">
                        ₹{item.product.price}
                      </p>

                      <div className="quantity-row">

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            disabled={
                              item.quantity <= 1
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="remove-button"
                          onClick={() =>
                            removeFromCart(
                              item.product._id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>
                    </div>

                    <strong className="item-total">
                      ₹
                      {item.product.price *
                        item.quantity}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="cart-summary">

                <div>
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>₹{delivery}</strong>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <button className="checkout-button">
                  Proceed to Checkout →
                </button>

                <p className="secure-text">
                  Secure checkout
                </p>

              </div>
            </>
          )}

        </div>

      </aside>
    </>
  );
}

export default Cart;