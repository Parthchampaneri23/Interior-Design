export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Penthouse";
  year: string;
  location: string;
  area: string;
  heroImage: string;
  overviewImage: string;
  detailImages: string[];
  scope: string[];
  challenge: string;
  solution: string;
  quote: string;
  palette: string[];
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  scope: string[];
  deliverables: string[];
  heroImage: string;
  galleryImages: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  deliverables: string[];
  image: string;
  phaseTag?: string;
  clientRole?: string;
  studioInsight?: string;
  highlights?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  location: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "villa-solarium",
    title: "The Solarium Villa",
    subtitle: "Tropical Coastal Sanctuary & Biophilic Architecture",
    category: "Residential",
    year: "2025",
    location: "Alibaug, Maharashtra",
    area: "9,200 sq.ft (850 sq.m)",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    overviewImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    scope: ["Coastal Architectural Restructuring", "Vastu-Harmonized Spatial Planning", "Handcrafted CP Teak Joinery", "Indoor-Outdoor Landscape Choreography"],
    challenge: "Creating deep-plan living galleries resilient to coastal tropical monsoons while optimizing open cross-ventilation, sea-breeze airflow, and natural filtered sunlight.",
    solution: "Engineered floor-to-ceiling thermal glazing with hand-hewn Jaisalmer stone partitions, seasoned CP Teakwood paneling, and acoustic wool drapery that celebrate both panoramic coastal views and private family sanctuary.",
    quote: "A sublime harmony of tropical coastal light, hand-carved stone, and serene Konkan poise.",
    palette: ["#F7F5F0", "#B79A70", "#41483B", "#242522"],
  },
  {
    id: "proj-2",
    slug: "the-haute-atelier",
    title: "The Haute Atelier",
    subtitle: "Boutique Bridal Couture & High-Jewellery Salon",
    category: "Commercial",
    year: "2024",
    location: "Kala Ghoda, Mumbai",
    area: "4,500 sq.ft (420 sq.m)",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80",
    overviewImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    ],
    scope: ["Heritage Restoration Design", "Bespoke Brass & Rosewood Millwork", "Fine Jewelry Museum Vitrines", "Acoustic Tuning"],
    challenge: "Restoring a 110-year-old Victorian heritage facade in historic Mumbai while curating an intimate, secure bridal salon with museum-grade lighting.",
    solution: "Fluted lime plasterwork, antiqued brushed brass display pedestals, and concealed 3000K warm diffuse lighting channels form an ethereal luxury retail atmosphere.",
    quote: "An immersive sensory realm where Indian heritage craft meets contemporary haute couture elegance.",
    palette: ["#E9E2D7", "#B79A70", "#242522", "#77766F"],
  },
  {
    id: "proj-3",
    slug: "residence-nocturne",
    title: "Residence Nocturne",
    subtitle: "Atmospheric Triplex Penthouse Overlooking Arabian Sea",
    category: "Penthouse",
    year: "2025",
    location: "Worli Sea Face, Mumbai",
    area: "6,800 sq.ft (630 sq.m)",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80",
    overviewImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    ],
    scope: ["Penthouse Turnkey Overhaul", "Smart Home Crestron Automation", "Bookmatched Marble & Granite", "Cantilevered Sky Deck"],
    challenge: "Balancing dark, moody, theatrical entertaining zones with bright, sea-facing morning suites overlooking the Mumbai skyline.",
    solution: "Deep charcoal stained oak cabinetry, bookmatched Indian Black Granite, and patinated bronze finishes reflect twilight skyline tones while soft bouclé balances the tactile experience.",
    quote: "Moody drama, sea-spray vistas, and flawless artisanal refinement.",
    palette: ["#20231F", "#41483B", "#B79A70", "#F7F5F0"],
  },
  {
    id: "proj-4",
    slug: "palazzo-al-mare",
    title: "Palazzo Al Mare",
    subtitle: "Heritage Portuguese Villa & Wellness Retreat",
    category: "Hospitality",
    year: "2024",
    location: "Assagao, North Goa",
    area: "15,000 sq.ft (1,400 sq.m)",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80",
    overviewImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    ],
    scope: ["Heritage Estate Restoration", "Wellness Pavilion & Pool Architecture", "Laterite Stone Landscaping", "Custom Cane & Teak Furniture"],
    challenge: "Preserving 19th-century Goan-Portuguese laterite stone walls and antique tiled roofs while embedding modern subterranean plunge spas and seismic reinforcement.",
    solution: "Organic curved lime-plaster arches, hand-cast terracotta paving, and infinity water reflections that merge seamlessly into lush tropical Goan flora.",
    quote: "A sublime communion between heritage Goan soul and tranquil tropical earth.",
    palette: ["#F7F5F0", "#E9E2D7", "#77766F", "#B79A70"],
  },
  {
    id: "proj-5",
    slug: "maison-lumina",
    title: "Maison Lumina",
    subtitle: "Minimalist Modern Pavilions & Private Courtyard Estate",
    category: "Residential",
    year: "2025",
    location: "Jubilee Hills, Hyderabad",
    area: "7,800 sq.ft (720 sq.m)",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
    overviewImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    scope: ["Courtyard Architecture", "Bespoke Sagwan Teak Millwork", "Reflective Lotus Water Body", "Architectural Facade Lighting"],
    challenge: "Managing intense Deccan summer heat while creating expansive indoor-outdoor connection across open living courtyards.",
    solution: "Continuous blackened stone jaali screens, polished Kota stone terrazzo floors, and central water courtyards providing natural micro-climatic cooling.",
    quote: "Quiet symmetry, timeless timber warmth, and meditative courtyard serenity.",
    palette: ["#1A1D1A", "#B79A70", "#E9E2D7", "#77766F"],
  },
];

