"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Share2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Compass,
  Layers,
  Sparkles,
  Star,
  ShieldCheck,
  Camera,
  Building2,
  Check,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import type { Project } from "@/data/siteData";

interface ProjectEnrichment {
  coordinates: string;
  elevation: string;
  architecturalStyle: string;
  leadArchitect: string;
  duration: string;
  vastuCompliance: string;
  clientQuote: {
    quote: string;
    client: string;
    role: string;
  };
  spatialHighlights: {
    room: string;
    area: string;
    image: string;
    highlights: string[];
    description: string;
  }[];
}

const INDIAN_PROJECT_EXTRAS: Record<string, ProjectEnrichment> = {
  "villa-solarium": {
    coordinates: "18.641° N, 72.872° E",
    elevation: "14m Coastal Sea Level",
    architecturalStyle: "Tropical Coastal Biophilic Modernism",
    leadArchitect: "Ar. Rohan Mehta & Decorex Mumbai Atelier",
    duration: "18 Months",
    vastuCompliance: "100% East-Facing Vastu Compliant",
    clientQuote: {
      quote:
        "Decorex created our dream coastal retreat in Alibaug. The seamless flow from the living pavilion to the pool deck, paired with the seasoned teakwood and Jaisalmer stone, gives us complete peace of mind.",
      client: "Dr. Rajesh & Sunita Oberoi",
      role: "Private Villa Owners",
    },
    spatialHighlights: [
      {
        room: "Double-Height Sea Breeze Living Pavilion",
        area: "2,800 sq.ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Floor-to-ceiling thermal motorized sliding glass systems",
          "Hand-hewn Jaisalmer stone feature wall with warm ambient illumination",
          "Custom Italian-crafted modular seating in breathable linen bouclé",
        ],
        description:
          "The heart of the villa opens completely onto the sea breeze, engineered with deep protective overhangs that shield the space from intense tropical rains while inviting natural cross-ventilation.",
      },
      {
        room: "Private Master Belvedere Suite & Terrace",
        area: "1,650 sq.ft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Cantilevered wrap-around verandah overlooking lush coconut groves",
          "Bespoke CP Teakwood walk-in dressing room with sensor illumination",
          "Ensuite bathroom with monolithic stone soaking tub and outdoor shower",
        ],
        description:
          "Positioned in the Southwest corner following traditional Vastu principles, this sanctuary offers morning sea vistas, acoustic insulation, and custom handcrafted timber ceilings.",
      },
      {
        room: "Indoor-Outdoor Dining & Culinary Bar",
        area: "1,400 sq.ft",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Monolithic quartzite 12-seater family dining banquet",
          "Concealed chef's preparation kitchen with Sub-Zero & Wolf appliances",
          "Patinated brass wine cellar and bespoke cocktail bar",
        ],
        description:
          "Designed for intimate family gatherings and grand weekend entertaining, connecting directly to the outdoor barbecue terrace and sheltered poolside pergola.",
      },
      {
        room: "Poolside Reflection Deck & Wellness Lounge",
        area: "3,350 sq.ft",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "25-meter infinity ozone lap pool with natural Sukabumi stone finish",
          "Sunken conversation pit with outdoor bio-ethanol fire bowl",
          "Surrounding landscape with indigenous frangipani and areca palms",
        ],
        description:
          "The outdoor sanctuary merges Alibaug's verdant coastal landscape with resort-style privacy, providing day-to-night tranquility.",
      },
    ],
  },
  "the-haute-atelier": {
    coordinates: "18.927° N, 72.833° E",
    elevation: "8m Heritage Precinct",
    architecturalStyle: "Indo-Saracenic Heritage & Contemporary Haute Couture",
    leadArchitect: "Ar. Priya Nair & Decorex Mumbai Atelier",
    duration: "12 Months",
    vastuCompliance: "Optimized Commercial Energy Grid",
    clientQuote: {
      quote:
        "Our flagship bridal couture salon in Kala Ghoda required an ethereal, museum-grade ambiance. Decorex restored the heritage arches and gave our bridal clientele an unforgettable, regal experience.",
      client: "Radhika Singhania",
      role: "Creative Director & Founder",
    },
    spatialHighlights: [
      {
        room: "Grand Runway Presentation Salon",
        area: "1,800 sq.ft",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Restored 14-foot high heritage Victorian timber ceilings",
          "Curved fluted lime-plaster portals with antiqued brushed brass rails",
          "Calibrated 3000K museum-grade color rendering index (CRI 98) lighting",
        ],
        description:
          "An expansive presentation gallery allowing lehengas and royal couture garments to be viewed under daylight-mimicking optical clarity.",
      },
      {
        room: "Private Royal Bridal Fitting Chambers (x3)",
        area: "1,200 sq.ft",
        image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Acoustic silk velvet upholstered wall panels for complete privacy",
          "Tri-fold full-length mirrors with customizable light temperature controls",
          "Dedicated family seating lounge with champagne service bar",
        ],
        description:
          "Ultra-private suites designed for high-profile bridal trials, ensuring absolute discretion, luxury comfort, and flawless styling ergonomics.",
      },
      {
        room: "High-Jewellery Vault & Consultation Salon",
        area: "900 sq.ft",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Reinforced biometric security access with concealed vaults",
          "Custom hand-buffed brass vitrines with anti-reflective optical glass",
          "Rosewood millwork lined with emerald green velvet display drawers",
        ],
        description:
          "A secure, intimate salon tailored for displaying polki, diamond, and heirloom bridal jewellery under precision micro-beam spotlights.",
      },
      {
        room: "VIP Hospitality Lounge & Champagne Bar",
        area: "600 sq.ft",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Monolithic green Onyx bar counter with back-lit stone illumination",
          "Curved velvet banquettes and bespoke brass cocktail tables",
          "Curated collection of modern Indian contemporary art",
        ],
        description:
          "A welcoming reception lounge where clients and their families enjoy personalized consultations in quiet luxury.",
      },
    ],
  },
  "residence-nocturne": {
    coordinates: "19.006° N, 72.815° E",
    elevation: "185m High-Altitude Penthouse",
    architecturalStyle: "Ultra-Luxury Atmospheric Modernism",
    leadArchitect: "Ar. Vikram Singhania & Decorex Mumbai Atelier",
    duration: "14 Months",
    vastuCompliance: "Custom Vastu-Aligned Sea-Facing Layout",
    clientQuote: {
      quote:
        "The drama of our Worli penthouse at dusk is unmatched. Decorex balanced the breathtaking sea views with warm, moody interior finishes and world-class home automation.",
      client: "Gautam & Tara Ruia",
      role: "Penthouse Patrons",
    },
    spatialHighlights: [
      {
        room: "Arabian Sea Great Salon & Hearth",
        area: "2,200 sq.ft",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Triple-glazed acoustic glass wall with uninterrupted 180° sea views",
          "Sculptural double-sided bio-fuel fireplace in bookmatched Nero Marquina",
          "Integrated Dolby Atmos concealed architectural sound system",
        ],
        description:
          "The main entertaining space combines soaring ceilings with moody dark timber paneling and warm bronze accents, reflecting the twilight skyline.",
      },
      {
        room: "Cantilevered Sky Terrace & Plunge Pool",
        area: "1,500 sq.ft",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Glass-walled cantilevered heated plunge pool extending over the facade",
          "Automated wind-shield glass louvers with climate sensors",
          "Outdoor lounge with custom teak furniture and weather-sealed bar",
        ],
        description:
          "An open-air aerie high above Worli Sea Face, offering year-round outdoor entertaining shielded from high-altitude coastal gusts.",
      },
      {
        room: "Primary Suite & Dual Walk-In Wardrobes",
        area: "1,700 sq.ft",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Custom Italian leather-clad headboard wall with integrated nightstands",
          "Dual humidity-controlled couture walk-in closets with glass displays",
          "Spa bathroom with panoramic sea-facing freestanding stone bathtub",
        ],
        description:
          "A serene sanctuary positioned to catch morning light and peaceful ocean waves while remaining completely shielded from urban noise.",
      },
      {
        room: "Private Screening Room & Cigar Lounge",
        area: "1,400 sq.ft",
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Acoustically isolated room-within-a-room construction with 4K laser projector",
          "Reclining motorized Italian leather loungers with built-in tray tables",
          "Custom Spanish cedar humidor with precision climate controls",
        ],
        description:
          "An exclusive entertainment retreat designed for cinematic viewing and private conversation with bespoke ventilation.",
      },
    ],
  },
  "palazzo-al-mare": {
    coordinates: "15.590° N, 73.773° E",
    elevation: "32m Tropical Ridge",
    architecturalStyle: "Heritage Indo-Portuguese Estate Restoration",
    leadArchitect: "Ar. Ananya Deshmukh & Decorex Goa Atelier",
    duration: "20 Months",
    vastuCompliance: "Traditional Tropical Courtyard Alignment",
    clientQuote: {
      quote:
        "Decorex honored the historical Portuguese soul of our Assagao property while introducing modern luxury, a sublime subterranean spa, and stunning landscaped courtyards.",
      client: "Siddharth Goenka",
      role: "Estate Founder & Host",
    },
    spatialHighlights: [
      {
        room: "Restored Portuguese Sala Grande & Courtyard",
        area: "3,500 sq.ft",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Original 19th-century exposed laterite stone arches with lime wash",
          "Handmade Goan patterned cement encaustic floor tiles",
          "Central courtyard with antique stone fountain and flowering frangipani",
        ],
        description:
          "The grand living hall anchors the heritage estate, naturally ventilated with high timber truss ceilings and breezy deep verandahs.",
      },
      {
        room: "Subterranean Wellness Spa & Plunge Pool",
        area: "2,800 sq.ft",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Heated mineral plunge pool carved into the bedrock",
          "Ayurvedic massage chambers with hand-carved copper tubs",
          "Diffuse skylights filtered through tropical foliage above",
        ],
        description:
          "A peaceful subterranean wellness retreat offering complete sensory relaxation and holistic Ayurvedic treatments.",
      },
      {
        room: "Verandah Suites & Garden Terraces",
        area: "4,200 sq.ft",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Four independent guest suites with private garden sit-outs",
          "Four-poster antique teak beds dressed in pure organic cotton",
          "Ensuite semi-open tropical bathrooms with rain showers",
        ],
        description:
          "Surrounded by old mango trees and lush flora, each suite provides privacy and immersion in Goan heritage.",
      },
      {
        room: "Alfresco Dining Pavilion & Woodfire Kitchen",
        area: "4,500 sq.ft",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "20-seater monolithic teak dining table under a terracotta tiled roof",
          "Custom artisanal wood-fired pizza oven and tandoor grill station",
          "Overlooking the emerald swimming pool and manicured lawns",
        ],
        description:
          "The centerpiece for tropical celebrations and farm-to-table dining amidst the tranquil Goa breeze.",
      },
    ],
  },
  "maison-lumina": {
    coordinates: "17.432° N, 78.407° E",
    elevation: "530m Deccan Plateau",
    architecturalStyle: "Contemporary Brutalist & Minimalist Courtyard Living",
    leadArchitect: "Ar. Kabir Reddy & Decorex Hyderabad Atelier",
    duration: "16 Months",
    vastuCompliance: "Vastu-Engineered Central Brahmasthan Courtyard",
    clientQuote: {
      quote:
        "In Hyderabad's dry heat, our home feels like a calm oasis. The central courtyard, stone jaali screens, and water body naturally cool the entire house while giving us privacy.",
      client: "Arvind & Maya Kirloskar",
      role: "Private Residence Patrons",
    },
    spatialHighlights: [
      {
        room: "Central Brahmasthan Water Courtyard",
        area: "2,200 sq.ft",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Reflective black granite water body with floating lotus blooms",
          "Perforated stone jaali screens creating shifting daylight patterns",
          "Open-to-sky courtyard providing passive stack-effect cooling",
        ],
        description:
          "Drawing inspiration from traditional Indian havelis, this open central courtyard cools the living spaces naturally while acting as the spiritual center of the residence.",
      },
      {
        room: "Great Living Pavilion & Art Gallery",
        area: "2,600 sq.ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Seamless polished mirror Kota stone terrazzo flooring",
          "12-meter continuous blackened Sagwan timber wall with concealed doors",
          "Curated lighting choreography showcasing contemporary Indian sculptures",
        ],
        description:
          "A generous gallery space framed by floor-to-ceiling glass on both sides, looking into the lotus courtyard and the private rear forest garden.",
      },
      {
        room: "Primary Suite & Enclosed Zen Garden",
        area: "1,600 sq.ft",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Private glass-enclosed bamboo and stone garden accessible only from the suite",
          "Custom low-profile platform bed in natural Indian walnut",
          "Monolithic granite bathroom with freestanding stone soaking tub",
        ],
        description:
          "A private, meditative haven designed for rest and contemplative reading, completely insulated from the city.",
      },
      {
        room: "Upper Sunset Terrace & Outdoor Fireplace",
        area: "1,400 sq.ft",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
        highlights: [
          "Sweeping panoramic views of Jubilee Hills rocky ridge line",
          "Hand-crafted outdoor brass fireplace and built-in stone lounge seating",
          "Trellised pergola covered in fragrant Indian night-blooming jasmine (Raat ki Rani)",
        ],
        description:
          "The upper terrace catches evening breezes, ideal for family tea at dusk or starry night gatherings.",
      },
    ],
  },
};

