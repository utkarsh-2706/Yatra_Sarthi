import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ServicEase</span>
            </div>
            <p className="text-gray-400">
              Revolutionizing BPO operations with AI-driven workflow solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/uniqueness" className="text-gray-400 hover:text-white">
                  Uniqueness
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-400 hover:text-white">
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                1234 Innovation Drive
              </li>
              <li className="text-gray-400">
                Tech City, TC 12345
              </li>
              <li className="text-gray-400">
                contact@servicease.com
              </li>
              <li className="text-gray-400">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ServicEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;