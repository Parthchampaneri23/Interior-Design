"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StoryScene {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  image: string;
  accent: string;
}

const STORY_SCENES: StoryScene[] = [
  {
    id: "scene-1",
    step: "Scene 01",
    title: "Space & Proportion",
    subtitle: "The Sacred Geometry of Volumes",
    quote: "“Before furniture arrives, the space must already command silence.”",
    description:
      "We orchestrate double-height spatial volumes, clean axial vistas, and intentional thresholds that guide movement intuitively, generating a profound sense of expansiveness.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    accent: "#B79A70",
  },
  {
    id: "scene-2",
    step: "Scene 02",
    title: "Natural Materials",
    subtitle: "Tactile Permanence & Organic Memory",
    quote: "“Authentic stone and timber don’t degrade—they patina with nobility.”",
    description:
      "From hand-split Tuscan travertine to century-old French oak beams and fluted lime plaster, every tactile surface possesses an authentic connection to the earth.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    accent: "#E9E2D7",
  },
  {
    id: "scene-3",
    step: "Scene 03",
    title: "Light & Atmosphere",
    subtitle: "Choreographing the Sun's Trajectory",
    quote: "“Shadow is just as intentional as illumination.”",
    description:
      "Architectural apertures harness natural solar rhythms, while concealed circadian LED channels seamlessly transition the atmosphere from crisp dawn to warm midnight cocooning.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80",
    accent: "#B79A70",
  },
  {
    id: "scene-4",
    step: "Scene 04",
    title: "Furniture & Detailing",
    subtitle: "Couture Joinery & Sculptural Artifacts",
    quote: "“Perfection is hidden in the seamless joint and the bespoke handle.”",
    description:
      "Every millwork element is tailored to the millimeter by generational Italian craftsmen, integrating unlacquered brass hardware, hand-stitched leather, and bespoke art pieces.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    accent: "#41483B",
  },
];

export default function PinnedStorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create ScrollTrigger on desktop for the pinned experience
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * STORY_SCENES.length),
              STORY_SCENES.length - 1
            );
            setActiveScene(index);
          },
        });
        return () => st.kill(true);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const current = STORY_SCENES[activeScene];

  return (
    <section
      id="second-section"
      ref={containerRef}
      className="relative min-h-screen bg-[#20231F] text-[#F7F5F0] overflow-hidden flex flex-col justify-center py-20 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#41483B]/50">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
              Signature Storytelling
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F7F5F0] mt-2">
              The Art of Thoughtful Living
            </h2>
          </div>
          <div className="hidden lg:flex items-center space-x-6 text-sm font-mono text-[#E9E2D7]/70 mt-4 md:mt-0">
            {STORY_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveScene(idx)}
                className={`transition-all duration-300 pb-1 ${
                  activeScene === idx
                    ? "text-[#B79A70] border-b-2 border-[#B79A70] font-bold"
                    : "text-[#77766F] hover:text-[#F7F5F0]"
                }`}
              >
                {scene.step}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Pinned 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Showcase with smooth crossfade */}
          <div className="lg:col-span-7 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-[#242522] shadow-2xl border border-[#41483B]/30">
            {STORY_SCENES.map((scene, idx) => (
              <div
                key={scene.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeScene === idx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                } transform transition-transform duration-1000`}
              >
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20231F]/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#20231F]/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-[#B79A70] border border-[#B79A70]/20">
                  {scene.step} // 04
                </div>
              </div>
            ))}
          </div>

          {/* Editorial Content Transition Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
            <div className="space-y-2">
              <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70]">
                {current.step} — {current.subtitle}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#F7F5F0] transition-all duration-500">
                {current.title}
              </h3>
            </div>

            <blockquote className="border-l-2 border-[#B79A70] pl-4 italic font-serif text-lg md:text-xl text-[#E9E2D7]/90 leading-relaxed">
              {current.quote}
            </blockquote>

            <p className="text-[#E9E2D7]/75 text-sm md:text-base font-light leading-relaxed">
              {current.description}
            </p>

            {/* Mobile Scene Navigation Buttons */}
            <div className="flex lg:hidden items-center space-x-3 pt-4">
              {STORY_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveScene(idx)}
                  className={`px-3 py-1.5 text-sm font-mono uppercase border transition-all ${
                    activeScene === idx
                      ? "border-[#B79A70] bg-[#B79A70] text-[#20231F] font-semibold"
                      : "border-[#41483B] text-[#E9E2D7]"
                  }`}
                >
                  {scene.step}
                </button>
              ))}
            </div>

            {/* Scroll Indicator helper */}
            <div className="hidden lg:flex items-center space-x-3 text-[11px] font-mono text-[#77766F] pt-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#B79A70] animate-ping" />
              <span>Scroll down through the pinned scenes to proceed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
