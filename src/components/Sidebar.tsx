import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Package, Calendar, BarChart, Bot, Map, Edit3, ChevronLeft, ChevronRight } from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Packages", icon: Package, href: "/packages" },
  { name: "Bookings", icon: Calendar, href: "/bookings" },
  { name: "Analytics", icon: BarChart, href: "/analytics" },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto z-50`}
      >
        {/* Sidebar Header with Title and Toggle Icon */}
        <div className="flex items-center justify-between h-16 bg-gray-800 text-xl font-bold text-white px-4">
          <h1 className="text-lg">YatraSarthi</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}

          {/* External Links */}
          <a
            key="Customers"
            href="https://fastidious-vacherin-b26018.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Users className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            Customers
          </a>

          <a
            key="Travel Assistant"
            href="https://charming-halva-b34c08.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Bot className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            Travel Assistant
          </a>

          <a
            key="Itinerary"
            href="https://frabjous-gelato-63be8b.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Map className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            Itinerary
          </a>

          <a
            key="Content Creation"
            href="https://dancing-squirrel-582cdb.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Edit3 className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            Content Creation
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;