export const SERVICES: Service[] = [
  {
    id: "serv-1",
    slug: "full-turnkey-interior-architecture",
    number: "01",
    title: "Turnkey Luxury Residential Interiors",
    tagline: "End-to-end interior execution from bare shell to move-in readiness.",
    description:
      "Complete turnkey interior design and on-site contracting for luxury apartments, penthouses, and private villas. We orchestrate architectural space planning, Vastu compliance, false ceilings, civil alterations, bespoke finishes, and premium MEP integration with dedicated site supervisors.",
    scope: [
      "Vastu-compliant spatial planning & 3D photorealistic visualization",
      "Civil restructuring, Italian marble flooring & wall paneling",
      "Complete false ceiling engineering & concealed electrical work",
      "Premium bathroom revamps with imported sanitaryware",
      "White-glove styling, soft furnishings & turnkey key handover",
    ],
    deliverables: [
      "Detailed 2D CAD layouts & electrical/plumbing drawings",
      "Photorealistic 4K 3D walk-through renders",
      "Itemized BOQ (Bill of Quantities) with transparent pricing",
      "Dedicated site supervisor with weekly photo milestone reports",
    ],
    heroImage: "/services/residential-interiors.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    faqs: [
      {
        question: "What does your turnkey interior service include?",
        answer: "Our turnkey interior service manages the complete project lifecycle: 3D design concept, civil changes, false ceiling, electrical rewiring, Italian marble laying, carpentry, modular kitchen installation, painting, soft furnishings, and final deep cleaning for immediate move-in.",
      },
      {
        question: "How do you ensure project completion within the promised timeline?",
        answer: "We assign a dedicated project manager and use a critical-path Gantt chart with penalized contractor milestones, ensuring prompt procurement and handover within agreed deadlines (typically 90 to 180 days).",
      },
    ],
  },
  {
    id: "serv-2",
    slug: "bespoke-furniture-and-joinery",
    number: "02",
    title: "Custom Millwork & Modular Kitchens",
    tagline: "Precision German hardware meets handpicked seasoned timber.",
    description:
      "Engineered modular kitchens, walk-in couture wardrobes, and handcrafted furniture built to endure tropical climates. We utilize calibrated boiling-water-proof (BWP) marine ply, natural wood veneers, Blum and Hafele soft-close mechanisms, and seamless quartz countertops.",
    scope: [
      "Ergonomic island kitchens with built-in pantry & appliance towers",
      "Walk-in dressing suites with sensor LED lighting & tinted fluted glass",
      "Handcrafted Burma & CP teakwood dining tables and console units",
      "Bespoke sofa frames upholstered in Belgian linens & velvet bouclé",
      "Acoustic fluted wooden wall panels and TV feature backdrops",
    ],
    deliverables: [
      "1:1 scale carpentry joinery and section shop drawings",
      "Physical veneer, laminate, and stone swatch selector trays",
      "Factory pre-lamination and edge-banding quality certificates",
      "Comprehensive 10-year hardware warranty handover",
    ],
    heroImage: "/services/modular-kitchens.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    ],
    faqs: [
      {
        question: "What materials do you use for modular kitchens and wardrobes?",
        answer: "We exclusively use IS:710 certified BWP (Boiling Water Proof) marine grade plywood paired with European hardware (Blum, Hafele, Grass), backed by anti-termite and moisture-resistant warranties.",
      },
      {
        question: "Can I customize the inner drawer organizers and storage accessories?",
        answer: "Yes. Every drawer and carcass is custom-configured with soft-close tandem boxes, pull-out pantry units, corner carousels, and tailored jewelry organizers.",
      },
    ],
  },
  {
    id: "serv-3",
    slug: "architectural-lighting-and-atmosphere",
    number: "03",
    title: "Architectural Lighting & Ceiling Design",
    tagline: "Layered illumination, warm ambient coves, and smart scene controls.",
    description:
      "Lighting defines how spatial volume and textures are experienced. We design multi-tiered illumination schemes integrating anti-glare COB architectural downlights, magnetic track profiles, warm 3000K indirect cove lighting, and seamless smart automation for every mood.",
    scope: [
      "Ambient, task, and accent lighting calculation (Lux & CRI 95+)",
      "Magnetic track lighting systems & adjustable art spotlights",
      "Concealed false ceiling cove washes & shadow-line perimeter reveals",
      "Smart lighting automation (Lutron, Casambi & smart app scenes)",
      "Bespoke statement chandelier and dining pendant curation",
    ],
    deliverables: [
      "Complete ceiling layout with driver & circuiting schematics",
      "Photometric lighting calculation and lux distribution maps",
      "Fixture specification schedule with beam angles and color temperatures",
      "Smart scene programming guide (Morning, Relax, Dinner, Party)",
    ],
    heroImage: "/services/architectural-lighting.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
    faqs: [
      {
        question: "Why is lighting design essential before false ceiling framing starts?",
        answer: "Concealed linear channels, magnetic tracks, and transformer driver boxes require exact coordinate framing and heat-dissipation clearance in the ceiling grid before gypsum plasterboards are sealed.",
      },
      {
        question: "What color temperature is recommended for luxury residential interiors?",
        answer: "We predominantly specify warm 2700K to 3000K high-CRI (95+) LEDs for residential living spaces, creating a warm, flattering, relaxing ambiance that highlights stone veining and wood grains.",
      },
    ],
  },
  {
    id: "serv-4",
    slug: "commercial-and-hospitality-concepts",
    number: "04",
    title: "Commercial, Office & Hospitality Interiors",
    tagline: "High-performance workspaces, boutique retail, and fine dining venues.",
    description:
      "Elevating brand prestige and spatial ergonomics for corporate headquarters, boutique retail showrooms, aesthetic clinics, and fine-dining restaurants. We blend high-traffic durability, acoustic comfort, biophilic elements, and memorable signature client experience zones.",
    scope: [
      "Spatial zoning, customer journey mapping & ergonomic workstations",
      "Acoustic wall baffling, sound-dampening panels & glass partitions",
      "High-traffic commercial vitrified tile and microcement floor finishes",
      "Turnkey HVAC, fire-fighting & electrical statutory coordination",
      "Sculptural reception desks, brand feature walls & green biophilia",
    ],
    deliverables: [
      "Full MEP, HVAC & statutory building code drawing sets",
      "Commercial material durability test certificates & flame-retardant specs",
      "Fixed-budget procurement matrix with commercial-grade warranties",
      "Phased overnight execution schedules to minimize business downtime",
    ],
    heroImage: "/services/commercial-interiors.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    ],
    faqs: [
      {
        question: "How do you manage commercial fit-outs without disrupting neighboring offices?",
        answer: "We coordinate silent daytime works with approved evening and weekend noisy shifts, adhering to commercial complex guidelines and sound control standards.",
      },
      {
        question: "Do you assist with statutory approvals and fire safety compliance?",
        answer: "Yes. Our team prepares all necessary drawings and works in conjunction with certified MEP and fire engineers to secure landlord and municipal NOCs.",
      },
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: "01",
    title: "Discovery & Spatial Consultation",
    subtitle: "Understanding Daily Rituals & Aspirations",
    duration: "Week 1 - 2",
    phaseTag: "Ideation & Lifestyle Diagnostics",
    clientRole: "In-Depth Lifestyle Dialogue & Aesthetic Preference Review",
    studioInsight: "We map family circulation, entertaining rituals, and daily light rhythms before drawing a single wall.",
    description:
      "We begin with immersive lifestyle consultations, site orientation, and design questionnaires to uncover how you move, rest, cook, and feel inside your living environment.",
    deliverables: [
      "Project Creative Vision Brief",
      "Functional Spatial Matrix & Zoning Plan",
      "Preliminary Budget & Timeline Feasibility Matrix",
    ],
    highlights: [
      "Vastu orientation & sunlight path mapping",
      "Material tactile preference analysis",
      "Lifestyle circulation benchmarking",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "02",
    title: "Site Diagnostics & Precision Survey",
    subtitle: "Spatial Geometry & MEP Infrastructure",
    duration: "Week 3 - 4",
    phaseTag: "Precision Measurement & Vastu Audit",
    clientRole: "Property Access & Architectural Drawings Handover",
    studioInsight: "Millimeter-accuracy 3D LiDAR laser scans prevent costly structural misalignments during factory millwork fabrication.",
    description:
      "High-precision 3D laser scanning of physical architecture, structural load appraisal, MEP conduit inspection, and comprehensive Vastu compliance mapping across all living quadrants.",
    deliverables: [
      "As-built 3D BIM Architectural Model",
      "Vastu Energy Quadrant Analysis",
      "Civil & Structural Diagnostic Assessment",
    ],
    highlights: [
      "Laser measured ceiling level variations",
      "Plumbing shaft & electrical DB health checks",
      "Thermal & acoustic baseline testing",
    ],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "03",
    title: "3D Concept & Materiality Curation",
    subtitle: "Tactile Mood, Form & Photorealistic Vistas",
    duration: "Week 5 - 8",
    phaseTag: "Photorealistic 4K & Tactile Trays",
    clientRole: "Physical Material Sample Review & Design Sign-Off",
    studioInsight: "Physical material trays allow clients to touch natural Italian marbles, fluted teak veneers, and bouclé under actual daylight.",
    description:
      "We curate physical tactile trays featuring handpicked stone slabs, patinated brass samples, bespoke upholstery fabrics, and cinematic 4K architectural renderings capturing every spatial vista.",
    deliverables: [
      "Physical Tactile Material Trays (Stone, Veneer, Brass)",
      "Photorealistic 4K Architectural 3D Renders",
      "Approved Furniture Layout & Circulation Plans",
    ],
    highlights: [
      "Custom Italian marble bookmatch preview",
      "Cove lighting lux simulations",
      "Furniture scale & ergonomic verification",
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "04",
    title: "Detailed Engineering & Fixed BOQ",
    subtitle: "Precision Working Drawings & Cost Certainty",
    duration: "Week 9 - 11",
    phaseTag: "Engineering & Fixed-Price Guarantee",
    clientRole: "Final Scope Sign-Off & Turnkey Contract Execution",
    studioInsight: "Our itemized Bill of Quantities guarantees zero surprise cost escalations or mid-construction price inflation.",
    description:
      "Complete technical drawing sets, reflected false ceiling plans, electrical load distribution schedules, plumbing schematics, and an itemized fixed-sum Bill of Quantities.",
    deliverables: [
      "Comprehensive Construction Working Drawing Dossier",
      "Guaranteed Fixed-Sum Itemized BOQ",
      "Detailed Critical-Path Gantt Schedule",
    ],
    highlights: [
      "1:1 scale carpentry joinery details",
      "Sanitary & electrical load schedules",
      "Strict contractor milestone penalty clauses",
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "05",
    title: "Turnkey Civil & Joinery Execution",
    subtitle: "Dedicated Site Supervision & Craft Oversight",
    duration: "Month 4 - 9",
    phaseTag: "Turnkey On-Site Craftsmanship",
    clientRole: "Bi-Weekly Digital Milestone Photo Audits",
    studioInsight: "Our senior site engineers oversee Italian stone masons, heritage carpenters, and MEP technicians with daily biometric logs.",
    description:
      "Civil alterations, Italian marble dry-laying and polishing, false ceiling framing, electrical rewiring, factory-calibrated modular joinery installation, and bespoke wall finishes.",
    deliverables: [
      "Bi-Weekly Digital Photo Progress Reports",
      "Phase-Wise Milestone Quality Sign-Offs",
      "Real-Time Material Procurement Tracking",
    ],
    highlights: [
      "IS:710 Marine Ply factory edge-banding inspection",
      "Pressure-tested plumbing lines",
      "Laser-leveled false ceiling drop alignment",
    ],
    image: "/services/residential-interiors.jpg",
  },
  {
    step: "06",
    title: "Zero-Defect Snagging & White-Glove Styling",
    subtitle: "100-Point Audit & Curated Final Dressing",
    duration: "Month 10",
    phaseTag: "Quality Audit & Art Staging",
    clientRole: "Preliminary Walk-Through Snagging Review",
    studioInsight: "Every soft-close drawer, dimmer channel, and stone seam is rigorously audited against luxury hospitality benchmarks.",
    description:
      "Meticulous zero-defect snagging inspections, architectural lighting balance, soft furnishing steam pressing, bespoke rug placement, and final white-glove styling.",
    deliverables: [
      "100-Point Zero-Defect Audit Certificate",
      "Photometric Lux & Acoustic Testing Dossier",
      "Curated Art Placement & Styling Dressing Log",
    ],
    highlights: [
      "Automated sensor lighting testing",
      "Marble crystallization and sealant verification",
      "Professional deep-clean sanitization",
    ],
    image: "/services/modular-kitchens.jpg",
  },
  {
    step: "07",
    title: "Ceremonial Handover & Concierge Care",
    subtitle: "The Key to Your Living Masterpiece",
    duration: "Handover Day",
    phaseTag: "Move-In Toast & 2-Year Warranty",
    clientRole: "Ceremonial Key Handover & Welcome Toast",
    studioInsight: "We present a personalized leather-bound home asset archive with all warranties, care guides, and 2-year studio support.",
    description:
      "A ceremonial handover welcome with personalized digital and leather-bound home asset guides, manufacturer warranty binders, and ongoing 2-year Decorex concierge support.",
    deliverables: [
      "Personalized Bound Home Asset & Care Archive",
      "Complete Equipment Warranty & NOC Portfolio",
      "2-Year Decorex Studio Concierge Support Agreement",
    ],
    highlights: [
      "Appliance and smart automation client walkthrough",
      "Dedicated concierge hotline for maintenance",
      "Scheduled complimentary 6-month & 1-year audits",
    ],
    image: "/services/commercial-interiors.jpg",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Decorex transformed our Lake Como villa into an otherworldly sanctuary. Their mastery of natural light and raw stone is unmatched. Every morning feels like awakening inside a work of art.",
    author: "Contessa Eleonora Visconti",
    role: "Private Collector & Patron",
    project: "Villa Solarium",
    location: "Lake Como, Italy",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "Their architectural discipline and impeccable restraint elevated our Mayfair flagship into the most talked-about retail destination in London. Flawless execution from concept to launch.",
    author: "Julian Sterling-Ward",
    role: "Creative Director, Maison Sterling",
    project: "The Haute Atelier",
    location: "Mayfair, London",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "Living in Residence Nocturne is cinematic. The custom bronze accents, the olive oak joinery, and the acoustic silence they achieved 40 stories above New York City are pure genius.",
    author: "Arthur & Vivienne Thorne",
    role: "Managing Director, Global Ventures",
    project: "Residence Nocturne",
    location: "Manhattan, New York",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-4",
    quote:
      "Working with Decorex redefined what we thought an architecture studio could be. Their communication was as refined as their detailing. Not a single deadline missed.",
    author: "Dr. Alistair Finch",
    role: "Founding Partner, Finch Heritage",
    project: "Palazzo Al Mare",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-5",
    quote:
      "Their reverence for Japanese minimalism balanced with European warmth transformed Maison Lumina into our dream family retreat. The bamboo garden sightlines are magical.",
    author: "Kenji & Saki Takahashi",
    role: "Architectural Patrons & Technologists",
    project: "Maison Lumina",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-6",
    quote:
      "From bespoke bronze hardware to seamless floor-to-ceiling glass, their attention to every millimetre delivered an estate that commands instant awe and lasting tranquility.",
    author: "Genevieve Dubois",
    role: "Estate Investor & Art Collector",
    project: "Château d'Ombre",
    location: "Provence, France",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-7",
    quote:
      "The custom cantilevered marble island and integrated acoustic panels transformed our penthouse into an architectural masterpiece that leaves guests speechless.",
    author: "Maximilian Von Berg",
    role: "Principal, Alpine Private Equity",
    project: "The Apex Residence",
    location: "Zurich, Switzerland",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-8",
    quote:
      "Decorex curated every detail from reclaimed French oak parquetry to museum lighting. The bespoke craftsmanship and personal touch are second to none.",
    author: "Lady Camilla Kensington",
    role: "Cultural Foundation Trustee",
    project: "Belgravia Mews",
    location: "London, United Kingdom",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "test-9",
    quote:
      "From initial spatial studies to turnkey handover, their poise and precision made remodeling our coastal sanctuary an effortless and deeply gratifying journey.",
    author: "Marcus & Selina Vance",
    role: "Tech Founders & Philanthropists",
    project: "The Horizon Pavilion",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "biophilic-luxury-stone-light",
    title: "The Architecture of Stillness: Tactile Stone & Circadian Illumination",
    excerpt: "Why the world's most discerning homeowners are abandoning high-gloss minimalism in favor of rough-hewn travertine, raw linen, and shadows that breathe.",
    category: "Design Philosophy",
    readTime: "6 min read",
    date: "March 2025",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Aurelia Vance",
      role: "Principal Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    content: [
      "In an era characterized by sensory overload and digital noise, true luxury is no longer defined by ostentation or flashiness. Instead, it is found in acoustic stillness, tactile warmth, and an intimate dialogue with the sun's trajectory.",
      "When we specify unpolished Roman travertine or open-pore French walnut, we invite imperfections that age with noble dignity. Natural materials possess memory and soul—they respond to touch, change under afternoon sun, and ground us in the present moment.",
      "Lighting must never be an afterthought. By utilizing low-temperature circadian LED washes concealed within architectural reveal gaps, the home subtly shifts mood from energetic sunrise clarity to golden dusk tranquility.",
    ],
  },
  {
    id: "post-2",
    slug: "curating-private-art-collections",
    title: "Curating for Architecture: How to Hang Art with Spatial Authority",
    excerpt: "A guide to integrating monumental sculpture and contemporary paintings into residential spaces without turning your home into a sterile white-cube museum.",
    category: "Art & Curation",
    readTime: "8 min read",
    date: "February 2025",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Marcus Lindqvist",
      role: "Design Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    content: [
      "Art in a private home must not fight the architecture; it should participate in a sacred dialogue. Placing a substantial canvas against hand-troweled lime plaster requires understanding sightlines from every seated vantage point.",
      "We often design wall recesses and tailored ceiling spotlights calibrated specifically to the pigment density of a client's commissioned painting, ensuring no harsh glare or UV degradation over decades.",
    ],
  },
  {
    id: "post-3",
    slug: "sustainable-haute-materials",
    title: "Noble Permanence: The Rise of Reclaimed Timber & Ancient Mortars",
    excerpt: "Exploring the renaissance of heritage lime mortars, low-carbon terrazzo, and forest-stewarded timber in modern haute architecture.",
    category: "Materiality",
    readTime: "5 min read",
    date: "January 2025",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Elena Rossini",
      role: "Materials Specialist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    content: [
      "Sustainability in luxury design is not about synthetic compromises; it is about timeless longevity. An interior crafted from authentic bronze, lime wash, and sustainably harvested French oak will endure for centuries, patina gracefully, and never end up in a landfill.",
    ],
  },
  {
    id: "post-4",
    slug: "coastal-resilient-monsoon-architecture",
    title: "Monsoon Architecture: Designing Resilient Tropical Sanctuaries in Alibaug & Goa",
    excerpt: "Engineering open-air verandas, deep overhangs, and breathable stone masonry that flourish during southwest tropical deluges without sacrificing bespoke elegance.",
    category: "Tropical Architecture",
    readTime: "7 min read",
    date: "December 2024",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Devratn Singhania",
      role: "Senior Civil Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    content: [
      "Building along India's coastal belt demands profound humility before nature. In coastal Alibaug and North Goa, the southwest monsoon brings over 3,000mm of torrential rain alongside high-salinity maritime humidity.",
      "Rather than barricading spaces inside hermetically sealed air conditioning boxes, we champion permeable architecture. Hand-quarried Laterite stone walls breathing through natural slaked lime washes act as natural moisture buffers.",
      "Extended timber eaves crafted from seasoned maritime teak shelter deep verandas, allowing floor-to-ceiling sliding glass panels to remain wide open even during heavy tropical cloudbursts.",
    ],
  },
  {
    id: "post-5",
    slug: "minimalist-bespoke-kitchen-joinery",
    title: "The Concealed Atelier: Monolithic Islands, Pocket Pantries & Flush Millwork",
    excerpt: "Transforming the culinary space from an industrial workshop into an architectural sculpture using seamless book-matched marble and motorized concealment joinery.",
    category: "Kitchen & Millwork",
    readTime: "6 min read",
    date: "November 2024",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Marcus Lindqvist",
      role: "Design Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    content: [
      "The modern luxury kitchen has ceased to be a separate service room tucked away in the shadows. It is now the emotional and architectural fulcrum of the residence, demanding the same refinement as a formal salon or private gallery.",
      "By utilizing oversized pivot-slide pocket doors finished in smoked European oak or burnished brass, all high-heat culinary equipment and utility sinks vanish behind seamless architectural wall planes in seconds.",
      "The centerpiece is invariably a monolithic island sculpted from a single quarry block of Calacatta Monet or Indian Rainforest Green marble, featuring mitred 45-degree waterfall edges and integrated flush induction cooking zones.",
    ],
  },
];
