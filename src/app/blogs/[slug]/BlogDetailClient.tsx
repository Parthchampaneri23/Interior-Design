"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  Send,
  User,
  Mail,
  Phone,
  Check,
  Lightbulb,
  Building2,
  ListOrdered,
  BookOpen,
  ChevronRight,
  AlignLeft,
  MapPin,
  Compass,
  Navigation2,
  Volume2,
  VolumeX,
  Sliders,
  Layers,
  ExternalLink,
  Globe,
  Maximize2,
  X,
} from "lucide-react";
import type { BlogPost } from "@/data/siteData";
import PageBanner from "@/components/PageBanner";

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  allPosts: BlogPost[];
}



const MATERIAL_PALETTE = [
  {
    name: "Roman Unfilled Travertine",
    finish: "Honed Matte Patina",
    color: "#D8CDBF",
    origin: "Tivoli, Italy",
    notes: "Thermal inertia balances humid maritime air; absorbs ambient sunlight without harsh glare.",
  },
  {
    name: "Burnished Brushed Brass",
    finish: "Hand-Rubbed Micro Wax",
    color: "#B79A70",
    origin: "Jaipur, Rajasthan",
    notes: "Living metallic alloy that oxidizes with noble grace across decades of human touch.",
  },
  {
    name: "Smoked Maritime Teak",
    finish: "Organic Danish Oil",
    color: "#3F3227",
    origin: "Central Province, India",
    notes: "Seasoned 18 months for zero warp in coastal climates with deep natural tactile grain.",
  },
  {
    name: "Artisanal Slaked Lime",
    finish: "Hand-Troweled Stucco",
    color: "#EFECE4",
    origin: "Jodhpur, Rajasthan",
    notes: "Breathable mineral plaster that purifies indoor air and diffuses soft circadian shadows.",
  },
];