const DEFAULT_INDIAN_EXTRAS: ProjectEnrichment = {
  coordinates: "19.076° N, 72.877° E",
  elevation: "15m Urban Coastal",
  architecturalStyle: "Bespoke Contemporary Indian Architecture",
  leadArchitect: "Decorex Atelier India",
  duration: "16 Months",
  vastuCompliance: "100% Vastu-Harmonized Spatial Layout",
  clientQuote: {
    quote:
      "Decorex transformed our residence into a timeless architectural masterpiece with unparalleled craftsmanship and attention to detail.",
    client: "Distinguished Private Client",
    role: "Residence Patron",
  },
  spatialHighlights: [
    {
      room: "Grand Living Pavilion",
      area: "2,400 sq.ft",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      highlights: [
        "Floor-to-ceiling glass facade with thermal protection",
        "Handcrafted natural stone feature walls",
        "Custom luxury lounge arrangement",
      ],
      description: "Generous high-ceiling space designed for family comfort and grand entertaining.",
    },
    {
      room: "Primary Suite Sanctuary",
      area: "1,500 sq.ft",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      highlights: [
        "Custom timber joinery and acoustic wall panelling",
        "Walk-in dressing room with sensor illumination",
        "Spa bathroom with natural stone finishes",
      ],
      description: "Secluded master quarter offering peaceful rest and garden views.",
    },
  ],
};

