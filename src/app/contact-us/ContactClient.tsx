"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
  Layers,
  Compass,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  Lock,
  ChevronDown,
  Calendar,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageBanner from "@/components/PageBanner";

const PROJECT_TYPOLOGIES = [
  "Turnkey Luxury Villa Estate",
  "Penthouse Spatial Architecture",
  "Custom Millwork & Modular Kitchens",
  "Architectural Lighting & Ceilings",
  "Heritage Villa Restoration (Goa / Alibaug)",
  "Boutique Commercial & Hospitality",
];

const FAQS = [
  {
    question: "What is the typical timeline from design concept to handover?",
    answer:
      "A turnkey bespoke residence generally spans 6 to 14 months depending on structural complexity, custom millwork, and civil scope. Concept design and 3D visualization take 4–6 weeks, followed by precise MEP and fabrication drawings before on-site execution begins.",
  },
  {
    question: "Do you undertake commissions outside Mumbai?",
    answer:
      "Yes. Our atelier regularly leads flagship residential commissions across Alibaug, North & South Goa, Delhi NCR, Hyderabad, Bangalore, and international client residences in Dubai and London.",
  },
  {
    question: "How is budget transparency and the BOQ locked?",
    answer:
      "We operate under a fixed milestone Bill of Quantities (BOQ) model. Every material, European fitting, and joinery component is pre-approved with zero hidden variations or surprise escalation clauses during construction.",
  },
  {
    question: "Can we schedule an on-site consultation at our property?",
    answer:
      "Certainly. Following an initial briefing call, our principal architects conduct private site evaluations for spatial orientation, daylight analysis, cross-ventilation, and Vastu feasibility.",
  },
];