export default function BlogDetailClient({
  post,
  relatedPosts,
  allPosts,
}: BlogDetailClientProps) {
  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("abstract");
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(52);
  const [isMobileIndexOpen, setIsMobileIndexOpen] = useState(false);

  // Reader customization: Font size adjuster
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");

  // Audio briefing preview simulator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);

  // Inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    typology: "Turnkey Luxury Residential",
    cityLocation: "Mumbai / Alibaug",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Audio memo timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Scroll reading progress & active section spy
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }

      // Detect active article section
      const sectionIds = [
        "abstract",
        "hero-visual",
        "narrative",
        "materiality",
        "takeaways",
        "studio-map",
        "author",
        "inquiry-form",
      ];
      const scrollPos = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      setBookmarkCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please provide your name and email address.");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  // Section Table of Contents items
  const tableOfContents = [
    { id: "abstract", label: "Editorial Thesis" },
    { id: "hero-visual", label: "Visual Archive" },
    { id: "narrative", label: "Spatial Narrative" },
    { id: "materiality", label: "Materiality Matrix" },
    { id: "takeaways", label: "Design Principles" },
    { id: "studio-map", label: "Atelier Geolocation" },
    { id: "author", label: "Principal Profile" },
    { id: "inquiry-form", label: "Consultation Suite" },
  ];

  // Find previous and next articles
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-28 min-h-screen relative selection:bg-[#B79A70] selection:text-white">
      {/* 1. SLIM GOLDEN READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#B79A70] via-[#D4AF37] to-[#B79A70] transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. PAGE BANNER WITH BLOG COVER, BREADCRUMBS & TITLE */}
      <PageBanner
        title={post.title}
        subtitle={`${post.category} • Published ${post.date} • ${post.readTime}`}
        imageSrc={post.coverImage}
        imageAlt={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: post.title },
        ]}
      />

      {/* 3. EDITORIAL COMMAND BAR: BACK, STATS, FONT-SIZER, BOOKMARK & SHARE */}
      <div className="max-w-[1560px] mx-auto px-5 md:px-8 lg:px-12 pt-7 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#242522]/10">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-[0.2em] text-[#77766F] hover:text-[#B79A70] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Studio Blog Archive</span>
          </Link>

          {/* Mobile / Tablet Outline Drawer Toggle */}
          <div className="lg:hidden flex items-center text-sm font-mono">
            <button
              type="button"
              onClick={() => setIsMobileIndexOpen(!isMobileIndexOpen)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#242522]/15 text-[#242522] shadow-sm hover:border-[#B79A70]"
            >
              <ListOrdered className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>Article Outline</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Collapsible Outline Drawer */}
        {isMobileIndexOpen && (
          <div className="lg:hidden mt-4 p-5 bg-white border border-[#242522]/15 shadow-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#242522]/10">
              <span className="text-sm font-mono uppercase tracking-widest text-[#B79A70] font-semibold flex items-center space-x-2">
                <ListOrdered className="w-4 h-4" />
                <span>Article Outline</span>
              </span>
              <button
                type="button"
                onClick={() => setIsMobileIndexOpen(false)}
                className="text-[#77766F] hover:text-[#242522] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Outline */}
            <div className="space-y-2">
              {tableOfContents.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileIndexOpen(false)}
                  className="flex items-center justify-between text-sm py-2 px-3 bg-[#F7F5F0] text-[#242522] hover:text-[#B79A70] truncate border border-transparent hover:border-[#B79A70]/30 transition-colors"
                >
                  <span className="flex items-center space-x-2 truncate">
                    <span className="font-mono text-sm text-[#B79A70] font-semibold">0{idx + 1}.</span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#77766F]" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. ASYMMETRIC 3-WING LUXURY ARCHITECTURAL GRID */}
      {/* LEFT WING: BLOG INDEX & OUTLINE (Col 1-3) | CENTER: EDITORIAL ARTICLE (Col 4-8) | RIGHT: INTERACTIVE MAP & INQUIRY (Col 9-12) */}
      <main className="max-w-[1560px] mx-auto px-5 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* ========================================================================= */}
          {/* LEFT WING (Cols 1-3): STICKY BLOG INDEX & INTERACTIVE ARTICLE OUTLINE     */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 self-start">
            {/* Widget 1: Reading HUD & Progress Bar */}
            <div className="p-4 bg-white border border-[#242522]/10 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#77766F]">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B79A70]" />
                  <span>Reading Progress</span>
                </span>
                <span className="text-[#B79A70] font-bold">{Math.round(readingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F7F5F0] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B79A70] to-[#D4AF37] transition-all duration-150"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#77766F] pt-1 border-t border-[#242522]/5">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Widget 2: Article Table of Contents (Scroll-Spy) with Increased Font Size */}
            <div className="p-6 bg-white border border-[#242522]/10 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#242522]/10">
                <span className="flex items-center space-x-2.5 text-sm font-mono uppercase tracking-[0.22em] text-[#B79A70] font-bold">
                  <ListOrdered className="w-4 h-4 text-[#B79A70]" />
                  <span>Article Outline</span>
                </span>
                <span className="text-sm font-mono px-2.5 py-0.5 bg-[#F7F5F0] text-[#77766F] border border-[#242522]/10 font-medium">
                  {tableOfContents.length} Sections
                </span>
              </div>

              <nav className="space-y-2">
                {tableOfContents.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`group flex items-center justify-between py-3 px-3.5 text-sm sm:text-base transition-all border-l-[3px] rounded-r-sm ${
                        isActive
                          ? "border-[#B79A70] bg-[#F7F5F0] text-[#242522] font-semibold shadow-xs"
                          : "border-transparent text-[#5A5952] hover:text-[#242522] hover:border-[#B79A70]/50 hover:bg-[#F7F5F0]/60"
                      }`}
                    >
                      <span className="flex items-center space-x-3 truncate">
                        <span
                          className={`font-mono text-sm font-bold transition-colors ${
                            isActive
                              ? "text-[#B79A70]"
                              : "text-[#77766F] group-hover:text-[#B79A70]"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="truncate text-sm sm:text-base font-normal tracking-wide leading-snug">
                          {item.label}
                        </span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? "text-[#B79A70] translate-x-0.5"
                            : "text-transparent group-hover:text-[#B79A70]/50"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* CENTER WING (Cols 4-8): ARCHITECTURAL EDITORIAL ARTICLE SANCTUM           */}
          {/* ========================================================================= */}
          <article className="lg:col-span-5 xl:col-span-6 space-y-10">
            {/* Audio Narrative Simulator Bar */}
            <div className="p-4 bg-white border border-[#242522]/10 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isPlayingAudio
                      ? "bg-[#B79A70] text-white animate-pulse"
                      : "bg-[#242522] text-white hover:bg-[#B79A70]"
                  }`}
                  title={isPlayingAudio ? "Pause Audio Summary" : "Play Audio Summary"}
                >
                  {isPlayingAudio ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className="text-sm font-mono uppercase tracking-wider text-[#242522] font-semibold truncate">
                    {isPlayingAudio ? "Playing Atelier Audio Briefing..." : "Architectural Audio Briefing"}
                  </p>
                  <p className="text-[10px] font-mono text-[#77766F]">
                    {isPlayingAudio ? `${Math.round(audioProgress)}% played • 4:12 total` : "Narrated by Decorex Studio • 4 min"}
                  </p>
                </div>
              </div>

              {/* Mini Audio Equalizer Bar */}
              <div className="hidden sm:flex items-center space-x-1 h-5">
                {[40, 75, 55, 90, 60, 85, 45, 70].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio ? "bg-[#B79A70] animate-pulse" : "bg-[#242522]/20"
                    }`}
                    style={{ height: isPlayingAudio ? `${h}%` : "30%" }}
                  />
                ))}
              </div>
            </div>

            {/* Editorial Thesis / Abstract */}
            <div id="abstract" className="space-y-4 scroll-mt-36">
              <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Editorial Thesis // {post.category}</span>
              </div>
              <blockquote className="font-serif text-2xl sm:text-3xl text-[#242522] font-light leading-relaxed italic border-l-2 border-[#B79A70] pl-6 sm:pl-8 py-2 bg-white/60 shadow-sm">
                &ldquo;{post.excerpt}&rdquo;
              </blockquote>
            </div>

            {/* Author Byline Bar */}
            <div className="flex items-center justify-between p-4 bg-white border border-[#242522]/10 shadow-sm">
              <div className="flex items-center space-x-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#E9E2D7] border border-[#B79A70]/30 shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#242522] flex items-center space-x-2">
                    <span>{post.author.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#B79A70]/15 text-[#B79A70] font-normal">
                      Verified Principal
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#77766F] font-mono">{post.author.role}</p>
                </div>
              </div>

              <div className="text-right text-sm font-mono text-[#77766F] hidden sm:block">
                <p>{post.date}</p>
                <p className="text-[#B79A70] font-semibold">{post.readTime}</p>
              </div>
            </div>

            {/* 4K Hero Visual Showcase */}
            <div
              id="hero-visual"
              className="relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-xl group scroll-mt-36"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-mono uppercase tracking-wider backdrop-blur-md bg-black/40 px-4 py-2.5 border border-white/10">
                <span className="truncate flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5 text-[#B79A70]" />
                  <span>{post.title}</span>
                </span>
                <span className="text-[#B79A70] font-bold shrink-0 ml-3">Decorex Archive</span>
              </div>
            </div>

            {/* Core Architectural Narrative with Dynamic Font Sizing */}
            <div
              id="narrative"
              className={`space-y-6 text-[#3A3935] font-light leading-relaxed scroll-mt-36 ${
                fontSize === "normal"
                  ? "text-base sm:text-lg"
                  : fontSize === "large"
                  ? "text-lg sm:text-xl"
                  : "text-xl sm:text-2xl"
              }`}
            >
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {idx === 0 ? (
                    <span className="float-left text-5xl sm:text-6xl font-serif text-[#B79A70] leading-none pr-3 pt-1 font-normal">
                      {paragraph.charAt(0)}
                    </span>
                  ) : null}
                  {idx === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>

            {/* Interactive Materiality & Tactile Palette Matrix (Unique Feature) */}
            <div id="materiality" className="p-6 sm:p-7 bg-white border border-[#242522]/10 shadow-sm space-y-4 scroll-mt-36">
              <div className="flex items-center justify-between pb-3 border-b border-[#242522]/10">
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>Tactile Materiality Matrix</span>
                </span>
                <span className="text-[10px] font-mono text-[#77766F]">
                  Click swatch for architectural notes
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MATERIAL_PALETTE.map((mat, idx) => {
                  const isSelected = selectedMaterial === idx;
                  return (
                    <button
                      key={mat.name}
                      type="button"
                      onClick={() => setSelectedMaterial(isSelected ? null : idx)}
                      className={`p-3 text-left border transition-all ${
                        isSelected
                          ? "border-[#B79A70] bg-[#F7F5F0] shadow-md ring-1 ring-[#B79A70]"
                          : "border-[#242522]/10 bg-white hover:border-[#B79A70]/50"
                      }`}
                    >
                      <div
                        className="w-full h-10 mb-2 border border-black/10 shadow-inner"
                        style={{ backgroundColor: mat.color }}
                      />
                      <p className="font-serif text-sm text-[#242522] font-semibold leading-tight line-clamp-1">
                        {mat.name}
                      </p>
                      <p className="text-[10px] font-mono text-[#77766F] mt-0.5">{mat.finish}</p>
                    </button>
                  );
                })}
              </div>

              {selectedMaterial !== null && (
                <div className="p-3.5 bg-[#F7F5F0] border border-[#B79A70]/30 text-sm text-[#242522] space-y-1 animate-fade-in">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#B79A70] uppercase font-bold">
                    <span>{MATERIAL_PALETTE[selectedMaterial].name}</span>
                    <span>Origin: {MATERIAL_PALETTE[selectedMaterial].origin}</span>
                  </div>
                  <p className="text-[#5A5952] leading-relaxed">
                    {MATERIAL_PALETTE[selectedMaterial].notes}
                  </p>
                </div>
              )}
            </div>

            {/* Architectural Key Takeaways Card */}
            <div id="takeaways" className="p-6 sm:p-8 bg-white border border-[#242522]/10 shadow-sm space-y-4 scroll-mt-36">
              <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                <Lightbulb className="w-4 h-4" />
                <span>Architectural Takeaways &amp; Spatial Insights:</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#3A3935]">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                  <span>
                    Prioritize tactile longevity over transient high-gloss aesthetics to allow raw materials to patina gracefully over generations.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                  <span>
                    Conceal illumination sources within architectural reveal channels for organic circadian shadow play and tranquil dusk transitions.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                  <span>
                    Incorporate Vastu energy axes and natural cross-ventilation corridors early in the civil restructuring and masonry layout phase.
                  </span>
                </li>
              </ul>
            </div>

            {/* Author Profile Footer Box */}
            <div id="author" className="p-7 bg-white border border-[#242522]/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left scroll-mt-36">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#E9E2D7] shrink-0 border border-[#B79A70]/40">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-serif text-xl text-[#242522]">{post.author.name}</h4>
                  <span className="text-[11px] font-mono text-[#B79A70] uppercase font-semibold">
                    {post.author.role}
                  </span>
                </div>
                <p className="text-sm text-[#5A5952] leading-relaxed">
                  Leading architectural theory, spatial narratives, and bespoke materiality research for Decorex Studio commissions across Mumbai, Alibaug, and Goa.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about-us"
                    className="inline-flex items-center space-x-1 text-sm font-mono uppercase tracking-widest text-[#B79A70] hover:text-[#242522] font-semibold"
                  >
                    <span>View Atelier Profile &amp; Leadership</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Next / Previous Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#242522]/10">
              {prevPost ? (
                <Link
                  href={`/blogs/${prevPost.slug}`}
                  className="p-5 bg-white border border-[#242522]/10 hover:border-[#B79A70] transition-colors group shadow-sm flex flex-col justify-between"
                >
                  <span className="text-sm font-mono uppercase text-[#77766F] group-hover:text-[#B79A70] flex items-center space-x-1">
                    <span>&larr; Previous Article</span>
                  </span>
                  <p className="font-serif text-base text-[#242522] group-hover:text-[#B79A70] transition-colors mt-2 line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div className="p-5 bg-white/40 border border-dashed border-[#242522]/10 text-[#77766F] text-sm font-mono flex items-center">
                  <span>First monograph in archive</span>
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blogs/${nextPost.slug}`}
                  className="p-5 bg-white border border-[#242522]/10 hover:border-[#B79A70] transition-colors group shadow-sm flex flex-col justify-between text-right"
                >
                  <span className="text-sm font-mono uppercase text-[#77766F] group-hover:text-[#B79A70] flex items-center justify-end space-x-1">
                    <span>Next Article &rarr;</span>
                  </span>
                  <p className="font-serif text-base text-[#242522] group-hover:text-[#B79A70] transition-colors mt-2 line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div className="p-5 bg-white/40 border border-dashed border-[#242522]/10 text-[#77766F] text-sm font-mono flex items-center justify-end">
                  <span>Latest monograph in archive</span>
                </div>
              )}
            </div>
          </article>

          {/* ========================================================================= */}
          {/* RIGHT WING (Cols 9-12): BESPOKE ATELIER GEOLOCATION MAP & INQUIRY SUITE   */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6 sticky top-24 self-start">


            {/* WIDGET 2: VIP PROJECT CONSULTATION & INQUIRY FORM */}
            <div id="inquiry-form" className="bg-white border border-[#242522]/15 shadow-xl p-5 sm:p-6 relative overflow-hidden scroll-mt-36">
              <div className="space-y-1 pb-4 border-b border-[#242522]/10 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Private Commission</span>
                </span>
                <h3 className="font-serif text-xl text-[#242522] font-normal leading-tight">
                  Discuss Your Space
                </h3>
                <p className="text-sm text-[#5A5952] leading-relaxed">
                  Connect with our principal architects for private consultations in Mumbai, Alibaug, Goa, or Delhi.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-6 text-center space-y-3 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-[#B79A70]/15 text-[#B79A70] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-[#242522]">Inquiry Dispatched</h4>
                  <p className="text-sm text-[#5A5952] leading-relaxed">
                    Thank you, <strong className="text-[#242522]">{formData.name}</strong>. Our managing partners will review your architectural briefing and contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        typology: "Turnkey Luxury Residential",
                        cityLocation: "Mumbai / Alibaug",
                        message: "",
                      });
                    }}
                    className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70] hover:underline pt-2 block mx-auto font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#77766F] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Vikram Singhania"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-[#F7F5F0]/60 border border-[#242522]/15 text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#77766F] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="vikram@estate.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-[#F7F5F0]/60 border border-[#242522]/15 text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-[#77766F] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+91 98200 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-[#F7F5F0]/60 border border-[#242522]/15 text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Typology Dropdown */}
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Service Typology
                    </label>
                    <select
                      value={formData.typology}
                      onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                      className="w-full px-2.5 py-2 text-sm font-mono bg-[#F7F5F0]/60 border border-[#242522]/15 text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white transition-all shadow-sm"
                    >
                      <option value="Turnkey Luxury Residential">Turnkey Luxury Residential</option>
                      <option value="Custom Millwork & Kitchens">Custom Millwork &amp; Kitchens</option>
                      <option value="Architectural Lighting & Ceiling">Architectural Lighting &amp; Ceiling</option>
                      <option value="Commercial & Hospitality">Commercial &amp; Hospitality</option>
                      <option value="Initial Feasibility Consultation">Initial Feasibility Consultation</option>
                    </select>
                  </div>

                  {/* Project Location / Scope */}
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Location &amp; Spatial Scale
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 6,500 sq.ft Villa in Alibaug or Penthouse in Mumbai..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 text-sm font-mono bg-[#F7F5F0]/60 border border-[#242522]/15 text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white transition-all shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3 bg-[#242522] hover:bg-[#B79A70] text-white text-[11px] font-mono uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center space-x-2 group disabled:opacity-60"
                  >
                    <span>{formSubmitting ? "Dispatching..." : "Send Private Inquiry"}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-[#77766F] text-center font-mono">
                    Strict NDA confidentiality assured.
                  </p>
                </form>
              )}
            </div>

            {/* WIDGET 3: ATELIER HOTLINE CONTACTS */}
            <div className="p-4 bg-white border border-[#242522]/10 shadow-sm space-y-2 text-sm font-mono">
              <span className="text-[10px] uppercase tracking-widest text-[#B79A70] font-semibold block">
                Direct Atelier Concierge:
              </span>
              <div className="space-y-1 text-[#5A5952]">
                <p>
                  <strong className="text-[#242522]">Inquiry:</strong> private@decorex.com
                </p>
                <p>
                  <strong className="text-[#242522]">Studio:</strong> +91 22 2490 8800
                </p>
                <p>
                  <strong className="text-[#242522]">Address:</strong> Worli Sea Face, Mumbai 400018
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 5. DEDICATED RELATED CURATED PERSPECTIVES SHOWCASE */}
      <section className="max-w-[1560px] mx-auto px-5 md:px-8 lg:px-12 pt-16 border-t border-[#242522]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Perspectives</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#242522] font-normal mt-1">
              Related Design &amp; Architecture Blogs
            </h2>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70] hover:text-[#242522] font-semibold shrink-0"
          >
            <span>Explore All Blogs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((rel) => (
            <article
              key={rel.id}
              className="group flex flex-col justify-between bg-white border border-[#242522]/10 p-6 shadow-sm hover:shadow-xl hover:border-[#B79A70]/50 transition-all duration-500"
            >
              <div>
                <Link
                  href={`/blogs/${rel.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] mb-5 shadow-sm"
                >
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#B79A70] font-semibold border border-[#242522]/10">
                    {rel.category}
                  </div>
                </Link>

                <div className="text-[11px] font-mono uppercase tracking-widest text-[#77766F] mb-2 flex items-center space-x-2">
                  <span>{rel.date}</span>
                  <span>•</span>
                  <span>{rel.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-[#242522] font-normal group-hover:text-[#B79A70] transition-colors leading-snug">
                  <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                </h3>

                <p className="text-sm text-[#5A5952] font-light leading-relaxed mt-2.5 line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#242522]/10 flex items-center justify-between">
                <span className="text-sm text-[#77766F] font-mono">By {rel.author.name}</span>
                <Link
                  href={`/blogs/${rel.slug}`}
                  className="text-sm font-mono uppercase tracking-widest text-[#B79A70] flex items-center space-x-1 group-hover:underline font-semibold"
                >
                  <span>Read Monograph</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
