// src/services/api.js
// Axios-based API service (Vite-friendly)

import axios from "axios";

const API_BASE_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:8086/api';

// Create axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: false, // enable if you use cookies
});

// Request interceptor to attach token automatically (if stored)
instance.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem('bigbasket-user') || '{}');
      if (user && user.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      // ignore parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized response error handler -> normalize error thrown to resemble previous behavior
function normalizeAxiosError(err) {
  const error = new Error(err.message || 'Request failed');
  if (err.response) {
    error.status = err.response.status;
    // try to attach parsed body (json or text)
    error.body = err.response.data;
  } else if (err.request) {
    error.status = null;
    error.body = null;
  }
  return error;
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.instance = instance;
  }

  // low-level request (keeps compatibility with your existing code pattern)
  async request(endpoint, options = {}) {
    // options: { method, headers, body, params }
    const method = (options.method || 'GET').toLowerCase();
    const url = `${endpoint}`; // axios will prefix with baseURL
    const config = {
      url,
      method,
      headers: options.headers || undefined,
      params: options.params || undefined,
      // axios expects data for body
      data: options.body ? JSON.parse(options.body) : undefined,
      validateStatus: (s) => true, // we'll handle non-2xx ourselves
    };

    try {
      const res = await this.instance.request(config);
      if (res.status >= 200 && res.status < 300) {
        // No content
        if (res.status === 204) return null;
        return res.data;
      } else {
        // Build an error with status and body similar to fetch version
        const err = new Error(`HTTP error ${res.status}`);
        err.status = res.status;
        err.body = res.data;
        throw err;
      }
    } catch (err) {
      // Normalize axios/network errors
      throw normalizeAxiosError(err);
    }
  }

  /* Auth */
  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  /* Products */
  getProducts(params = {}) {
    return this.request(`/products`, {
      method: 'GET',
      params,
    });
  }
  getProduct(id) {
    return this.request(`/products/${id}`, { method: 'GET' });
  }
  searchProducts(query, category = null) {
    const params = { query };
    if (category) params.category = category;
    return this.request('/products/search', { method: 'GET', params });
  }

  /* Category */
  getCategories() {
    return this.request('/categories', { method: 'GET' });
  }
  getProductsByCategory(categoryId) {
    return this.request(`/categories/${categoryId}/products`, { method: 'GET' });
  }

  /* Cart */
  getCart() {
    return this.request('/cart', { method: 'GET' });
  }
  addToCart(productId, quantity = 1) {
    return this.request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }
  updateCartItem(itemId, quantity) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }
  removeFromCart(itemId) {
    return this.request(`/cart/items/${itemId}`, { method: 'DELETE' });
  }
  clearCart() {
    return this.request('/cart', { method: 'DELETE' });
  }

  /* Orders */
  getOrders() {
    return this.request('/orders', { method: 'GET' });
  }
  getOrder(id) {
    return this.request(`/orders/${id}`, { method: 'GET' });
  }
  createOrder(orderData) {
    return this.request('/orders', { method: 'POST', body: JSON.stringify(orderData) });
  }

  /* User */
  getProfile() {
    return this.request('/user/profile', { method: 'GET' });
  }
  updateProfile(profileData) {
    return this.request('/user/profile', { method: 'PUT', body: JSON.stringify(profileData) });
  }

  /* Addresses */
  getAddresses() {
    return this.request('/user/addresses', { method: 'GET' });
  }
  addAddress(addressData) {
    return this.request('/user/addresses', { method: 'POST', body: JSON.stringify(addressData) });
  }
  updateAddress(id, addressData) {
    return this.request(`/user/addresses/${id}`, { method: 'PUT', body: JSON.stringify(addressData) });
  }
  deleteAddress(id) {
    return this.request(`/user/addresses/${id}`, { method: 'DELETE' });
  }
}

export default new ApiService();
