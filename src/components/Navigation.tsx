"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Navigation() {
  const [isSolid, setIsSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setIsSolid(window.scrollY > 40);
        return;
      }

      // On home page: Navbar stays 100% transparent until the second component (StudioIntroSection) has scrolled 80% into view
      const secondSection = document.getElementById("second-section");
      if (secondSection) {
        const rect = secondSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Condition: Top of second section reaches top 20% of viewport (meaning 80% of it has arrived)
        if (rect.top <= windowHeight * 0.2) {
          setIsSolid(true);
        } else {
          setIsSolid(false);
        }
      } else {
        // Fallback if element not found
        setIsSolid(window.scrollY > 2800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // On all other pages (Portfolio, About, Services, Process, Contact, etc.), navbar has dark bg by default (even at top 0)
  // On home page ('/'), navbar starts transparent and becomes dark once second-section is reached
  const hasDarkBg = !isHomePage || isSolid;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pt-1.5 sm:pt-2 transition-all duration-500 ease-out pointer-events-none bg-transparent pb-0 border-none text-black"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between pointer-events-auto">
          {/* Combined Rounded-Full Transparent/Glass Pill Container Covering Logo & Tabs */}
          <div
            className={`hidden lg:flex items-center justify-between w-full pl-5 sm:pl-6 pr-6 sm:pr-8 py-0.5 rounded-full backdrop-blur-md transition-all duration-300 border-none ${
              hasDarkBg
                ? "bg-neutral-100/90 shadow-sm"
                : "bg-white/40 shadow-sm"
            }`}
          >
            {/* Studio Brand Logo Image Inside the Pill */}
            <Link
              href="/"
              className="group flex items-center focus:outline-none relative shrink-0 mr-2 py-0"
              aria-label="DECOREX Home"
            >
              <div className="relative h-13 sm:h-14 lg:h-[60px] w-32 sm:w-36 lg:w-40 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="DECOREX Architecture and Interior Design"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 140px, 180px"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center space-x-0.5 xl:space-x-1 shrink-0 py-0" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[12px] xl:text-[13px] uppercase tracking-[0.09em] xl:tracking-[0.12em] font-semibold transition-all duration-300 px-2 xl:px-2.5 py-1 rounded-full relative whitespace-nowrap ${
                      isActive
                        ? "text-[#B79A70] font-bold"
                        : "text-black hover:text-[#B79A70] hover:bg-black/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#B79A70] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile View: Logo on left, Menu on right */}
          <div className="flex items-center justify-between w-full lg:hidden py-0.5">
            <Link
              href="/"
              className="group flex items-center focus:outline-none relative py-0 px-3 rounded-full bg-white/40 backdrop-blur-md border-none"
              aria-label="DECOREX Home"
            >
              <div className="relative h-13 sm:h-14 w-36 sm:w-40">
                <Image
                  src="/logo.png"
                  alt="DECOREX Architecture and Interior Design"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-white/40 backdrop-blur-md border-none text-black hover:text-[#3c4130] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#20231F]/98 backdrop-blur-xl flex flex-col justify-between p-8 md:p-12 lg:hidden transition-all duration-500 animate-fadeIn"
          style={{ paddingTop: "6rem" }}
        >
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#B79A70] mb-2 font-mono">
              Directory // Selection
            </div>
            {NAV_LINKS.map((link, idx) => (
              <div key={link.href} className="border-b border-[#41483B]/30 pb-3">
                <Link
                  href={link.href}
                  className="font-serif text-2xl text-[#F7F5F0] hover:text-[#3c4130] transition-colors flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <span className="text-sm font-mono text-[#77766F]">0{idx + 1}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-6 space-y-4 border-t border-[#41483B]/40">
            <Link
              href="/consultation"
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.2em] transition-transform active:scale-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Book Private Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="text-center text-sm text-[#77766F] tracking-wider">
              Studio: Milan • London • New York
            </div>
          </div>
        </div>
      )}
    </>
  );
}
