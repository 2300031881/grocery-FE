import React from 'react';
import './CategorySidebar.css';

const categories = [
  { id: 'all', name: 'All Products', icon: '🏪' },
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', icon: '🥕' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'meat-seafood', name: 'Meat & Seafood', icon: '🍖' },
  { id: 'rice-grains', name: 'Rice & Grains', icon: '🌾' },
  { id: 'cooking-oil', name: 'Cooking Oil', icon: '🫒' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'snacks', name: 'Snacks & Biscuits', icon: '🍪' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
  { id: 'household', name: 'Household Items', icon: '🧽' },
  { id: 'baby-care', name: 'Baby Care', icon: '👶' },
  { id: 'health', name: 'Health & Wellness', icon: '💊' }
];

const CategorySidebar = ({ selectedCategory, onCategorySelect }) => {
  return (
    <aside className="category-sidebar">
      <div className="sidebar-header">
        <h3>Shop by Category</h3>
      </div>
      
      <div className="category-list">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-arrow">›</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CategorySidebar;