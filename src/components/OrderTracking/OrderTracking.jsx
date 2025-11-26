import React, { useState, useEffect } from 'react';
import './OrderTracking.css';
import api from '../../services/api';

const OrderTracking = ({ onClose }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('bigbasket-orders') || '[]');
    setOrders(savedOrders.reverse()); // Show latest orders first
  }, []);

  const getOrderStatus = (order) => {
    const statuses = ['confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    return { currentIndex, statuses };
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: '✅',
      packed: '📦',
      shipped: '🚚',
      delivered: '🏠'
    };
    return icons[status] || '⏳';
  };

  const renderOrderList = () => (
    <div className="orders-list">
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📋</div>
          <h4>No orders yet</h4>
          <p>Your order history will appear here</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
            <div className="order-header">
              <div className="order-info">
                <h4>Order #{order.id}</h4>
                <span className="order-date">{order.orderDate}</span>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status}`}>
                  {getStatusIcon(order.status)} {order.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.slice(0, 3).map(item => (
                <img key={item.id} src={item.image} alt={item.name} className="order-item-image" />
              ))}
              {order.items.length > 3 && (
                <div className="more-items">+{order.items.length - 3}</div>
              )}
            </div>
            
            <div className="order-footer">
              <span className="order-total">₹{order.total}</span>
              <span className="order-delivery">Delivery: {order.estimatedDelivery}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderOrderDetails = () => {
    const { currentIndex, statuses } = getOrderStatus(selectedOrder);
    
    return (
      <div className="order-details">
        <div className="order-details-header">
          <button className="back-btn" onClick={() => setSelectedOrder(null)}>
            ← Back to Orders
          </button>
          <h3>Order #{selectedOrder.id}</h3>
        </div>

        <div className="tracking-progress">
          <h4>Order Status</h4>
          <div className="progress-steps">
            {statuses.map((status, index) => (
              <div key={status} className={`progress-step ${index <= currentIndex ? 'completed' : ''}`}>
                <div className="step-icon">
                  {getStatusIcon(status)}
                </div>
                <div className="step-info">
                  <span className="step-title">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  {index <= currentIndex && (
                    <span className="step-time">
                      {index === 0 ? selectedOrder.orderDate : 'Processing'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-items-detail">
          <h4>Items Ordered</h4>
          {selectedOrder.items.map(item => (
            <div key={item.id} className="order-item-detail">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h5>{item.name}</h5>
                <span className="item-unit">{item.unit}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="delivery-info-detail">
          <h4>Delivery Information</h4>
          <div className="delivery-address">
            <strong>{selectedOrder.address.fullName}</strong>
            <p>{selectedOrder.address.addressLine1}</p>
            {selectedOrder.address.addressLine2 && <p>{selectedOrder.address.addressLine2}</p>}
            <p>{selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
            <p>Phone: {selectedOrder.address.phone}</p>
          </div>
          <div className="estimated-delivery">
            <span>Estimated Delivery: <strong>{selectedOrder.estimatedDelivery}</strong></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal tracking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="tracking-header">
          <h2>Order Tracking</h2>
        </div>

        <div className="tracking-content">
          {selectedOrder ? renderOrderDetails() : renderOrderList()}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;