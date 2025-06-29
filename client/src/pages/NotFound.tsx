import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* 404 Illustration */}
        <div className="mx-auto w-32 h-32 bg-gradient-to-br from-primary-900 to-accent-600 rounded-full flex items-center justify-center mb-8">
          <span className="text-white text-4xl font-bold">404</span>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full btn-primary inline-flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/projects"
              className="flex-1 btn-secondary text-center"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="flex-1 btn-secondary text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              to="/about"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Our Services
            </Link>
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search our site..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // In a real app, this would trigger a search
                  window.location.href = '/projects';
                }
              }}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
