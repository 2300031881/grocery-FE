import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const { addToCart, cartItems } = useContext(CartContext);

  if (!product) return null;

  const quantityInCart = cartItems.find(item => item.id === product.id)?.quantity || 0;
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            {discountPercentage > 0 && (
              <div className="detail-discount-badge">{discountPercentage}% OFF</div>
            )}
          </div>

          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p className="detail-unit">{product.unit}</p>
            
            <div className="detail-rating">
              <span className="rating-stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-text">{product.rating} (245 reviews)</span>
            </div>

            <div className="detail-pricing">
              <span className="detail-current-price">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="detail-original-price">₹{product.originalPrice}</span>
              )}
            </div>

            <div className="product-features">
              <h4>Product Features</h4>
              <ul>
                <li>✓ Fresh and high quality</li>
                <li>✓ Carefully selected and packed</li>
                <li>✓ Fast delivery guaranteed</li>
                <li>✓ 100% satisfaction guarantee</li>
              </ul>
            </div>

            <div className="stock-info">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="detail-actions">
              {product.inStock ? (
                <>
                  {quantityInCart > 0 && (
                    <div className="detail-quantity-info">
                      <span>{quantityInCart} items in cart</span>
                    </div>
                  )}
                  <button className="detail-add-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              ) : (
                <button className="detail-out-of-stock-btn" disabled>
                  Out of Stock
                </button>
              )}
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders above ₹200</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">🔄</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;