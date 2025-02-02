import React from 'react';
import { Bell, Search, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Toggle Button and Title */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-2">TBO Travel</h1>
          </div>

          {/* Right Section: Search, Icons */}
          <div className="flex items-center">
            <div className="hidden lg:block max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>

            <button className="p-2 ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>

            <button className="p-2 ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;