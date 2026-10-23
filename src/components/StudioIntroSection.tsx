"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function StudioIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal words / lines on scroll
      const titleElements = textRevealRef.current?.querySelectorAll(".reveal-item");
      if (titleElements) {
        gsap.fromTo(
          titleElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRevealRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Smooth clipping mask expansion on image
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: "polygon(0 15%, 100% 15%, 100% 85%, 0 85%)", scale: 0.95 },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 75%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="second-section"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#F7F5F0] text-[#242522] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Subheader & Manifesto */}
        <div ref={textRevealRef} className="max-w-5xl mb-20">
          <div className="reveal-item flex items-center space-x-3 mb-6">
            <span className="w-8 h-[1px] bg-[#B79A70]" />
            <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
              The Decorex Philosophy
            </span>
          </div>

          <h2 className="reveal-item font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#242522] font-light leading-[1.15] mb-8">
            We believe an interior is not decorated—it is{" "}
            <span className="italic font-normal text-[#41483B] underline decoration-[#B79A70]/60 decoration-1 underline-offset-8">
              sculpted
            </span>{" "}
            to awaken calm, ritual, and enduring beauty.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#77766F] text-base md:text-lg font-light leading-relaxed">
            <p className="reveal-item">
              For over two decades, Decorex has cultivated an international design atelier
              dedicated to architectural purity. We eliminate the noise of ephemeral trends to focus
              on the enduring: monolithic raw stone, tactile bouclé, hand-troweled lime plaster, and
              the emotional cadence of daylight.
            </p>
            <p className="reveal-item">
              Each commission is approached as a living portrait of its inhabitants. We collaborate
              with generational quarrymen, master joiners, and textile weavers to engineer spaces
              that exude effortless luxury and quiet reverence.
            </p>
          </div>
        </div>

        {/* Asymmetrical Image Layout with Editorial Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[16/10] overflow-hidden shadow-2xl bg-[#E9E2D7]"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
                alt="Decorex Studio Architecture Craft"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20231F]/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-sm tracking-widest font-mono uppercase">
                Villa Solarium // Living Gallery
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10 pl-0 lg:pl-6">
            <div className="border-t border-[#41483B]/20 pt-6">
              <div className="font-serif text-5xl md:text-6xl text-[#242522] font-light">
                24<span className="text-[#B79A70] text-3xl font-serif">+</span>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#77766F] mt-2 font-mono">
                Years of International Architectural Excellence
              </p>
            </div>

            <div className="border-t border-[#41483B]/20 pt-6">
              <div className="font-serif text-5xl md:text-6xl text-[#242522] font-light">
                120<span className="text-[#B79A70] text-3xl font-serif">+</span>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#77766F] mt-2 font-mono">
                Bespoke Residences &amp; Boutiques Completed
              </p>
            </div>

            <div className="border-t border-[#41483B]/20 pt-6">
              <div className="font-serif text-5xl md:text-6xl text-[#242522] font-light">
                18
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#77766F] mt-2 font-mono">
                Global Design Accolades &amp; Heritage Honors
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center space-x-2 text-sm uppercase tracking-[0.22em] font-semibold text-[#242522] hover:text-[#B79A70] transition-colors group"
              >
                <span>Read Our Full Story</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
