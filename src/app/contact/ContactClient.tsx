
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
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
} from "lucide-react";
import PageBanner from "@/components/PageBanner";

export default function ContactClient() {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    typology: "Turnkey Luxury Villa Estate",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [protocolCode, setProtocolCode] = useState("");

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => setNewsletterSubscribed(false), 4500);
    setNewsletterEmail("");
  };

  return (
    <div className="w-full bg-[#FAF6F0] text-[#242522] pb-16 min-h-screen selection:bg-[#B79A70] selection:text-white font-sans">
      {/* 1. TOP PAGE BANNER WITH THE SPECIFIED INTERIOR IMAGE */}
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

      {/* 2. MAIN SECTION: SPEAK WITH US (LEFT) & PRIVATE CONSULTATION (RIGHT FORM) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: SPEAK WITH US & 4 CONTACT CARDS + BRANDS     */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-9">
            {/* Header with Circular Crest Icon */}
            <div className="space-y-3.5">
              <div className="w-11 h-11 rounded-full border border-[#B79A70]/50 flex items-center justify-center text-[#B79A70] bg-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold block">
                  Studio Inquiries &amp; Consultations
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#242522] font-normal leading-[1.15]">
                  Speak With Our Architects
                </h2>
              </div>

              <p className="text-sm text-[#5A5952] leading-relaxed max-w-lg font-light">
                Whether conceptualizing a coastal sanctuary in Alibaug, a sky penthouse along Worli Sea Face, or a heritage estate in Goa, our principal design partners are available for confidential consultations.
              </p>
            </div>

            {/* 4 Contact Info Blocks in a 2x2 Grid with Enhanced Larger Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:gap-y-12 gap-x-8 pt-4">
              {/* 1. Flagship Atelier Address */}
              <div className="flex items-start space-x-4 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-[#242522]/15 bg-white flex items-center justify-center text-[#242522] shrink-0 mt-0.5 shadow-sm group-hover:border-[#B79A70] group-hover:scale-105 transition-all">
                  <MapPin className="w-5 h-5 text-[#B79A70]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal leading-snug">
                    Flagship Atelier
                  </h4>
                  <p className="text-sm sm:text-[15px] text-[#5A5952] leading-relaxed font-light">
                    Tower 4, Worli Sea Face Promenade,<br />
                    Mumbai, Maharashtra 400018
                  </p>
                </div>
              </div>

              {/* 2. Direct Studio Line */}
              <div className="flex items-start space-x-4 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-[#242522]/15 bg-white flex items-center justify-center text-[#242522] shrink-0 mt-0.5 shadow-sm group-hover:border-[#B79A70] group-hover:scale-105 transition-all">
                  <Phone className="w-5 h-5 text-[#B79A70]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal leading-snug">
                    Direct Line
                  </h4>
                  <a
                    href="tel:+912224908800"
                    className="text-sm sm:text-base text-[#242522] hover:text-[#B79A70] transition-colors block font-mono font-medium"
                  >
                    +91 22 2490 8800
                  </a>
                  <p className="text-sm sm:text-[13px] text-[#B79A70] font-mono">
                    Mon – Sat: 10:00 – 19:30 IST
                  </p>
                </div>
              </div>

              {/* 3. Private Inquiries */}
              <div className="flex items-start space-x-4 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-[#242522]/15 bg-white flex items-center justify-center text-[#242522] shrink-0 mt-0.5 shadow-sm group-hover:border-[#B79A70] group-hover:scale-105 transition-all">
                  <Mail className="w-5 h-5 text-[#B79A70]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal leading-snug">
                    Private Inquiries
                  </h4>
                  <a
                    href="mailto:private@decorex.com"
                    className="text-sm sm:text-base text-[#242522] hover:text-[#B79A70] transition-colors block font-mono font-medium"
                  >
                    private@decorex.com
                  </a>
                  <p className="text-sm sm:text-[13px] text-[#77766F] font-mono">
                    NDA Protected Communications
                  </p>
                </div>
              </div>

              {/* 4. Atelier Digital Portal */}
              <div className="flex items-start space-x-4 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-[#242522]/15 bg-white flex items-center justify-center text-[#242522] shrink-0 mt-0.5 shadow-sm group-hover:border-[#B79A70] group-hover:scale-105 transition-all">
                  <Globe className="w-5 h-5 text-[#B79A70]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal leading-snug uppercase tracking-wider text-base">
                    WEBSITE
                  </h4>
                  <a
                    href="https://decorex.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-[#242522] hover:text-[#B79A70] transition-colors block font-mono font-medium"
                  >
                    www.decorex.studio
                  </a>
                  <p className="text-sm sm:text-[13px] text-[#77766F] font-mono">
                    Curated Spatial Archives
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 24/7 SUPPORT INQUIRY FORM CARD              */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-[#EFE5DA] border border-[#E2D5C7] p-8 sm:p-11 shadow-sm rounded-none relative overflow-hidden">
            {/* Subtle Ambient Gold Glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#B79A70]/10 rounded-full blur-[60px] pointer-events-none" />

            {/* Header with Circular Crest Icon */}
            <div className="space-y-3 mb-7 relative z-10">
              <div className="w-11 h-11 rounded-full border border-[#B79A70]/60 flex items-center justify-center text-[#B79A70] bg-white/80 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold block">
                  Private Client Concierge
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#242522] font-normal leading-tight">
                  24/7 Support &amp; Briefing
                </h2>
              </div>

              <p className="text-sm text-[#77766F] leading-relaxed font-light">
                Submit your project briefing for initial feasibility review. Our managing partners will contact you within 24 hours under strict non-disclosure terms.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in bg-white/70 p-7 border border-[#242522]/10 shadow-sm relative z-10">
                <CheckCircle2 className="w-12 h-12 text-[#1E2B37] mx-auto" />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B79A70] font-bold">
                    Ref ID: {protocolCode}
                  </span>
                  <h3 className="font-serif text-2xl text-[#242522]">
                    Commission Briefing Received
                  </h3>
                </div>
                <p className="text-sm text-[#5A5952] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-[#242522]">{formData.firstName}</strong>. Our principal architects will review your spatial requirements and initiate contact within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      typology: "Turnkey Luxury Villa Estate",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1E2B37] text-white text-sm uppercase tracking-wider font-semibold hover:bg-[#242522] transition-colors"
                >
                  Submit Another Briefing
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Singhania"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@singhania.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Row 3: Interior Design Typology */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                    Interior Typology
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner"
                  >
                    <option value="Turnkey Luxury Villa Estate">Turnkey Luxury Residential Estate</option>
                    <option value="Penthouse Spatial Restructuring">Penthouse Spatial Architecture</option>
                    <option value="Custom Millwork & Modular Kitchen">Custom Millwork &amp; Modular Kitchens</option>
                    <option value="Architectural Lighting & Ceiling">Architectural Lighting &amp; Ceilings</option>
                    <option value="Heritage Villa Restoration">Heritage Villa Restoration (Goa / Alibaug)</option>
                    <option value="Boutique Commercial & Retail Flagship">Boutique Commercial &amp; Hospitality</option>
                  </select>
                </div>

                {/* Row 4: Additional Project Vision */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#77766F] mb-1">
                    Project Vision &amp; Location
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your location, square footage (e.g. 6,500 sq.ft in Mumbai / Goa), preferred timeline, or aesthetic preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white/85 border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] focus:bg-white transition-all shadow-inner resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-8 py-3.5 bg-[#1E2B37] hover:bg-[#242522] text-white text-sm uppercase tracking-wider font-semibold transition-all shadow-md disabled:opacity-60 flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? "Dispatching Briefing..." : "Send Message"}</span>
                </button>

                <p className="text-[11px] text-[#77766F] font-mono pt-1">
                  Strict NDA confidentiality guaranteed on all disclosures.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. TRUST BADGES / INTERIOR DESIGN PRACTICE HALLMARKS (5 COLUMNS WITH VERTICAL DIVIDERS) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#242522]/10 border-y border-[#242522]/10 py-8 bg-white/50">
          {/* 1. Turnkey Execution */}
          <div className="p-4 sm:p-5 text-center space-y-2">
            <div className="w-9 h-9 mx-auto text-[#242522] flex items-center justify-center">
              <Building2 className="w-6 h-6 stroke-1 text-[#242522]" />
            </div>
            <h4 className="font-serif text-base text-[#242522] font-normal">
              Turnkey Execution
            </h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed font-light">
              Single-point civil, MEP, and styling accountability from foundation to handover.
            </p>
          </div>

          {/* 2. Bespoke Millwork */}
          <div className="p-4 sm:p-5 text-center space-y-2">
            <div className="w-9 h-9 mx-auto text-[#242522] flex items-center justify-center">
              <Layers className="w-6 h-6 stroke-1 text-[#242522]" />
            </div>
            <h4 className="font-serif text-base text-[#242522] font-normal">
              Bespoke Millwork
            </h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed font-light">
              Handcrafted seasoned CP teak joinery and precision European hardware integration.
            </p>
          </div>

          {/* 3. Vastu & Biophilic */}
          <div className="p-4 sm:p-5 text-center space-y-2">
            <div className="w-9 h-9 mx-auto text-[#242522] flex items-center justify-center">
              <Compass className="w-6 h-6 stroke-1 text-[#242522]" />
            </div>
            <h4 className="font-serif text-base text-[#242522] font-normal">
              Vastu &amp; Biophilic
            </h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed font-light">
              Harmonizing solar paths, natural cross-breezes, and positive spatial energy.
            </p>
          </div>

          {/* 4. Fixed BOQ Lock */}
          <div className="p-4 sm:p-5 text-center space-y-2">
            <div className="w-9 h-9 mx-auto text-[#242522] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-1 text-[#242522]" />
            </div>
            <h4 className="font-serif text-base text-[#242522] font-normal">
              Fixed BOQ Lock
            </h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed font-light">
              Zero cost overruns through milestone-linked BOQ tracking and financial transparency.
            </p>
          </div>

          {/* 5. 5-Year Warranty */}
          <div className="p-4 sm:p-5 text-center space-y-2">
            <div className="w-9 h-9 mx-auto text-[#242522] flex items-center justify-center">
              <Clock className="w-6 h-6 stroke-1 text-[#242522]" />
            </div>
            <h4 className="font-serif text-base text-[#242522] font-normal">
              5-Year Warranty
            </h4>
            <p className="text-[11px] text-[#77766F] leading-relaxed font-light">
              Comprehensive acoustic, moisture, and structural joinery craftsmanship warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FULL-WIDTH PANORAMIC MAP OF DECOREX STUDIO (WORLI SEA FACE, MUMBAI) */}
      <section className="w-full relative h-[440px] sm:h-[500px] lg:h-[560px] bg-[#E5E3DF] overflow-hidden border-y border-[#242522]/10 my-4">
        {/* Interactive Google Maps Embed with Clean Silver/Desaturated Architecture Palette */}
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

        {/* Central Studio Location Pin Overlay (Matching User's Reference Image) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing radar ring */}
            <span className="absolute w-12 h-12 rounded-full bg-[#1E2B37]/25 animate-ping" />
            <div className="w-9 h-9 rounded-full bg-[#1E2B37] text-white flex items-center justify-center shadow-2xl border-2 border-white z-10">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
          </div>
          <div className="mt-1 px-4 py-1.5 bg-white/95 backdrop-blur-sm border border-[#242522]/15 shadow-xl text-center z-10">
            <span className="font-serif text-sm font-semibold text-[#242522] block leading-tight">
              Decorex Flagship Atelier
            </span>
            <span className="text-[9px] font-mono text-[#B79A70] uppercase font-bold tracking-wider">
              Worli Sea Face, Mumbai • 18.9986° N, 72.8174° E
            </span>
          </div>
        </div>

        {/* Floating Quick Navigation Link */}
        <div className="absolute bottom-5 right-5 sm:right-8 z-10">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Worli+Sea+Face+Promenade+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1E2B37] hover:bg-[#242522] text-white text-sm font-mono uppercase tracking-wider transition-all shadow-lg"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 5. NEWSLETTER / ARCHITECTURAL MONOGRAPH BAR: "KEEP UP WITH THE MOST RECENT STYLES" */}
      <section className="w-full bg-[#EFE5DA] py-12 sm:py-16 border-b border-[#E2D5C7]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Text */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold block">
                The Decorex Spatial Monograph
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#242522] font-normal">
                Keep Up With The Most Recent Styles
              </h3>
              <p className="text-sm text-[#77766F] font-light max-w-xl leading-relaxed">
                Receive curated architectural monographs, tactile materiality studies, and private villa reveals once a month.
              </p>
            </div>

            {/* Right Subscription Form */}
            <div className="lg:w-auto w-full">
              {newsletterSubscribed ? (
                <div className="flex items-center space-x-2 text-sm font-mono text-emerald-800 bg-emerald-100/70 px-4 py-3 border border-emerald-300 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Thank you for subscribing to our studio stylebook!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md w-full"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email Address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="px-4 py-3 text-sm bg-white border border-[#D8C7B8] text-[#242522] placeholder-[#9E948A] focus:outline-none focus:border-[#1E2B37] w-full sm:w-80 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3 bg-[#1E2B37] hover:bg-[#242522] text-white text-sm uppercase tracking-wider font-semibold transition-all shadow-md shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
