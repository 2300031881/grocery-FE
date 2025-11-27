import React, { useState, useContext } from 'react';
import { authContext } from '../../context/authContext';
import './Login.css';
import api from '../../services/api';

const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // client-side validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setErrorMsg('Please fill all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      let userFromBackend;

      if (isLogin) {
        // LOGIN flow
        userFromBackend = await api.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // SIGN‑UP flow
        userFromBackend = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      // Debug log
      console.log('Auth success — backend response:', userFromBackend);

      // Persist user
      try {
        localStorage.setItem('bigbasket-user', JSON.stringify(userFromBackend));
      } catch (err) {
        console.warn('Could not save user to localStorage', err);
      }

      // Update app context if available
      if (typeof login === 'function') {
        try {
          login(userFromBackend);
        } catch (err) {
          console.warn('authContext.login threw:', err);
        }
      }

      // close modal on success
      if (onClose) onClose();
    } catch (err) {
      console.error('auth failed (detailed):', err);

      // Build user-friendly error message from axios/fetch-style error
      let msg = 'Authentication failed. Please check your details and try again.';

      // axios-normalized error (our api.js sets .status and .body where possible)
      if (err && err.status && err.body) {
        // body may be object or string
        if (typeof err.body === 'string') {
          msg = err.body;
        } else if (err.body.message) {
          msg = err.body.message;
        } else {
          msg = JSON.stringify(err.body);
        }
      } else if (err && err.response && err.response.data) {
        // fallback if original axios error left here
        const d = err.response.data;
        msg = d?.message || (typeof d === 'string' ? d : JSON.stringify(d));
      } else if (err && err.message) {
        msg = err.message;
      }

      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay" onClick={() => { if (!isLoading && onClose) onClose(); }}>
      <div className="modal login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => { if (!isLoading && onClose) onClose(); }}>×</button>

        <div className="login-header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <p>Welcome to BigBasket!</p>
        </div>

        {errorMsg && (
          <div className="auth-error" role="alert" style={{ color: '#7a0b0b', background: '#fff1f1', padding: '10px', borderRadius: 6, marginBottom: 12 }}>
            {errorMsg}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? (isLogin ? 'Signing in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="toggle-auth-btn"
              onClick={() => { setErrorMsg(''); setIsLogin(!isLogin); }}
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="social-login">
          <div className="divider">
            <span>or</span>
          </div>
          <button className="social-btn google-btn" disabled={isLoading}>
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          <button className="social-btn facebook-btn" disabled={isLoading}>
            <span className="social-icon">📘</span>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
