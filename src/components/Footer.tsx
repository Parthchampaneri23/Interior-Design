import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#20231F] text-[#F7F5F0] border-t border-[#41483B]/40 pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#41483B]/40">
          <div className="lg:col-span-7">
            <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
              Inquire With Decorex
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F7F5F0] mt-4 leading-[1.1] font-light">
              Let us shape your next architectural masterpiece.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end">
            <p className="text-[#E9E2D7]/80 text-sm md:text-base font-light mb-6 max-w-md lg:text-right">
              Accepting residential and private hospitality commissions across Europe, North America, and the Middle East for the upcoming season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#B79A70] text-[#20231F] text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 shadow-md group"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/budget-calculator"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#41483B] text-[#E9E2D7] hover:border-[#B79A70] hover:text-[#B79A70] text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>Budget Calculator</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[#41483B]/40 text-sm">
          {/* Col 1: Studio info */}
          <div className="space-y-4">
            <div className="font-serif text-2xl tracking-[0.15em] uppercase text-[#F7F5F0]">
              DECOR<span className="text-[#B79A70]">EX</span>
            </div>
            <p className="text-[#77766F] text-sm leading-relaxed max-w-xs">
              A studio devoted to tactile permanence, spatial harmony, and the choreography of daylight in contemporary living environments.
            </p>
            <div className="pt-2 text-sm text-[#B79A70] font-mono">
              RIBA Chartered Practice • Member of BIID
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.25em] text-[#B79A70] mb-5 font-mono">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E9E2D7]/80">
              <li>
                <Link href="/about-us" className="hover:text-[#B79A70] transition-colors">
                  Studio Story &amp; Ethos
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#B79A70] transition-colors">
                  Curated Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#B79A70] transition-colors">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#B79A70] transition-colors">
                  7-Stage Design Process
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#B79A70] transition-colors">
                  Client Endorsements
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#B79A70] transition-colors">
                  Design Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Locations */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.25em] text-[#B79A70] mb-5 font-mono">
              Global Ateliers
            </h4>
            <div className="space-y-4 text-sm text-[#E9E2D7]/80">
              <div>
                <p className="font-semibold text-white">Milan Studio</p>
                <p className="text-[#77766F]">Via Montenapoleone 18, 20121 Milano</p>
              </div>
              <div>
                <p className="font-semibold text-white">London Atelier</p>
                <p className="text-[#77766F]">24 Berkeley Square, Mayfair, London W1J</p>
              </div>
              <div>
                <p className="font-semibold text-white">New York Suite</p>
                <p className="text-[#77766F]">450 West 14th St, Meatpacking, NY 10014</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Channels */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.25em] text-[#B79A70] mb-5 font-mono">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-[#E9E2D7]/80 mb-6">
              <a
                href="mailto:private@decorex.com"
                className="flex items-center space-x-2.5 hover:text-[#B79A70] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B79A70]" />
                <span>private@decorex.com</span>
              </a>
              <a
                href="tel:+442079460921"
                className="flex items-center space-x-2.5 hover:text-[#B79A70] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B79A70]" />
                <span>+44 (0) 20 7946 0921</span>
              </a>
            </div>
            <div className="flex space-x-3">
              <span className="p-2 border border-[#41483B] text-[#E9E2D7] flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-[#B79A70]" />
                <span>Global Presence</span>
              </span>
              <span className="p-2 border border-[#41483B] text-[#E9E2D7] flex items-center space-x-2 text-sm">
                <Share2 className="w-4 h-4 text-[#B79A70]" />
                <span>Media &amp; Press</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#77766F] font-mono">
          <p>© {new Date().getFullYear()} DECOREX ARCHITECTURE &amp; INTERIORS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about-us" className="hover:text-[#B79A70] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="hover:text-[#B79A70] transition-colors">
              Terms &amp; Heritage Conditions
            </Link>
            <Link href="/consultation" className="hover:text-[#B79A70] transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
