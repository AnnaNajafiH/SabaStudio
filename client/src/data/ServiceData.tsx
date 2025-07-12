export const services = [
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

  export const process = [
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