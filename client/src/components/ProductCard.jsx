import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowDetails(false);
  };

  return (
    <>
      <div
        className="product-card"
        onClick={() => setShowDetails(true)}
      >
        <img
          src={product.image}
          alt={product.name}
        />

        <div className="product-info">
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <h4>₹{product.price}</h4>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showDetails && (
        <div
          className="product-modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowDetails(false)}
            >
              ×
            </button>

            <img
              className="modal-product-image"
              src={product.image}
              alt={product.name}
            />

            <div className="modal-product-info">
              <p className="modal-label">PRODUCT DETAILS</p>

              <h2>{product.name}</h2>

              <p className="modal-description">
                {product.description}
              </p>

              <h3 className="modal-price">
                ₹{product.price}
              </h3>

              <button
                className="modal-cart-button"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;