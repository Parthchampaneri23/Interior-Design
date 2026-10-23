import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

export default function ConsultationBannerSection() {
  return (
    <section className="py-20 md:py-28 bg-[#41483B] text-[#F7F5F0] relative overflow-hidden">
      {/* Decorative subtle texture/overlay */}
      <div className="absolute inset-0 bg-radial-[at_center] from-[#B79A70]/10 via-transparent to-black/40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#B79A70]/40 bg-[#20231F]/40 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#B79A70]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E9E2D7] font-mono">
            Direct Studio Dialogue
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7F5F0] font-light leading-[1.15] mb-6">
          Begin Your Spatial Metamorphosis
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#E9E2D7]/90 font-light leading-relaxed mb-10">
          Whether you are acquiring a historic European estate or commissioning a new penthouse build in Manhattan, our partners are available for an initial exploratory discussion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.22em] hover:bg-white transition-all shadow-xl group"
          >
            <Calendar className="w-4 h-4 text-[#20231F]" />
            <span>Schedule Private Consultation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 border border-[#E9E2D7]/50 text-[#F7F5F0] font-semibold text-sm uppercase tracking-[0.22em] hover:border-white hover:bg-white/10 transition-all"
          >
            <span>Direct Studio Inquiries</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
