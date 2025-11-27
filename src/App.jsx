import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CategorySidebar from './components/CategorySidebar/CategorySidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/auth/Login';
import Checkout from './components/Checkout/Checkout';
import OrderTracking from './components/OrderTracking/OrderTracking';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const handleOrderComplete = (order) => {
    setOrderComplete(order);
    setShowCheckout(false);
    // Show success message or redirect
    alert(`Order #${order.id} placed successfully! Estimated delivery: ${order.estimatedDelivery}`);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header 
              onSearch={setSearchTerm}
              onCartClick={() => setShowCart(true)}
              onLoginClick={() => setShowLogin(true)}
              onOrderTrackingClick={() => setShowOrderTracking(true)}
            />
            
            <div className="main-container">
              <CategorySidebar 
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
              
              <main className="content">
                <Routes>
                  <Route path="/" element={
                    <ProductGrid 
                      selectedCategory={selectedCategory}
                      searchTerm={searchTerm}
                      onProductClick={setSelectedProduct}
                    />
                  } />
                </Routes>
              </main>
            </div>

            {showCart && (
              <Cart 
                onClose={() => setShowCart(false)} 
                onCheckout={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
              />
            )}

            {showCheckout && (
              <Checkout 
                onClose={() => setShowCheckout(false)}
                onOrderComplete={handleOrderComplete}
              />
            )}

            {showOrderTracking && (
              <OrderTracking onClose={() => setShowOrderTracking(false)} />
            )}

            {selectedProduct && (
              <ProductDetail 
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}

            {showLogin && (
              <Login onClose={() => setShowLogin(false)} />
            )}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
