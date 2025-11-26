import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';
import api from '../../services/api';

const Cart = ({ onClose, onCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 200 ? 0 : 30;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="cart-header">
          <h2>My Cart</h2>
          <span className="cart-count">({cartItems.length} items)</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <span className="cart-item-unit">{item.unit}</span>
                    <span className="cart-item-price">₹{item.price}</span>
                  </div>

                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              {deliveryFee === 0 && (
                <div className="free-delivery-note">
                  🎉 Free delivery on orders above ₹200
                </div>
              )}
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>
              
              <button className="checkout-btn" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;