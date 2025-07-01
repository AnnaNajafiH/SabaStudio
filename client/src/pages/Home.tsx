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

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive architectural solutions tailored to your unique vision and requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group hover:shadow-lg transition-shadow py-10 px-5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Residential Design</h3>
              <p className="text-gray-600">
                Custom homes designed to reflect your lifestyle and maximize comfort, functionality, and aesthetic appeal.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow py-10 px-5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Commercial Architecture</h3>
              <p className="text-gray-600">
                Innovative commercial spaces that enhance productivity and create memorable experiences for users.
              </p>
            </div>

            <div className="card text-center group hover:shadow-lg transition-shadow py-10 px-5">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Planning & Consulting</h3>
              <p className="text-gray-600">
                Expert guidance through every phase of your project, from initial concept to final execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest architectural achievements and the stories behind them.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600">
              <p>Unable to load projects at this time.</p>
            </div>
          )}

          {!loading && !error && featuredProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="card overflow-hidden group-hover:shadow-xl transition-shadow">
                    <div className="aspect-video bg-gray-200 mb-6 rounded-lg overflow-hidden">
                      {project.images && project.images.length > 0 ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.category}</span>
                      <span>{new Date(project.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your vision and create something extraordinary together. 
            Our team is ready to bring your architectural dreams to life.
          </p>
          <Link to="/contact" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
