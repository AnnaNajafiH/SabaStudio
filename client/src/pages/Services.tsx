import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'residential',
      title: 'Residential Design',
      description: 'Custom homes designed to reflect your lifestyle and maximize comfort, functionality, and aesthetic appeal.',
      features: [
        'Custom Home Design',
        'Renovation & Additions',
        'Interior Space Planning',
        'Landscape Integration',
        'Sustainable Living Solutions',
        'Historic Restoration'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'commercial',
      title: 'Commercial Architecture',
      description: 'Innovative commercial spaces that enhance productivity and create memorable experiences for users.',
      features: [
        'Office Buildings',
        'Retail Spaces',
        'Hospitality Design',
        'Mixed-Use Developments',
        'Corporate Campuses',
        'Adaptive Reuse'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'planning',
      title: 'Planning & Consulting',
      description: 'Expert guidance through every phase of your project, from initial concept to final execution.',
      features: [
        'Master Planning',
        'Feasibility Studies',
        'Design Development',
        'Construction Documentation',
        'Project Management',
        'Regulatory Approvals'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'interior',
      title: 'Interior Design',
      description: 'Thoughtful interior spaces that seamlessly blend functionality with aesthetic excellence.',
      features: [
        'Space Planning',
        'Material Selection',
        'Lighting Design',
        'Furniture & Fixtures',
        'Color Consultation',
        'Custom Millwork'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      id: 'landscape',
      title: 'Landscape Architecture',
      description: 'Sustainable outdoor environments that complement and enhance the built environment.',
      features: [
        'Site Analysis',
        'Garden Design',
        'Outdoor Living Spaces',
        'Sustainability Planning',
        'Water Management',
        'Native Plant Selection'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 'sustainability',
      title: 'Sustainable Design',
      description: 'Environmentally responsible design solutions that minimize impact while maximizing efficiency.',
      features: [
        'LEED Certification',
        'Energy Modeling',
        'Green Building Materials',
        'Renewable Energy Integration',
        'Water Conservation',
        'Carbon Neutral Design'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Programming',
      description: 'We begin by understanding your vision, requirements, and constraints through in-depth consultation and site analysis.',
      duration: '2-4 weeks'
    },
    {
      step: '02',
      title: 'Concept Design',
      description: 'Our team develops initial design concepts that explore different approaches to solving your architectural challenges.',
      duration: '3-6 weeks'
    },
    {
      step: '03',
      title: 'Design Development',
      description: 'We refine the chosen concept, developing detailed plans, elevations, and specifications for your approval.',
      duration: '4-8 weeks'
    },
    {
      step: '04',
      title: 'Construction Documents',
      description: 'Complete technical drawings and specifications are prepared for permitting and construction.',
      duration: '6-12 weeks'
    },
    {
      step: '05',
      title: 'Construction Administration',
      description: 'We provide ongoing support during construction to ensure the project is built according to design intent.',
      duration: 'Throughout construction'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-accent-600 text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Comprehensive architectural solutions tailored to transform your vision into exceptional built environments.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial concept to final construction, we provide comprehensive architectural services across all project types.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card group hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-primary-900 mb-4 group-hover:text-accent-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-accent-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach that ensures every project is delivered with precision, on time, and within budget.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((phase, index) => (
              <div key={index} className="relative flex items-start space-x-8 pb-12 last:pb-0">
                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-200"></div>
                )}
                
                {/* Step Number */}
                <div className="w-16 h-16 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10">
                  {phase.step}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-primary-900">
                      {phase.title}
                    </h3>
                    <span className="text-sm text-accent-600 font-medium">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-8">
                Why Choose SabaArchitect?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Proven Expertise</h3>
                    <p className="text-gray-600">Over 15 years of experience delivering exceptional architectural solutions across diverse project types.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Collaborative Approach</h3>
                    <p className="text-gray-600">We work closely with clients, consultants, and contractors to ensure seamless project delivery.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Sustainable Focus</h3>
                    <p className="text-gray-600">Committed to environmentally responsible design that minimizes environmental impact.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Innovation & Technology</h3>
                    <p className="text-gray-600">Utilizing cutting-edge design tools and methodologies to push the boundaries of architecture.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <img
                  src="/api/placeholder/600/600"
                  alt="Architectural expertise"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.setAttribute('style', 'display: flex');
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 hidden items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
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
            Let's discuss your vision and explore how our architectural expertise can bring your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
              Get In Touch
            </Link>
            <Link to="/projects" className="btn-secondary border-white text-white hover:bg-white/10">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
