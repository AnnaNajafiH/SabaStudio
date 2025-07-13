import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import { useProjects } from '../hooks/useProjects';

const Admin = () => {
  const { user, isAuthenticated, signin, signout, error: authError, clearError } = useAuth();
  const { projects } = useProjects();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sample analytics data
  const analytics = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    inProgressProjects: projects.filter(p => p.status === 'in-progress').length,
    featuredProjects: projects.filter(p => p.featured).length,
    projectsByCategory: {
      'Residential': projects.filter(p => p.category === 'residential').length,
      'Commercial': projects.filter(p => p.category === 'commercial').length,
      'Interior': projects.filter(p => p.category === 'interior').length,
      'Landscape': projects.filter(p => p.category === 'landscape').length,
      'Renovation': projects.filter(p => p.category === 'renovation').length,
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    clearError();

    try {
      await signin(loginData.email, loginData.password);
      // Note: No need to navigate - the useEffect with isAuthenticated will handle that
    } catch (error: any) {
      console.error('Sign in error:', error);
      clearError(); // Clear any previous errors
      if (error?.response?.data?.message) {
        // If we have a specific error message from the API
        clearError();
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    signout();
  };

  // Loading state
  if (isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Login form for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl font-serif">S</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-primary-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{authError}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="admin@sstudio.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  ← Back to website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-serif">S</span>
                </div>
                <span className="text-lg font-serif font-semibold text-primary-900">
                  S\Studio
                </span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Manage your projects, contacts, and website content.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
            <p className="text-sm text-gray-600 mb-4">Total portfolio items</p>
            <span className="text-2xl font-bold text-blue-600">{analytics.totalProjects}</span>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
            <p className="text-sm text-gray-600 mb-4">Finished projects</p>
            <span className="text-2xl font-bold text-green-600">{analytics.completedProjects}</span>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">In Progress</h3>
            <p className="text-sm text-gray-600 mb-4">Active projects</p>
            <span className="text-2xl font-bold text-purple-600">{analytics.inProgressProjects}</span>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured</h3>
            <p className="text-sm text-gray-600 mb-4">Highlighted projects</p>
            <span className="text-2xl font-bold text-yellow-600">{analytics.featuredProjects}</span>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
              <button className="btn-secondary text-sm">Add New</button>
            </div>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.category} • {project.status}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <button className="text-gray-600 hover:text-gray-800" title="Edit Project">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No projects found. Add your first project to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
              <button className="btn-secondary text-sm">View All</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">John Smith</h4>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Interested in residential design services...</p>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Reply</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">Mark as read</button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Commercial project inquiry for office building...</p>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Reply</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">Mark as read</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/projects"
              className="card hover:shadow-lg transition-shadow text-center p-6"
            >
              <svg className="w-8 h-8 text-primary-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h4 className="font-medium text-gray-900">View Portfolio</h4>
              <p className="text-sm text-gray-600 mt-1">See your live projects</p>
            </Link>

            <div className="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer">
              <svg className="w-8 h-8 text-primary-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h4 className="font-medium text-gray-900">Add Project</h4>
              <p className="text-sm text-gray-600 mt-1">Create new portfolio item</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow text-center p-6 cursor-pointer">
              <svg className="w-8 h-8 text-primary-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h4 className="font-medium text-gray-900">Settings</h4>
              <p className="text-sm text-gray-600 mt-1">Manage site settings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
