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
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="p-12 md:p-16 bg-[#20231F] text-[#F7F5F0] rounded-sm flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="max-w-xl">
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70]">
              Join Our Circle of Patrons
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#F7F5F0] mt-2">
              Transform your lifestyle and real estate.
            </h3>
            <p className="text-sm text-[#E9E2D7]/75 font-mono mt-2">
              Our partners personally oversee every architectural commission.
            </p>
          </div>
          <Link
            href="/consultation"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-8 py-3.5 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-md group shrink-0"
          >
            <span>Book Initial Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
