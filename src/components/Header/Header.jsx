import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onSearch, onCartClick, onLoginClick, onOrderTrackingClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <h1>BigBasket</h1>
          </div>
          
          <div className="location-selector">
            <div className="location-icon">📍</div>
            <div className="location-text">
              <span className="delivery-text">Delivering to</span>
              <span className="location-name">Bangalore 560001</span>
            </div>
          </div>
        </div>

        <div className="header-center">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>

        <div className="header-right">
          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <span>Hi, {user.name}</span>
                </div>
                <div className="user-dropdown">
                  <button onClick={onOrderTrackingClick}>Track Orders</button>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            ) : (
              <button className="login-btn" onClick={onLoginClick}>
                Login / Sign Up
              </button>
            )}
          </div>
          
          <div className="cart-section" onClick={onCartClick}>
            <div className="cart-icon">
              🛒
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;