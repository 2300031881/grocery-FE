import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">KnowIt</span>
            </Link>
            <p className="mt-4 text-sm leading-6">
              Empowering learners with comprehensive resources and interactive programming courses to build the future.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-white transition-colors">Practice</Link>
              </li>
              <li>
                <Link to="/grades" className="hover:text-white transition-colors">Grades</Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary-500 mt-0.5" />
                <span>123 Learning St, Education City, Vijayawada</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-500" />
                <span>+91 9030313706</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-500" />
                <span>support@KnowIt.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {currentYear} KnowIt All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            {' • '}
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;