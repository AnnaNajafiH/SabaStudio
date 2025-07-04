import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { useProjects } from '../hooks/useProjects';

const Home = () => {
  const { projects, loading, error } = useProjects();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Show first 3 projects as featured
    if (projects.length > 0) {
      setFeaturedProjects(projects.slice(0, 3));
    }
  }, [projects]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-custom text-white py-20">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Crafting Architectural Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional architectural services that transform visions into reality with precision, innovation, and artistry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="btn-primary text-lg px-8 py-4"
              >
                View Our Work
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
              Our Expertise
            </div>
            <h2 className="text-5xl font-serif font-bold text-primary-900 mb-6">
              Comprehensive Architectural Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From residential masterpieces to commercial landmarks, we deliver innovative designs that push boundaries while honoring timeless principles of architecture.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-accent-600/5 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">Residential Architecture</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Luxury homes and residential developments that blend modern innovation with timeless elegance, creating spaces that enhance daily living.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom Home Design
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Renovation & Extensions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Interior Architecture
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-primary-900/5 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-primary-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">Commercial Design</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Corporate headquarters, retail spaces, and mixed-use developments that drive business success through strategic design.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Office Buildings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Retail Spaces
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Mixed-Use Development
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-accent-600/5 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">Planning & Consulting</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Strategic architectural guidance from feasibility studies to project delivery, ensuring your vision becomes reality.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Feasibility Studies
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Project Management
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Construction Administration
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/services" className="inline-flex items-center bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Explore All Services
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-accent-100 text-accent-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-600 rounded-full mr-3"></span>
              Portfolio Showcase
            </div>
            <h2 className="text-5xl font-serif font-bold text-primary-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our latest architectural achievements and discover the innovative solutions we've crafted for our clients.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="relative">
                <div className="loading-spinner w-12 h-12 border-4 border-primary-200 border-t-primary-600"></div>
                <p className="text-gray-600 mt-4 text-center">Loading projects...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-red-800 font-semibold mb-2">Unable to Load Projects</h3>
                <p className="text-red-600">Please try again later or contact us for assistance.</p>
              </div>
            </div>
          )}

          {!loading && !error && featuredProjects.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.images && project.images.length > 0 ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                          <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Project Number */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-900 font-bold text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      {/* View Project Button */}
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white rounded-lg px-4 py-2 text-center">
                          <span className="text-primary-900 font-semibold">View Project</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(project.createdAt).getFullYear()}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.location || 'Location TBD'}
                        </div>
                        
                        <div className="flex items-center text-accent-600 group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-medium mr-1">Learn More</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && featuredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-2xl p-12 max-w-lg mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">Our featured projects will be showcased here soon.</p>
              </div>
            </div>
          )}

          <div className="text-center mt-16">
            <Link 
              to="/projects" 
              className="inline-flex items-center bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore All Projects
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
              Client Success Stories
            </div>
            <h2 className="text-5xl font-serif font-bold text-primary-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience working with us.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "SabaArchitect transformed our vision into a stunning reality. Their attention to detail and innovative approach exceeded all our expectations."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-primary-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Residential Client</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "Professional, creative, and reliable. SabaArchitect delivered our commercial project on time and within budget while maintaining exceptional quality."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <div className="font-semibold text-primary-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">Commercial Developer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "Their expertise in sustainable design helped us create an award-winning building that reflects our company's values and environmental commitment."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  E
                </div>
                <div>
                  <div className="font-semibold text-primary-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Corporate Executive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}

    </div>
  );
};

export default Home;
