import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaPlus, FaUser, FaInfoCircle, FaWallet, FaBars, FaTimes, FaSun, FaMoon, FaChartBar, FaCompass, FaCog } from 'react-icons/fa';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ account, connectWallet }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Format wallet address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled
        ? theme === 'dark'
          ? 'bg-[#1a2538]/95 backdrop-blur-sm shadow-lg'
          : 'bg-white/95 backdrop-blur-sm shadow-lg'
        : theme === 'dark'
          ? 'bg-[#1a2538]'
          : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <NavLink to="/" current={location.pathname === '/'}>
                <FaHome className="mr-1" /> Home
              </NavLink>

              <NavLink to="/projects" current={location.pathname === '/projects'}>
                <FaProjectDiagram className="mr-1" /> Projects
              </NavLink>

              <NavLink to="/discover" current={location.pathname === '/discover'}>
                <FaCompass className="mr-1" /> Discover
              </NavLink>

              <NavLink to="/create" current={location.pathname === '/create'}>
                <FaPlus className="mr-1" /> Create
              </NavLink>

              <NavLink to="/about" current={location.pathname === '/about'}>
                <FaInfoCircle className="mr-1" /> About
              </NavLink>

              {account && (
                <>
                  <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                    <FaChartBar className="mr-1" /> Dashboard
                  </NavLink>

                  <NavLink to="/profile" current={location.pathname === '/profile'}>
                    <FaUser className="mr-1" /> Profile
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Theme toggle and wallet connection button */}
          <div className="hidden md:flex md:items-center space-x-4">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            {/* Settings link */}
            <Link
              to="/settings"
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              aria-label="Settings"
            >
              <FaCog />
            </Link>

            {/* Wallet connection */}
            {account ? (
              <div className={`flex items-center rounded-full py-1 pl-2 pr-4 ${
                theme === 'dark'
                  ? 'bg-[#0f172a] text-gray-300'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="h-7 w-7 rounded-full bg-[#22c55e]/20 flex items-center justify-center mr-2">
                  <FaUser className="h-3 w-3 text-[#22c55e]" />
                </div>
                <span className="text-sm font-medium">{formatAddress(account)}</span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-medium transition-all hover:shadow-lg hover:shadow-[#22c55e]/20 hover:scale-105"
              >
                <FaWallet className="mr-2" /> Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {account && (
              <div className="flex items-center bg-[#0f172a] rounded-full py-1 pl-2 pr-3 mr-2">
                <div className="h-6 w-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center mr-1">
                  <FaUser className="h-3 w-3 text-[#22c55e]" />
                </div>
                <span className="text-gray-300 text-xs font-medium">{formatAddress(account)}</span>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#334155]"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 shadow-lg ${
          theme === 'dark'
            ? 'bg-[#1a2538]/95 backdrop-blur-sm'
            : 'bg-white/95 backdrop-blur-sm'
        }`}>
          <MobileNavLink to="/" current={location.pathname === '/'}>
            <FaHome className="mr-2" /> Home
          </MobileNavLink>

          <MobileNavLink to="/projects" current={location.pathname === '/projects'}>
            <FaProjectDiagram className="mr-2" /> Projects
          </MobileNavLink>

          <MobileNavLink to="/discover" current={location.pathname === '/discover'}>
            <FaCompass className="mr-2" /> Discover
          </MobileNavLink>

          <MobileNavLink to="/create" current={location.pathname === '/create'}>
            <FaPlus className="mr-2" /> Create
          </MobileNavLink>

          <MobileNavLink to="/about" current={location.pathname === '/about'}>
            <FaInfoCircle className="mr-2" /> About
          </MobileNavLink>

          {account && (
            <>
              <MobileNavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                <FaChartBar className="mr-2" /> Dashboard
              </MobileNavLink>

              <MobileNavLink to="/profile" current={location.pathname === '/profile'}>
                <FaUser className="mr-2" /> Profile
              </MobileNavLink>

              <MobileNavLink to="/settings" current={location.pathname === '/settings'}>
                <FaCog className="mr-2" /> Settings
              </MobileNavLink>
            </>
          )}

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-700">
            <button
              onClick={toggleTheme}
              className={`flex items-center px-3 py-2 rounded-md ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {theme === 'dark' ? (
                <>
                  <FaSun className="mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mr-2" /> Dark Mode
                </>
              )}
            </button>

            {!account && (
              <button
                onClick={connectWallet}
                className="flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-medium"
              >
                <FaWallet className="mr-2" /> Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop navigation link
const NavLink = ({ to, current, children }) => {
  const { theme } = useTheme();

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
        current
          ? 'bg-[#22c55e] text-white'
          : theme === 'dark'
            ? 'text-gray-300 hover:bg-[#334155] hover:text-white'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink = ({ to, current, children }) => {
  const { theme } = useTheme();

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
        current
          ? 'bg-[#22c55e] text-white'
          : theme === 'dark'
            ? 'text-gray-300 hover:bg-[#334155] hover:text-white'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
