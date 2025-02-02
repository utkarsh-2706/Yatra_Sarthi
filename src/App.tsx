import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import Assistant from './pages/Assistant';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <main
              className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ${
                isSidebarOpen ? 'ml-64' : 'ml-0'
              }`}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/assistant" element={<Assistant />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;