import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, BarChart2, GraduationCap, Home, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toggleMobileMenu, selectMobileMenuOpen } from '../../redux/slices/uiSlice';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
    ${isActive 
      ? 'text-white bg-primary-600' 
      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`;
  
  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">KnowIt</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={navLinkClass} end>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/courses" className={navLinkClass}>
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </NavLink>
            <NavLink to="/practice" className={navLinkClass}>
              <BarChart2 className="h-4 w-4" />
              <span>Practice</span>
            </NavLink>
            <NavLink to="/grades" className={navLinkClass}>
              <GraduationCap className="h-4 w-4" />
              <span>Grades</span>
            </NavLink>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-700">
                  Hello, {user.name}
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline flex items-center gap-1 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Sign In</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? 'opacity-100 scale-y-100 max-h-screen'
            : 'opacity-0 scale-y-0 max-h-0'
        } origin-top`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
          <NavLink to="/" className={navLinkClass} end>
            <Home className="h-4 w-4" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </NavLink>
          <NavLink to="/practice" className={navLinkClass}>
            <BarChart2 className="h-4 w-4" />
            <span>Practice</span>
          </NavLink>
          <NavLink to="/grades" className={navLinkClass}>
            <GraduationCap className="h-4 w-4" />
            <span>Grades</span>
          </NavLink>
          
          {/* Mobile Auth Options */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 btn btn-outline"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="w-full block btn btn-outline text-center">
                  Sign In
                </Link>
                <Link to="/register" className="w-full block btn btn-primary text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;