import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignout = () => {
    signout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-primary-100 sticky top-0 z-50">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-11 h-4 flex items-center justify-center"
            style={{
              backgroundImage: 'url("/images/logo.jpg")',
              backgroundSize: 'cover',
              borderRadius: '0px',
               }}>
            </div>
            <span className='font-medium text-xs border-l border-primary-400 pl-1 text-accent-500'>S/Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-accent-600 border-b-2 border-accent-600 pb-1'
                    : 'text-primary-700 hover:text-accent-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-primary-700 hover:text-primary-900"
                >
                  <span>{user.name}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="btn-accent"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-secondary"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-primary-600 hover:text-primary-900 hover:bg-primary-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100 mt-4 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-accent-600 bg-accent-50'
                      : 'text-primary-700 hover:text-accent-600 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Signed in as {user.name}
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium py-2 px-4 text-primary-700 hover:text-accent-600 hover:bg-primary-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium py-2 px-4 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium py-2 px-4 text-primary-700 hover:text-accent-600 hover:bg-primary-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-secondary mx-4"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