export default function ContactClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    typology: PROJECT_TYPOLOGIES[0],
    budgetRange: "₹1.5 Cr – ₹3 Cr",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [protocolCode, setProtocolCode] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Left Contact Column Cards Stagger Animation
      gsap.fromTo(
        ".contact-card-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-cards-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Right Form Card Smooth Reveal Animation
      gsap.fromTo(
        ".contact-form-anim",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. The Decorex Standard / Hallmarks Stagger Animation
      gsap.fromTo(
        ".standard-badge-anim",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".standards-grid-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Map Container Floating Reveal Animation
      gsap.fromTo(
        ".map-container-anim",
        { opacity: 0, y: 45, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".map-container-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. FAQ Items Stagger Animation
      gsap.fromTo(
        ".faq-item-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      alert("Please provide your name and email address.");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setProtocolCode(`DCX-${Math.floor(100000 + Math.random() * 900000)}`);
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  return (
    <div ref={pageRef} className="w-full bg-[#FAF8F5] text-[#242522] selection:bg-[#B79A70] selection:text-white font-sans">
      {/* 1. TOP PAGE BANNER */}
      <PageBanner
        title="Contact Us"
        subtitle="Initiate a private spatial dialogue with our principal architects for turnkey luxury residences, bespoke penthouses, and heritage restorations."
        imageSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Decorex Architectural Interior Practice"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      {/* 2. MAIN SECTION: ATELIER DETAILS & CONSULTATION BRIEFING FORM */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STUDIO ATELIER & DIRECT CHANNELS             */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-10 contact-cards-container">
            {/* Header Badge */}
            <div className="space-y-4 contact-card-anim">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#B79A70]/10 border border-[#B79A70]/25 text-[#B79A70] text-xs font-mono uppercase tracking-[0.2em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Client Concierge</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#242522] font-normal leading-[1.12]">
                Initiate Your Spatial Commission
              </h2>

              <p className="text-sm text-[#5A5952] leading-relaxed font-light">
                Whether conceptualizing a coastal sanctuary in Alibaug, a sky penthouse along Worli Sea Face, or a heritage estate in Goa, our principal architects offer confidential private consultations.
              </p>
            </div>

            {/* Contact Detail Cards */}
            <div className="space-y-4">
              {/* 1. Flagship Atelier Card */}
              <div className="contact-card-anim p-6 bg-white border border-[#E8E2D8] rounded-2xl shadow-sm hover:shadow-md hover:border-[#B79A70]/40 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] shrink-0 group-hover:bg-[#B79A70] group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg text-[#242522] font-medium">Flagship Atelier</h4>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#B79A70] font-semibold bg-[#B79A70]/10 px-2.5 py-0.5 rounded-full">
                        Worli Sea Face
                      </span>
                    </div>
                    <p className="text-sm text-[#5A5952] leading-relaxed font-light">
                      Tower 4, Worli Sea Face Promenade, Mumbai, Maharashtra 400018
                    </p>
                    <div className="pt-1">
                      <a
                        href="https://maps.google.com/?q=Worli+Sea+Face+Promenade+Mumbai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#B79A70] hover:text-[#242522] font-medium transition-colors"
                      >
                        <span>View on Google Maps</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Direct Phone & Hours Card */}
              <div className="contact-card-anim p-6 bg-white border border-[#E8E2D8] rounded-2xl shadow-sm hover:shadow-md hover:border-[#B79A70]/40 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] shrink-0 group-hover:bg-[#B79A70] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg text-[#242522] font-medium">Direct Inquiries</h4>
                      <span className="flex items-center space-x-1 text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Mon – Sat: Open</span>
                      </span>
                    </div>
                    <a
                      href="tel:+912224908800"
                      className="text-base text-[#242522] hover:text-[#B79A70] transition-colors block font-mono font-medium"
                    >
                      +91 22 2490 8800
                    </a>
                    <p className="text-xs text-[#77766F] font-mono">
                      IST 10:00 – 19:30 • Dedicated Client Advisory
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Confidential Email & NDA Card */}
              <div className="contact-card-anim p-6 bg-white border border-[#E8E2D8] rounded-2xl shadow-sm hover:shadow-md hover:border-[#B79A70]/40 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] shrink-0 group-hover:bg-[#B79A70] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg text-[#242522] font-medium">Private Email</h4>
                      <span className="inline-flex items-center space-x-1 text-[10px] font-mono uppercase text-[#77766F] bg-neutral-100 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3 text-[#B79A70]" />
                        <span>NDA Protected</span>
                      </span>
                    </div>
                    <a
                      href="mailto:private@decorex.com"
                      className="text-base text-[#242522] hover:text-[#B79A70] transition-colors block font-mono font-medium"
                    >
                      private@decorex.com
                    </a>
                    <p className="text-xs text-[#77766F] font-mono">
                      Submissions reviewed exclusively by partners
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Dialogue Banner */}
            <div className="contact-card-anim p-6 bg-gradient-to-r from-[#20231F] to-[#2D332B] rounded-2xl text-white shadow-lg flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#B79A70]">
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant Messaging</span>
                </div>
                <p className="text-base font-serif font-medium">Chat via WhatsApp Business</p>
                <p className="text-xs text-white/70 font-light">Direct desk of Chief Design Coordinator</p>
              </div>

              <a
                href="https://wa.me/912224908800?text=Hello%20Decorex%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20private%20interior%20commission."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#B79A70] text-[#141613] text-xs uppercase tracking-wider font-semibold hover:bg-[#c9ad84] transition-all shadow-md shrink-0 flex items-center space-x-1.5"
              >
                <span>Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: ARCHITECTURAL CONSULTATION BRIEFING CARD   */}
          {/* ========================================================= */}
          <div className="contact-form-anim lg:col-span-7 bg-white border border-[#E8E2D8] p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Top Gold Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B79A70]/15 to-transparent rounded-bl-full pointer-events-none" />

            <div className="space-y-2 mb-8 relative z-10">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Project Feasibility &amp; Briefing</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#242522] font-normal">
                Schedule Private Consultation
              </h3>
              <p className="text-sm text-[#77766F] font-light leading-relaxed">
                Provide preliminary details regarding your spatial requirements. Our partners will analyze your requirements and get in touch within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-14 px-8 text-center space-y-5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] relative z-10 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#B79A70]/15 border border-[#B79A70]/40 flex items-center justify-center text-[#B79A70] mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B79A70] font-bold">
                    Protocol Docket #{protocolCode}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#242522] font-medium">
                    Commission Briefing Confirmed
                  </h4>
                </div>
                <p className="text-sm text-[#5A5952] leading-relaxed max-w-md mx-auto font-light">
                  Thank you, <strong className="text-[#242522] font-semibold">{formData.firstName}</strong>. Your project dossier has been logged under our client privacy protocol. An associate director will initiate contact within one business day.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        typology: PROJECT_TYPOLOGIES[0],
                        budgetRange: "₹1.5 Cr – ₹3 Cr",
                        message: "",
                      });
                    }}
                    className="px-7 py-3 rounded-full bg-[#242522] hover:bg-[#B79A70] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                  >
                    Submit Another Briefing
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                {/* Row 1: Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                      First Name <span className="text-[#B79A70]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] placeholder-[#A0988E] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Singhania"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] placeholder-[#A0988E] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                      Email Address <span className="text-[#B79A70]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@singhania.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] placeholder-[#A0988E] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                      Phone / WhatsApp <span className="text-[#B79A70]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] placeholder-[#A0988E] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Interior Typology Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                    Commission Typology
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all cursor-pointer"
                  >
                    {PROJECT_TYPOLOGIES.map((typ) => (
                      <option key={typ} value={typ}>
                        {typ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4: Project Vision & Square Footage */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] mb-2 font-medium">
                    Project Vision &amp; Site Location
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your property location (e.g., 6,500 sq.ft sea-facing residence in Worli / 12,000 sq.ft private estate in Alibaug), timeline, and architectural preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#242522] placeholder-[#A0988E] focus:outline-none focus:border-[#B79A70] focus:bg-white focus:ring-1 focus:ring-[#B79A70] transition-all resize-none"
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-[#20231F] hover:bg-[#B79A70] text-white text-xs uppercase tracking-[0.12em] font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 flex items-center justify-center space-x-2 whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B79A70] group-hover:text-white shrink-0" />
                    <span className="whitespace-nowrap">{formSubmitting ? "Dispatching Dossier..." : "Submit Consultation Brief"}</span>
                  </button>

                  <div className="flex items-center space-x-2 text-xs text-[#77766F] font-mono whitespace-nowrap shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#B79A70] shrink-0" />
                    <span className="whitespace-nowrap">NDA Protected Confidentiality</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. TRUST BADGES / ARCHITECTURAL PRACTICE STANDARDS */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="border border-[#E8E2D8] rounded-3xl bg-white p-8 sm:p-12 shadow-sm standards-grid-anim">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
              The Decorex Standard
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#242522]">
              Uncompromising Architectural Discipline
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2D8]">
            {/* 1 */}
            <div className="standard-badge-anim pt-4 sm:pt-0 sm:px-4 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70]">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base text-[#242522] font-medium">Turnkey Execution</h4>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Single-point civil, MEP, and bespoke styling accountability from concept to handover.
              </p>
            </div>

            {/* 2 */}
            <div className="standard-badge-anim pt-6 sm:pt-0 sm:px-4 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base text-[#242522] font-medium">Bespoke Millwork</h4>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Handcrafted seasoned CP teak joinery and precision European hardware integration.
              </p>
            </div>

            {/* 3 */}
            <div className="standard-badge-anim pt-6 sm:pt-0 sm:px-4 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70]">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base text-[#242522] font-medium">Vastu &amp; Biophilic</h4>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Harmonizing solar orientation, cross-ventilation breezes, and positive spatial energy.
              </p>
            </div>

            {/* 4 */}
            <div className="standard-badge-anim pt-6 sm:pt-0 sm:px-4 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base text-[#242522] font-medium">Fixed BOQ Lock</h4>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Zero cost overruns through milestone-linked BOQ tracking and complete billing transparency.
              </p>
            </div>

            {/* 5 */}
            <div className="standard-badge-anim pt-6 sm:pt-0 sm:px-4 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base text-[#242522] font-medium">5-Year Warranty</h4>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Comprehensive acoustic, moisture, and structural joinery craftsmanship warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL-WIDTH PANORAMIC MAP OF DECOREX STUDIO (WORLI SEA FACE, MUMBAI) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="map-container-anim w-full relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-md bg-[#E5E3DF]">
          {/* Interactive Google Maps Embed */}
          <iframe
            title="Decorex Flagship Studio Location Map"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Worli+Sea+Face+Promenade+Mumbai+Maharashtra+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-[105%] saturate-[70%] brightness-[98%]"
          />

          {/* Central Studio Location Pin Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-14 h-14 rounded-full bg-[#1E2B37]/25 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-[#1E2B37] text-white flex items-center justify-center shadow-2xl border-2 border-white z-10">
                <MapPin className="w-5 h-5 fill-white text-[#1E2B37]" />
              </div>
            </div>
            <div className="mt-2 px-5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#242522]/15 shadow-xl text-center z-10">
              <span className="font-serif text-sm font-semibold text-[#242522] block leading-tight">
                Decorex Flagship Atelier
              </span>
              <span className="text-[10px] font-mono text-[#B79A70] uppercase font-bold tracking-wider">
                Worli Sea Face, Mumbai • 18.9986° N, 72.8174° E
              </span>
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="absolute bottom-6 right-6 z-10">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Worli+Sea+Face+Promenade+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#20231F] hover:bg-[#B79A70] text-white text-xs font-mono uppercase tracking-wider transition-all shadow-xl"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED CLIENT QUESTIONS (ACCORDION) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
              Consultation FAQ
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#242522]">
              Frequently Discussed Inquiries
            </h3>
            <p className="text-sm text-[#77766F] font-light">
              Clear answers regarding commission agreements, project timelines, and geographical scope.
            </p>
          </div>

          <div className="space-y-3 pt-4 faq-list-anim">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="faq-item-anim border border-[#E8E2D8] rounded-2xl bg-white overflow-hidden transition-all shadow-sm hover:border-[#B79A70]/50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between transition-colors focus:outline-none"
                  >
                    <span className="font-serif text-lg text-[#242522] font-medium pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-[#E8E2D8] flex items-center justify-center shrink-0 text-[#242522] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#B79A70] text-white border-transparent" : "bg-[#FAF8F5]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-[#5A5952] leading-relaxed font-light border-t border-[#E8E2D8]/50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
