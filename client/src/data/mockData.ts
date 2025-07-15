import { Project, PaginatedResponse } from '../types';

export const mockProjects: Project[] = [
  // Residential Projects
  {
    _id: "mock_1",
    title: "Modern Glass House",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A stunning contemporary residence featuring floor-to-ceiling glass walls and sustainable design elements.",
    fullDescription: "This modern glass house represents the pinnacle of contemporary residential architecture. The design seamlessly blends indoor and outdoor living spaces through expansive glass walls that offer panoramic views of the surrounding landscape.",
    category: "residential",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Los Angeles, CA",
    year: 2023,
    client: "Private Residence",
    area: 450,
    budget: 1200000,
    tags: ["modern", "glass", "sustainable", "luxury"],
    featured: true,
    published: true,
    slug: "modern-glass-house"
  },
  {
    _id: "mock_2",
    title: 'Luxury Hotel Interior',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Sophisticated interior design for a boutique hotel, combining contemporary aesthetics with local cultural elements. Features custom furniture and lighting.',
    fullDescription: 'This boutique hotel interior seamlessly blends contemporary design with local cultural heritage. Custom-designed furniture pieces reflect regional craftsmanship, while carefully curated lighting creates intimate, welcoming atmospheres throughout the space. Each room tells a unique story through thoughtfully selected art and materials.',
    category: 'interior',
    status: 'completed',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Cologne, Germany',
    year: 2023,
    client: 'Boutique Hotels Group',
    area: 2000,
    budget: 1200000,
    tags: ['luxury', 'hospitality', 'interior', 'boutique'],
    featured: false,
    published: true,
    slug: 'luxury-hotel-interior'
  },
  {
    _id: "mock_3",
    title: "Minimalist Beach House",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A serene coastal retreat emphasizing natural materials and ocean views through thoughtful architectural design.",
    fullDescription: "This minimalist beach house embodies the principles of sustainable coastal architecture. The structure is elevated to protect against flooding while maximizing ocean views from every room. Natural materials like weathered cedar and local stone blend harmoniously with the coastal environment. Large overhangs provide protection from the elements while creating covered outdoor living spaces. The interior features an open plan that encourages natural ventilation and connects seamlessly with multiple outdoor terraces.",
    category: "residential",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Malibu, CA",
    year: 2024,
    client: "Private Client",
    area: 320,
    budget: 850000,
    tags: ["beach", "minimalist", "coastal", "sustainable"],
    featured: true,
    published: true,
    slug: "minimalist-beach-house"
  },
  {
    _id: "mock_4",
    title: "Mountain Cabin Retreat",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A cozy mountain retreat built with sustainable materials and designed to blend seamlessly with the natural landscape.",
    fullDescription: "This mountain cabin retreat showcases how architecture can harmoniously integrate with its natural surroundings. Built using locally sourced timber and stone, the structure minimizes its environmental impact while providing comfortable year-round living. Large windows frame spectacular mountain views, while a central fireplace creates a warm gathering space. The design incorporates passive solar heating and natural ventilation strategies.",
    category: "residential",
    status: "in-progress",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Aspen, CO",
    year: 2024,
    client: "Mountain Retreat LLC",
    area: 280,
    budget: 650000,
    tags: ["mountain", "cabin", "sustainable", "retreat"],
    featured: false,
    published: true,
    slug: "mountain-cabin-retreat"
  },
  {
    _id: "mock_5",
    title: "Urban Townhouse",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A contemporary townhouse design that maximizes space and light in a dense urban environment.",
    fullDescription: "This urban townhouse project demonstrates how innovative design can create spacious, light-filled homes in dense city environments. The narrow lot is maximized through a vertical design that includes multiple outdoor terraces and a rooftop garden. A central atrium brings natural light deep into the interior, while sustainable systems reduce the home's environmental footprint.",
    category: "residential",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Portland, OR",
    year: 2023,
    client: "Urban Living Co.",
    area: 220,
    budget: 480000,
    tags: ["urban", "townhouse", "vertical", "modern"],
    featured: false,
    published: true,
    slug: "urban-townhouse"
  },

  // Commercial Projects
  {
    _id: "mock_6",
    title: "Corporate Headquarters",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A 12-story office building designed for a tech company, featuring innovative workspace solutions and green building practices.",
    fullDescription: "This corporate headquarters showcases the future of workplace design. The 12-story structure incorporates flexible workspace solutions, from open collaboration areas to private focus pods. The building's facade features a dynamic curtain wall system that responds to environmental conditions, while the interior emphasizes biophilic design with living walls and natural materials. Smart building systems optimize energy usage and create a comfortable working environment for over 2,000 employees.",
    category: "commercial",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "San Francisco, CA",
    year: 2023,
    client: "TechCorp Inc.",
    area: 15000,
    budget: 45000000,
    tags: ["office", "commercial", "sustainable", "tech"],
    featured: true,
    published: true,
    slug: "corporate-headquarters"
  },
  {
    _id: "mock_7",
    title: "Modern Shopping Center",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A mixed-use retail complex featuring sustainable design and community gathering spaces.",
    fullDescription: "This modern shopping center redefines the retail experience by integrating commercial spaces with community amenities. The design features a central plaza that hosts events and markets, while green roofs and rain gardens manage stormwater sustainably. The building's modular design allows for flexible tenant configurations, and integrated solar panels reduce energy costs.",
    category: "commercial",
    status: "planning",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Austin, TX",
    year: 2024,
    client: "Retail Developers Inc.",
    area: 25000,
    budget: 18000000,
    tags: ["retail", "mixed-use", "sustainable", "community"],
    featured: false,
    published: true,
    slug: "modern-shopping-center"
  },
  {
    _id: "mock_8",
    title: "Innovation Hub",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A collaborative workspace designed to foster creativity and innovation among startups and entrepreneurs.",
    fullDescription: "This innovation hub creates an environment that encourages collaboration and creative thinking. The building features flexible spaces that can be reconfigured for different group sizes and activities. Natural materials and abundant daylight create a comfortable atmosphere, while advanced technology infrastructure supports the needs of modern businesses. Shared amenities include maker spaces, presentation areas, and informal meeting zones.",
    category: "commercial",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Seattle, WA",
    year: 2023,
    client: "Innovation District",
    area: 8500,
    budget: 12000000,
    tags: ["innovation", "coworking", "flexible", "technology"],
    featured: true,
    published: true,
    slug: "innovation-hub"
  },

  // Interior Projects
  {
    _id: "mock_9",
    title: "Luxury Hotel Interior",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "Interior design for a 5-star boutique hotel featuring custom furniture and locally sourced materials.",
    fullDescription: "This luxury boutique hotel interior design project creates a unique sense of place through careful selection of materials, colors, and textures that reflect the local culture. Each of the 120 rooms features custom-designed furniture made by local artisans, while the public spaces showcase contemporary art from regional artists. The design philosophy emphasizes creating intimate, comfortable spaces that feel both luxurious and authentic to the destination.",
    category: "interior",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Miami, FL",
    year: 2024,
    client: "Boutique Hotels Group",
    area: 8500,
    budget: 2800000,
    tags: ["hotel", "interior", "luxury", "boutique"],
    featured: true,
    published: true,
    slug: "luxury-hotel-interior"
  },
  {
    _id: "mock_10",
    title: "Modern Restaurant Design",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A contemporary restaurant interior that balances intimate dining with an open kitchen concept.",
    fullDescription: "This modern restaurant design creates a dynamic dining experience through the integration of an open kitchen with intimate seating areas. The interior features a palette of natural materials including reclaimed wood and stone, complemented by custom lighting fixtures. The design allows guests to observe the culinary process while maintaining comfortable acoustic levels for conversation.",
    category: "interior",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Chicago, IL",
    year: 2023,
    client: "Culinary Ventures",
    area: 320,
    budget: 450000,
    tags: ["restaurant", "modern", "open-kitchen", "hospitality"],
    featured: false,
    published: true,
    slug: "modern-restaurant-design"
  },
  {
    _id: "mock_11",
    title: "Executive Office Suite",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A sophisticated executive office design emphasizing productivity and comfort with premium materials.",
    fullDescription: "This executive office suite combines functionality with luxury to create an environment that supports high-level decision making. The design features custom millwork, premium finishes, and integrated technology solutions. Natural light is maximized through strategic window placement, while acoustic design ensures privacy for confidential meetings. The space includes both formal meeting areas and casual seating for different types of interactions.",
    category: "interior",
    status: "in-progress",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544137778-7adc72b1857d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "New York, NY",
    year: 2024,
    client: "Financial Services Corp",
    area: 450,
    budget: 320000,
    tags: ["executive", "luxury", "office", "premium"],
    featured: false,
    published: true,
    slug: "executive-office-suite"
  },

  // Landscape Projects
  {
    _id: "mock_14",
    title: "Waterfront Park",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "A comprehensive waterfront redevelopment creating public access to natural areas and recreational facilities.",
    fullDescription: "This waterfront park project reclaims industrial waterfront property for public use while restoring natural habitat. The design includes walking and cycling trails, fishing piers, and picnic areas that provide recreational opportunities for all ages. Native plant restoration helps improve water quality, while sustainable materials and construction methods minimize environmental impact. The project serves as a model for waterfront redevelopment that balances public access with ecological restoration.",
    category: "landscape",
    status: "in-progress",
    images: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573160813959-df05c579cf4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580795478371-42635ad3159c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Baltimore, MD",
    year: 2024,
    client: "Baltimore Parks Department",
    area: 2500,
    budget: 1800000,
    tags: ["waterfront", "park", "restoration", "recreation"],
    featured: false,
    published: true,
    slug: "waterfront-park"
  },

  // Renovation Projects
  {
    _id: "mock_15",
    title: "Urban Loft Renovation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "Complete renovation of a 1920s warehouse into a contemporary living space while preserving historic character.",
    fullDescription: "This urban loft renovation breathes new life into a 1920s warehouse building. The project carefully balances the preservation of historic architectural elements with the needs of modern living. Exposed brick walls, original timber beams, and industrial windows are complemented by contemporary fixtures and finishes. The open-plan design maximizes the dramatic ceiling height while creating distinct living zones through strategic furniture placement and lighting design.",
    category: "renovation",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Brooklyn, NY",
    year: 2022,
    client: "Private Client",
    area: 180,
    budget: 320000,
    tags: ["loft", "renovation", "industrial", "historic"],
    featured: false,
    published: true,
    slug: "urban-loft-renovation"
  },
  {
    _id: "mock_16",
    title: "Historic Library Restoration",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "Adaptive reuse of a 1900s Carnegie library into a modern community center while preserving architectural heritage.",
    fullDescription: "This historic library restoration project demonstrates how heritage buildings can be adapted for contemporary use while respecting their architectural significance. The 1900s Carnegie library building has been carefully restored and expanded to serve as a modern community center. Original architectural details have been preserved and highlighted, while new additions use complementary materials and design approaches. The project includes meeting rooms, event spaces, and technology centers that serve current community needs.",
    category: "renovation",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Philadelphia, PA",
    year: 2023,
    client: "City of Philadelphia",
    area: 650,
    budget: 890000,
    tags: ["historic", "library", "adaptive-reuse", "community"],
    featured: true,
    published: true,
    slug: "historic-library-restoration"
  },
  {
    _id: "mock_17",
    title: "Mid-Century Modern Refresh",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: "Sensitive renovation of a 1960s home updating systems and finishes while honoring original design principles.",
    fullDescription: "This mid-century modern home renovation carefully updates a 1960s residence for contemporary living while honoring the original architectural vision. The project focuses on restoring key design elements like floor-to-ceiling windows, open floor plans, and integration with landscape. Updated mechanical systems, insulation, and finishes improve comfort and efficiency while maintaining the home's distinctive character. New additions use design principles consistent with the original architecture.",
    category: "renovation",
    status: "planning",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Palm Springs, CA",
    year: 2024,
    client: "Modern Living Trust",
    area: 290,
    budget: 420000,
    tags: ["mid-century", "modern", "restoration", "heritage"],
    featured: false,
    published: true,
    slug: "mid-century-modern-refresh"
  },

  // Additional projects from original seed (to maintain consistency)
  {
    _id: "mock_18",
    title: 'Modern Residential Complex',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'A sustainable residential complex featuring contemporary design and eco-friendly materials. This project incorporates natural light optimization and energy-efficient systems.',
    fullDescription: 'This innovative residential complex represents the future of sustainable living. Designed with eco-friendly materials and energy-efficient systems, the building features solar panels, rainwater harvesting, and green roofs. The contemporary design maximizes natural light through strategically placed windows and skylights, reducing the need for artificial lighting during the day.',
    category: 'residential',
    status: 'completed',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c5191e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
    location: 'Berlin, Germany',
    year: 2024,
    client: 'Private Developer',
    area: 15000,
    budget: 2500000,
    tags: ['sustainable', 'modern', 'energy-efficient', 'residential'],
    featured: true,
    published: true,
    slug: 'modern-residential-complex'
  },
  {
    _id: "mock_19",
    title: 'Cultural Arts Center',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'A dynamic cultural hub that brings together art, performance, and community. The design emphasizes natural materials and fluid spaces.',
    fullDescription: 'This cultural arts center serves as a vibrant community hub, bringing together various artistic disciplines under one roof. The architecture emphasizes natural materials like wood and stone, creating warm, inviting spaces. Fluid, interconnected galleries allow for flexible exhibition layouts, while the performance hall features state-of-the-art acoustics.',
    category: 'commercial',
    status: 'in-progress',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Munich, Germany',
    year: 2024,
    client: 'City of Munich',
    area: 8000,
    budget: 3200000,
    tags: ['cultural', 'arts', 'community', 'performance'],
    featured: false,
    published: true,
    slug: 'cultural-arts-center'
  }
];

export const categories = ["residential", "commercial", "interior", "landscape", "renovation"];

export const generateMockPaginatedResponse = (
  data: Project[], 
  page: number = 1, 
  limit: number = 12
): PaginatedResponse<Project> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = data.length;
  
  return {
    data: data.slice(startIndex, endIndex),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};
