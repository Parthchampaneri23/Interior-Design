"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs,
  imageSrc = "/banner.jpg",
  imageAlt = "Decorex Architectural Studio",
}: PageBannerProps) {
  // Default breadcrumbs if none provided
  const items: BreadcrumbItem[] = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title },
  ];

  return (
    <section className="relative w-full h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#1A1D1A]">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover  scale-120 transition-transform duration-1000 ease-out"
        />
        {/* Layered cinematic dark gradient overlay for optimal readability & atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141613] via-[#141613]/60 to-[#141613]/50" />
        {/* <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" /> */}
      </div>

      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="max-w-[1560px] h-full mx-auto px-6 sm:px-10 lg:px-14 flex justify-between">
          <div className="w-[1px] h-full bg-white/40" />
          <div className="w-[1px] h-full bg-white/20 hidden md:block" />
          <div className="w-[1px] h-full bg-white/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1560px] w-full mx-auto px-6 sm:px-10 lg:px-14 text-center flex flex-col items-center pt-16 sm:pt-20">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center space-x-2 sm:space-x-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-4 sm:mb-6"
        >
          {items.map((crumb, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <div key={idx} className="inline-flex items-center space-x-2 sm:space-x-3">
                {idx === 0 && <Home className="w-3.5 h-3.5 text-[#B79A70]" />}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-sm sm:text-sm uppercase tracking-[0.18em] font-medium text-white/80 hover:text-[#B79A70] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={`text-sm sm:text-sm uppercase tracking-[0.18em] font-semibold ${
                      isLast ? "text-[#B79A70]" : "text-white/80"
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="w-3 h-3 text-white/40 shrink-0" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Page Title with Typewriter Animation */}
        <TypewriterText
          text={title}
          tag="h1"
          delay={0.25}
          speed={0.045}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F7F5F0] tracking-tight leading-[1.1] max-w-4xl"
        />

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm md:text-base text-[#E9E2D7]/80 font-light max-w-2xl tracking-wide">
            {subtitle}
          </p>
        )}

        {/* Decorative Gold Accent Bar */}
        <div className="mt-6 sm:mt-8 flex items-center space-x-2">
          <span className="w-10 h-[1.5px] bg-[#B79A70]/60" />
          <span className="w-2 h-2 rounded-full bg-[#B79A70]" />
          <span className="w-10 h-[1.5px] bg-[#B79A70]/60" />
        </div>
      </div>
    </section>
  );
}
