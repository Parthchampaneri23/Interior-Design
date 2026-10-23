"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  Layers,
  Compass,
  Clock,
  ChevronDown,
  Calendar,
  FileText,
  BadgeCheck,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
import { Service } from "@/data/siteData";
import PageBanner from "@/components/PageBanner";

interface Props {
  service: Service;
  allServices: Service[];
}

export default function ServiceDetailClient({ service, allServices }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"scope" | "deliverables">("scope");

  // Find next and previous service for smooth exploration
  const currentIndex = allServices.findIndex((s) => s.slug === service.slug);
  const prevService =
    currentIndex > 0 ? allServices[currentIndex - 1] : allServices[allServices.length - 1];
  const nextService =
    currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : allServices[0];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#242522] selection:bg-[#B79A70] selection:text-white font-sans">
      {/* 1. CINEMATIC HERO PAGE BANNER */}
      <PageBanner
        title={service.title}
        subtitle={`${service.number} // ${service.tagline}`}
        imageSrc={service.heroImage}
        imageAlt={service.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* 2. SUB-HEADER FLOATING ACTION & NAVIGATION STRIP */}
      <div className="border-b border-[#E8E2D8] bg-white sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-[#77766F] hover:text-[#B79A70] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All Services</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-6 text-xs font-mono uppercase tracking-widest text-[#77766F]">
            <span className="text-[#B79A70] font-semibold">{service.number}</span>
            <span>•</span>
            <span className="truncate max-w-[280px]">{service.title}</span>
          </div>

          <Link
            href="/consultation"
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#20231F] hover:bg-[#B79A70] text-white text-xs font-mono uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 3. CORE EDITORIAL METHODOLOGY & PHILOSOPHY */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          {/* Left Column: Architectural Thesis */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B79A70]/10 border border-[#B79A70]/25 text-[#B79A70] text-xs font-mono uppercase tracking-[0.2em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Discipline &amp; Methodology</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#242522] font-normal leading-[1.14]">
                The Architectural Craft Behind {service.title}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#5A5952] font-light leading-relaxed">
              {service.description}
            </p>

            {/* Architectural Highlight Quote Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border-l-4 border-l-[#B79A70] border border-[#E8E2D8] shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                <BadgeCheck className="w-4 h-4 text-[#B79A70]" />
                <span>Quality Assurance &amp; Execution Protocol</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl text-[#242522] font-light italic leading-snug">
                &ldquo;Every millimeter is surveyed, modeled in 3D CAD, and executed with calibrated precision before a single panel is mounted.&rdquo;
              </p>
              <p className="text-xs text-[#77766F] font-mono">
                Decorex Senior Project Engineering Division • IS:710 Compliance
              </p>
            </div>

            {/* Dual Imagery Showcase */}
            {service.galleryImages && service.galleryImages.length >= 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={service.galleryImages[0]}
                    alt={`${service.title} detail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-white text-xs font-mono uppercase tracking-wider">
                      Materiality &amp; Tactile Joinery
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={service.galleryImages[1]}
                    alt={`${service.title} architectural finishing`}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-white text-xs font-mono uppercase tracking-wider">
                      Integrated Illumination &amp; Execution
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Tangible Deliverables & Consultation Card */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            {/* Dark Architectural Contrast Deliverables Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#20231F] text-white border border-[#41483B]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#B79A70]/15 rounded-full blur-[60px] pointer-events-none" />

              <div className="space-y-2 mb-8 relative z-10">
                <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Tangible Project Deliverables</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal">
                  What You Receive
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Comprehensive documentation, CAD schematics, and milestone warranties delivered across every phase.
                </p>
              </div>

              {/* Deliverable Points */}
              <div className="space-y-4 mb-8 relative z-10">
                {service.deliverables.map((del, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3.5 hover:border-[#B79A70]/50 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#B79A70]/20 flex items-center justify-center text-[#B79A70] shrink-0 mt-0.5 group-hover:bg-[#B79A70] group-hover:text-black transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-white/90 font-light leading-relaxed">
                      {del}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Booking CTA */}
              <div className="space-y-3 pt-4 border-t border-white/15 relative z-10">
                <Link
                  href="/consultation"
                  className="w-full py-4 rounded-full bg-[#B79A70] hover:bg-[#c9ad84] text-[#141613] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Request Service Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-white/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B79A70]" />
                  <span>Fixed BOQ • Zero Cost Overruns</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Desk Helper Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B79A70] font-semibold block">
                  Direct Technical Line
                </span>
                <h4 className="font-serif text-lg text-[#242522]">Speak With Our Lead Architect</h4>
                <p className="text-xs text-[#77766F] font-mono">+91 22 2490 8800 (IST 10:00 – 19:30)</p>
              </div>

              <a
                href="tel:+912224908800"
                className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] hover:bg-[#B79A70] hover:text-white transition-colors shrink-0 shadow-sm"
                aria-label="Call Studio"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL SCOPE OF WORKS — INTERACTIVE ARCHITECTURAL MODULES */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16 border-t border-[#E8E2D8]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
            Comprehensive Execution Matrix
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#242522]">
            Detailed Scope of Works
          </h3>
          <p className="text-sm text-[#77766F] font-light leading-relaxed">
            Every technical discipline is orchestrated under a single milestone agreement, from structural engineering to custom artisanal fit-out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.scope.map((item, idx) => {
            const icons = [Layers, Compass, Building2, ShieldCheck, Clock, Sparkles];
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm hover:shadow-xl hover:border-[#B79A70]/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B79A70] font-bold">
                      Module // 0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] group-hover:bg-[#B79A70] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-serif text-xl text-[#242522] font-normal leading-snug group-hover:text-[#B79A70] transition-colors">
                    {item}
                  </h4>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-mono text-[#77766F]">
                  <span>Decorex Certified</span>
                  <CheckCircle2 className="w-4 h-4 text-[#B79A70]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED CLARIFICATIONS ACCORDION */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 border-t border-[#E8E2D8]">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B79A70] font-semibold">
                Service Clarifications &amp; FAQ
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#242522]">
                Frequently Asked Inquiries
              </h3>
              <p className="text-sm text-[#77766F] font-light">
                Key details regarding timelines, quality guarantees, and material specifications for this discipline.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E8E2D8] rounded-2xl bg-white overflow-hidden transition-all shadow-sm hover:border-[#B79A70]/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors focus:outline-none"
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
                      <div className="px-6 pb-6 pt-0 text-sm text-[#5A5952] leading-relaxed font-light border-t border-[#E8E2D8]/50 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. NEXT / PREVIOUS SERVICE EXPLORATION BAR */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 py-12 border-t border-[#E8E2D8]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Service */}
          <Link
            href={`/services/${prevService.slug}`}
            className="p-7 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#B79A70] transition-all group flex items-center justify-between shadow-sm"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77766F] block">
                ← Previous Discipline ({prevService.number})
              </span>
              <h4 className="font-serif text-xl text-[#242522] group-hover:text-[#B79A70] transition-colors">
                {prevService.title}
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] group-hover:bg-[#B79A70] group-hover:text-white transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
          </Link>

          {/* Next Service */}
          <Link
            href={`/services/${nextService.slug}`}
            className="p-7 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#B79A70] transition-all group flex items-center justify-between text-right shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#B79A70] group-hover:bg-[#B79A70] group-hover:text-white transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77766F] block">
                Next Discipline ({nextService.number}) →
              </span>
              <h4 className="font-serif text-xl text-[#242522] group-hover:text-[#B79A70] transition-colors">
                {nextService.title}
              </h4>
            </div>
          </Link>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#20231F] via-[#2D332B] to-[#20231F] text-white p-10 sm:p-16 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B79A70] text-xs font-mono uppercase tracking-[0.2em] mb-6">
            <Calendar className="w-3.5 h-3.5" />
            <span>Turnkey Commission Dialogue</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white max-w-2xl font-normal leading-tight mb-4">
            Ready to Commission Your Architectural Space?
          </h3>

          <p className="text-sm sm:text-base text-white/75 font-light max-w-xl mb-8 leading-relaxed">
            Schedule a confidential dialogue with our principal design directors across our Mumbai, Goa, and Alibaug ateliers.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/consultation"
              className="px-8 py-4 rounded-full bg-[#B79A70] hover:bg-[#c9ad84] text-[#141613] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-105"
            >
              Book Private Consultation
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all"
            >
              Direct Studio Inquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
