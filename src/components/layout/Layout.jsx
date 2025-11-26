import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import { closeMobileMenu } from '../../redux/slices/uiSlice';

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Close mobile menu on route change
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location.pathname, dispatch]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;