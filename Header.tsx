
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <span className="text-sm text-gray-600 hidden sm:inline">{user?.email}</span>
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
            <Link to="/billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Billing
            </Link>
            <button
              onClick={logout}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
