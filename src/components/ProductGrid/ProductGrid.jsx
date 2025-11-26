import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { products } from '../../data/products';
import './ProductGrid.css';

const ProductGrid = ({ selectedCategory, searchTerm, onProductClick }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.replace('-', ' ').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  const getItemQuantityInCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit
    });
  };

  return (
    <div className="product-grid-container">
      <div className="grid-header">
        <h2>
          {selectedCategory === 'all' ? 'All Products' : 
           `${selectedCategory.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}`}
        </h2>
        <span className="product-count">{filteredProducts.length} products found</span>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => {
          const quantityInCart = getItemQuantityInCart(product.id);
          const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container" onClick={() => onProductClick(product)}>
                <img src={product.image} alt={product.name} className="product-image" />
                {discountPercentage > 0 && (
                  <div className="discount-badge">{discountPercentage}% OFF</div>
                )}
                {!product.inStock && (
                  <div className="out-of-stock-overlay">
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-unit">{product.unit}</p>
                
                <div className="product-rating">
                  <span className="rating-stars">⭐</span>
                  <span className="rating-value">{product.rating}</span>
                </div>

                <div className="product-pricing">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="product-actions">
                  {product.inStock ? (
                    quantityInCart > 0 ? (
                      <div className="quantity-in-cart">
                        <span className="in-cart-text">{quantityInCart} in cart</span>
                        <button 
                          className="add-more-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add More
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )
                  ) : (
                    <button className="out-of-stock-btn" disabled>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-icon">📦</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or browse different categories</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;