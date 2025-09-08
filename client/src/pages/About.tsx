import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-neutral-200 text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              About S/Studio
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Creating timeless architectural solutions with passion, precision, and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary-900 mb-8">
                Our Story
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 mb-6">
                  Founded on the principle that great architecture should enhance human experience, 
                  S\Studio has been creating innovative and sustainable designs for over a decade. 
                  Our journey began with a simple belief: every space has the potential to inspire.
                </p>
                <p className="text-gray-600 mb-6">
                  From our early residential projects to today's complex commercial developments, 
                  we've maintained our commitment to design excellence, environmental responsibility, 
                  and client satisfaction. Each project is an opportunity to push boundaries and 
                  create something truly extraordinary.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to be recognized as leaders in sustainable architecture, 
                  having completed over 200 projects across residential, commercial, and public sectors.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <img
                  src="/api/placeholder/600/600"
                  alt="S/Studio"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.setAttribute('style', 'display: flex');
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 hidden items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every design we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Embracing cutting-edge design technologies and methodologies to create forward-thinking solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Committed to environmentally responsible design that minimizes impact while maximizing efficiency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                Working closely with clients, communities, and stakeholders to ensure every project meets its goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Maintaining the highest standards of quality and craftsmanship in every aspect of our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the visionaries and experts who lead our architectural practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card text-center py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src="/api/placeholder/200/200"
                  alt="S-Studio"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.setAttribute('style', 'display: flex');
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 hidden items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Saba </h3>
              <p className="text-accent-600 font-medium mb-4">Principal Architect & Founder</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience, Saba leads our design vision and ensures every project meets our high standards of excellence.
              </p>
            </div>

            <div className="card text-center py-10">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Elham</h3>
              <p className="text-accent-600 font-medium mb-4">Senior Project Manager</p>
              <p className="text-gray-600 text-sm">
                Elham oversees project execution and client relations, ensuring seamless delivery from concept to completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-lg opacity-80">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-80">Awards Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container-max section-padding text-center">
          <h2 className="text-4xl font-serif font-bold text-primary-900 mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to start your architectural journey? We'd love to hear about your vision 
            and discuss how we can bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-accent">
              Start Your Project
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
