import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './Checkout.css';
import api from '../../services/api';

const Checkout = ({ onClose, onOrderComplete }) => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    address: {
      fullName: user?.name || '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    paymentMethod: 'card',
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    }
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 200 ? 0 : 30;
  const finalTotal = totalPrice + deliveryFee;

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePlaceOrder = () => {
    // Mock order placement
    const order = {
      id: Date.now(),
      items: cartItems,
      total: finalTotal,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
      orderDate: new Date().toLocaleDateString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('bigbasket-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('bigbasket-orders', JSON.stringify(existingOrders));

    clearCart();
    onOrderComplete(order);
    onClose();
  };

  const renderAddressStep = () => (
    <div className="checkout-step">
      <h3>Delivery Address</h3>
      <div className="address-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Full Name"
            value={orderData.address.fullName}
            onChange={(e) => handleInputChange('address', 'fullName', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={orderData.address.phone}
            onChange={(e) => handleInputChange('address', 'phone', e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Address Line 1"
          value={orderData.address.addressLine1}
          onChange={(e) => handleInputChange('address', 'addressLine1', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address Line 2 (Optional)"
          value={orderData.address.addressLine2}
          onChange={(e) => handleInputChange('address', 'addressLine2', e.target.value)}
        />
        <div className="form-row">
          <input
            type="text"
            placeholder="City"
            value={orderData.address.city}
            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={orderData.address.state}
            onChange={(e) => handleInputChange('address', 'state', e.target.value)}
          />
          <input
            type="text"
            placeholder="Pincode"
            value={orderData.address.pincode}
            onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Landmark (Optional)"
          value={orderData.address.landmark}
          onChange={(e) => handleInputChange('address', 'landmark', e.target.value)}
        />
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="checkout-step">
      <h3>Payment Method</h3>
      <div className="payment-methods">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={orderData.paymentMethod === 'card'}
            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
          />
          <span>💳 Credit/Debit Card</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={orderData.paymentMethod === 'upi'}
            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
          />
          <span>📱 UPI</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={orderData.paymentMethod === 'cod'}
            onChange={(e) => setOrderData(prev => ({ ...prev, paymentMethod: e.target.value }))}
          />
          <span>💰 Cash on Delivery</span>
        </label>
      </div>

      {orderData.paymentMethod === 'card' && (
        <div className="card-details">
          <input
            type="text"
            placeholder="Card Number"
            value={orderData.cardDetails.cardNumber}
            onChange={(e) => handleInputChange('cardDetails', 'cardNumber', e.target.value)}
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="MM/YY"
              value={orderData.cardDetails.expiryDate}
              onChange={(e) => handleInputChange('cardDetails', 'expiryDate', e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              value={orderData.cardDetails.cvv}
              onChange={(e) => handleInputChange('cardDetails', 'cvv', e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Cardholder Name"
            value={orderData.cardDetails.cardholderName}
            onChange={(e) => handleInputChange('cardDetails', 'cardholderName', e.target.value)}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="checkout-header">
          <h2>Checkout</h2>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Address</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Payment</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Review</div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            {currentStep === 1 && renderAddressStep()}
            {currentStep === 2 && renderPaymentStep()}
            {currentStep === 3 && (
              <div className="checkout-step">
                <h3>Order Review</h3>
                <div className="order-summary">
                  {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <span>{item.quantity} × ₹{item.price}</span>
                      </div>
                      <span className="item-total">₹{item.quantity * item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="checkout-sidebar">
            <div className="order-total">
              <h4>Order Summary</h4>
              <div className="total-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="total-row final-total">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <div className="checkout-actions">
              {currentStep > 1 && (
                <button 
                  className="btn-secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button 
                  className="btn-primary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Continue
                </button>
              ) : (
                <button 
                  className="btn-primary"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;