interface PortfolioDetailClientProps {
  project: Project;
  allProjects: Project[];
  relatedProjects: Project[];
}

export default function PortfolioDetailClient({
  project,
  allProjects,
  relatedProjects,
}: PortfolioDetailClientProps) {
  const extras = INDIAN_PROJECT_EXTRAS[project.slug] || DEFAULT_INDIAN_EXTRAS;

  // Next / Previous Project Index calculation
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  // Gallery images combined
  const allImages = [
    { src: project.heroImage, label: `${project.title} — Main Architectural Elevation`, tag: "Exteriors & Facade" },
    { src: project.overviewImage, label: `${project.title} — Spatial Atmosphere & Volume`, tag: "Living & Salon" },
    ...project.detailImages.map((img, i) => ({
      src: img,
      label: `${project.title} — Perspective Plate 0${i + 1}`,
      tag: i % 2 === 0 ? "Bespoke Suites" : "Details & Craft",
    })),
  ];

  // State
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>("All");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Project link copied to clipboard");
    }
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevLightboxImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const filteredGallery =
    galleryFilter === "All"
      ? allImages
      : allImages.filter((img) => img.tag === galleryFilter);

  const galleryTags = ["All", ...Array.from(new Set(allImages.map((img) => img.tag)))];

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] min-h-screen selection:bg-[#B79A70] selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#242522] text-[#F7F5F0] border border-[#B79A70]/60 px-5 py-3 rounded-none shadow-2xl flex items-center space-x-3 backdrop-blur-md animate-fade-in text-sm font-mono tracking-wider">
          <Sparkles className="w-4 h-4 text-[#B79A70] animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subtle Architectural Grid Lines on Light Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="light-arch-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#242522" strokeWidth="0.6" />
              <path d="M 50 0 L 50 100 M 0 50 L 100 50" fill="none" stroke="#242522" strokeWidth="0.25" strokeDasharray="3 5" />
              <circle cx="50" cy="50" r="1.5" fill="#B79A70" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#light-arch-grid)" />
        </svg>
      </div>

      {/* Page Banner with Project Image & Breadcrumbs (Standard across all pages) */}
      <PageBanner
        title={project.title}
        subtitle={`${project.subtitle} — ${project.location} (${project.year})`}
        imageSrc={project.heroImage}
        imageAlt={project.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
      />

      {/* Return to Archive & Quick Action Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#242522]/10">
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#77766F] hover:text-[#B79A70] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Archive</span>
          </Link>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-[#F2EFE9] border border-[#242522]/15 text-sm font-mono uppercase tracking-wider text-[#242522] transition-all hover:border-[#B79A70] shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>Share Space</span>
            </button>

            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-[#F2EFE9] border border-[#242522]/15 text-sm font-mono uppercase tracking-wider text-[#242522] transition-all hover:border-[#B79A70] shadow-sm"
            >
              <Camera className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>{allImages.length} Plates</span>
            </button>

            <Link
              href="/consultation"
              className="inline-flex items-center space-x-2 px-5 py-2 bg-[#B79A70] hover:bg-[#242522] text-white text-sm font-semibold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Project Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-6">
          <span className="px-3.5 py-1.5 text-sm font-mono uppercase tracking-[0.25em] bg-[#B79A70] text-white font-semibold shadow-sm">
            {project.category}
          </span>
          <span className="px-3.5 py-1.5 text-sm font-mono uppercase tracking-[0.2em] bg-white text-[#242522] border border-[#242522]/10 flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#B79A70]" />
            {project.location}
          </span>
          <span className="px-3.5 py-1.5 text-sm font-mono uppercase tracking-[0.2em] bg-white text-[#242522] border border-[#242522]/10 flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#B79A70]" />
            Handover {project.year}
          </span>
          <span className="px-3.5 py-1.5 text-sm font-mono uppercase tracking-[0.2em] bg-white text-[#8A7045] border border-[#B79A70]/40 flex items-center gap-1.5 shadow-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#B79A70]" />
            {extras.vastuCompliance}
          </span>
        </div>
      </div>

      {/* ARCHITECTURAL METRIC SPECIFICATION MATRIX (INCREASED TEXT SIZE) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 border border-[#B79A70]/30 py-8 px-6 sm:px-8 bg-white shadow-md">
          {/* 1. Built-Up Area */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Built-Up Area
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {project.area}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              Gross Footprint
            </span>
          </div>

          {/* 2. Typology */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Typology
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {project.category}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              Bespoke Commission
            </span>
          </div>

          {/* 3. Location */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Location
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {project.location.split(",")[0]}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              {project.location.split(",")[1]?.trim() || "India"}
            </span>
          </div>

          {/* 4. Completion */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Completion
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {project.year}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              Commission Handover
            </span>
          </div>

          {/* 5. Execution Timeline */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Execution Timeline
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {extras.duration}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              Turnkey Delivery
            </span>
          </div>

          {/* 6. Architectural Lead */}
          <div className="space-y-1.5">
            <span className="text-sm sm:text-[13px] font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold block">
              Architectural Lead
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#242522] font-normal leading-tight">
              {extras.leadArchitect.split("&")[0]?.trim() || "Decorex"}
            </p>
            <span className="text-sm text-[#77766F] font-mono block">
              Decorex Atelier
            </span>
          </div>
        </div>
      </section>

      {/* EDITORIAL NARRATIVE & QUOTE SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Atmospheric Lead Quote & Scope Checklist */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative pl-8 border-l-2 border-[#B79A70] py-2">
              <span className="text-5xl font-serif text-[#B79A70]/40 absolute -top-4 -left-3 select-none pointer-events-none">
                “
              </span>
              <blockquote className="font-serif text-2xl sm:text-3xl italic text-[#242522] font-light leading-relaxed">
                {project.quote}
              </blockquote>
              <div className="mt-4 flex items-center space-x-3 text-sm font-mono text-[#77766F] uppercase tracking-wider">
                <span className="w-5 h-[1px] bg-[#B79A70]" />
                <span>{extras.leadArchitect}</span>
              </div>
            </div>

            {/* Delivered Scope */}
            <div className="bg-white border border-[#242522]/10 p-8 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#B79A70]" />
                <h3 className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold">
                  Delivered Commission Scope
                </h3>
              </div>

              <ul className="space-y-4">
                {project.scope.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 text-sm text-[#242522] font-normal pb-3 border-b border-[#242522]/5 last:border-0 last:pb-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Architectural Story & Spatial Realization (Single Card & Single Paragraph) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#242522]/10 p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-none bg-[#F7F5F0] border border-[#242522]/10 flex items-center justify-center text-[#B79A70]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                    Architectural Story &amp; Realization
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#242522]">
                    The Spatial Architecture
                  </h2>
                </div>
              </div>
              <p className="text-[#3A3935] font-light leading-relaxed text-base sm:text-lg">
                {project.challenge} {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IN-DEPTH ROOM-BY-ROOM SPATIAL DETAILS (IMAGES & DETAILED INFO) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#242522]/10 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-[0.3em] text-[#B79A70] mb-2 font-semibold">
              <Building2 className="w-4 h-4" />
              <span>Spatial Architecture &amp; Room Details</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242522]">
              Curated Living Sectors &amp; Interior Specifications
            </h2>
          </div>
          <p className="text-sm font-mono text-[#77766F] max-w-md">
            Detailed breakdown of individual architectural zones, spatial dimensions, custom millwork, and lighting design.
          </p>
        </div>

        {/* Room Detail Cards with High-Res Photos */}
        <div className="space-y-12">
          {extras.spatialHighlights.map((zone, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#242522]/10 p-6 sm:p-10 shadow-md"
              >
                {/* Image Side */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 group cursor-pointer shadow-sm ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                  onClick={() => openLightbox(0)}
                >
                  <Image
                    src={zone.image}
                    alt={zone.room}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-sm font-mono text-[#242522] border border-[#242522]/10 shadow-sm font-medium">
                    SECTOR 0{idx + 1} // {zone.area}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 text-sm font-mono text-[#242522] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-[#B79A70]" />
                    <span>Expand Plate</span>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono text-[#B79A70] uppercase tracking-[0.25em] font-semibold">
                      0{idx + 1} • {zone.area}
                    </span>
                    <span className="w-6 h-[1px] bg-[#B79A70]" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#242522] font-normal leading-snug">
                    {zone.room}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5A5952] font-light leading-relaxed">
                    {zone.description}
                  </p>

                  <div className="pt-3 border-t border-[#242522]/10 space-y-2">
                    <span className="text-sm font-mono uppercase tracking-widest text-[#B79A70] font-semibold block mb-2">
                      Key Architectural Specifications:
                    </span>
                    <ul className="space-y-2">
                      {zone.highlights.map((h, i) => (
                        <li key={i} className="flex items-start space-x-2.5 text-sm text-[#242522] font-normal">
                          <Check className="w-3.5 h-3.5 text-[#B79A70] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CURATED ASYMMETRIC VISUAL ARCHIVE / GALLERY WITH LIGHTBOX */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#242522]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-[0.3em] text-[#B79A70] mb-2 font-semibold">
              <Camera className="w-4 h-4" />
              <span>Full Visual Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#242522]">
              Architectural Perspectives &amp; High-Res Plates
            </h2>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {galleryTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setGalleryFilter(tag)}
                className={`px-3 py-1.5 text-sm font-mono uppercase tracking-wider transition-all border ${
                  galleryFilter === tag
                    ? "bg-[#B79A70] text-white border-[#B79A70] font-semibold"
                    : "bg-white text-[#242522] border-[#242522]/15 hover:border-[#B79A70]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredGallery.map((img, idx) => {
            const isWide = idx % 3 === 0;
            const spanClass = isWide ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5]";

            return (
              <div
                key={idx}
                onClick={() => openLightbox(allImages.indexOf(img))}
                className={`${spanClass} relative overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-md group cursor-pointer`}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-[#242522] border border-[#242522]/10 shadow-sm font-medium">
                  {img.tag} // PLATE 0{idx + 1}
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-serif text-white">{img.label}</span>
                  <div className="w-8 h-8 rounded-full bg-[#B79A70] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLIENT ACCOLADE / PATRON TESTIMONIAL CARD */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-white border border-[#B79A70]/40 p-8 sm:p-14 shadow-md relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center space-x-1.5 text-[#B79A70]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B79A70]" />
              ))}
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-[#242522] font-light leading-snug">
              “{extras.clientQuote.quote}”
            </blockquote>

            <div className="space-y-1">
              <p className="font-serif text-xl text-[#9E8055] font-medium">
                {extras.clientQuote.client}
              </p>
              <p className="text-sm font-mono text-[#77766F] uppercase tracking-widest">
                {extras.clientQuote.role} • {project.location}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center space-x-2 text-sm font-mono text-[#77766F]">
              <ShieldCheck className="w-4 h-4 text-[#B79A70]" />
              <span>Verified Private Atelier Commission</span>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIOUS & NEXT PROJECT DUAL SHOWCASE CAROUSEL */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#242522]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] block font-semibold">
              Continuous Portfolio Navigation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#242522]">
              Discover Next Commissions
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-mono uppercase tracking-widest text-[#B79A70] hover:underline flex items-center space-x-1"
          >
            <span>Complete Archive ({allProjects.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Previous Project Card */}
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="group block relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-lg"
          >
            <Image
              src={prevProject.heroImage}
              alt={prevProject.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute top-6 left-6 flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70]">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Commission</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-sm font-mono uppercase tracking-widest text-[#E9E2D7] block mb-1">
                {prevProject.category} // {prevProject.location}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#B79A70] transition-colors">
                {prevProject.title}
              </h3>
            </div>
          </Link>

          {/* Next Project Card */}
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group block relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-lg"
          >
            <Image
              src={nextProject.heroImage}
              alt={nextProject.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute top-6 right-6 flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70]">
              <span>Next Commission</span>
              <ChevronRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-sm font-mono uppercase tracking-widest text-[#E9E2D7] block mb-1">
                {nextProject.category} // {nextProject.location}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#B79A70] transition-colors">
                {nextProject.title}
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* LUXURY COMMISSION BANNER CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-8">
        <div className="p-10 sm:p-16 bg-[#242522] border border-[#B79A70]/40 text-[#F7F5F0] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#B79A70] flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Spatial Commission</span>
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Envisioning an architectural residence of this caliber?
            </h3>
            <p className="text-sm text-[#A0A09B] font-light leading-relaxed">
              We guide discerning clients from initial architectural feasibility and Vastu harmonization to white-glove turnkey completion across India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/consultation"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B79A70] text-[#242522] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl group"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-4 border border-white/20 text-sm font-mono uppercase tracking-widest text-[#E9E2D7] hover:border-[#B79A70] hover:text-[#B79A70] transition-all"
            >
              All Works
            </Link>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between text-sm font-mono uppercase tracking-widest text-white/80 pb-4 border-b border-white/10 z-10">
            <div className="flex items-center space-x-3">
              <span className="text-[#B79A70] font-semibold">
                PLATE {String(activeImageIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
              </span>
              <span className="text-white/40">//</span>
              <span className="truncate max-w-[200px] sm:max-w-md">{allImages[activeImageIndex].label}</span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 border border-white/20 hover:border-[#B79A70] text-white hover:text-[#B79A70] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-h-[82vh] max-w-[90vw]">
              <Image
                src={allImages[activeImageIndex].src}
                alt={allImages[activeImageIndex].label}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Previous Chevron */}
            <button
              type="button"
              onClick={prevLightboxImage}
              className="absolute left-2 sm:left-6 p-3 bg-black/60 hover:bg-[#B79A70] hover:text-[#141614] text-white border border-white/20 transition-all rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Chevron */}
            <button
              type="button"
              onClick={nextLightboxImage}
              className="absolute right-2 sm:right-6 p-3 bg-black/60 hover:bg-[#B79A70] hover:text-[#141614] text-white border border-white/20 transition-all rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Bar with Thumbnails */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center space-x-3 overflow-x-auto py-2 z-10">
            {allImages.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 overflow-hidden border shrink-0 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#B79A70] scale-110"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumb.src}
                  alt={thumb.label}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
