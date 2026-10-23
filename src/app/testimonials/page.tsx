import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/siteData";

import PageBanner from "@/components/PageBanner";

export default function TestimonialsPage() {
  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-24">
      {/* Page Banner with banner.jpg & Breadcrumb */}
      <PageBanner
        title="Patron Endorsements"
        subtitle="Hear directly from our private residential owners, international art collectors, and luxury fashion directors about their collaborative experience with Decorex."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Testimonials" },
        ]}
      />

      {/* Testimonials Masonry / Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-10 md:p-12 bg-white border border-[#E9E2D7] shadow-lg rounded-sm flex flex-col justify-between space-y-8 hover:border-[#B79A70] transition-colors"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#B79A70]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#E9E2D7]" />
                </div>

                <blockquote className="font-serif text-xl md:text-2xl text-[#242522] italic font-normal leading-relaxed">
                  {item.quote}
                </blockquote>
              </div>

              <div className="pt-8 border-t border-[#E9E2D7] flex items-center space-x-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#E9E2D7] border border-[#B79A70]/40 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.author}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#242522] font-semibold">
                    {item.author}
                  </h3>
                  <p className="text-sm text-[#77766F] font-mono">
                    {item.role}
                  </p>
                  <p className="text-sm text-[#B79A70] font-mono mt-0.5">
                    Project: {item.project} • {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="relative p-10 md:p-14 lg:p-16 bg-[#FAF7F2] text-[#1A1D1A] rounded-2xl border border-[#B79A70]/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden group">
          {/* Subtle champagne aesthetic lighting glow */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#B79A70]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#B79A70]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#B79A70]/15 border border-[#B79A70]/30 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D47]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#8C6D38] font-medium">
                Join Our Circle of Patrons
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-light text-[#1A1D1A] tracking-tight leading-tight md:whitespace-nowrap">
              Transform your lifestyle and real estate.
            </h3>
            <p className="text-sm md:text-base text-[#5C574F] font-light mt-2 max-w-xl leading-relaxed">
              Our partners personally oversee every architectural commission.
            </p>
          </div>

          <Link
            href="/consultation"
            className="relative z-10 inline-flex items-center space-x-2.5 px-8 py-4 bg-[#B79A70] hover:bg-[#1A1D1A] text-[#1A1D1A] hover:text-[#FAF7F2] font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 rounded-sm shadow-md hover:shadow-xl group/btn shrink-0"
          >
            <span>Book Initial Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
