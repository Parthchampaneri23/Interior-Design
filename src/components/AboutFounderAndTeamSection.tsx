"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, MapPin } from "lucide-react";
import WaveText from "@/components/WaveText";
import TypewriterText from "@/components/TypewriterText";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Architecture" | "Art & Curation" | "Engineering";
  location: string;
  experience: string;
  bio: string;
  image: string;
  achievements: string[];
  quote: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Aurelia Vance",
    role: "Founder & Principal Architect",
    department: "Leadership",
    location: "Milan & London",
    experience: "22 Years",
    bio: "Educated at the Architectural Association London and Politecnico di Milano. Aurelia founded the atelier in 2002 with a radical vision of architectural stillness and biophilic luxury.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "RIBA International Fellow 2021",
      "Architectural Digest AD100 Hall of Fame",
      "Phaidon Monograph Feature 2024",
    ],
    quote: "True architecture does not demand applause; it creates the stillness in which life unfolds.",
  },
  {
    id: "team-2",
    name: "Marcus Lindqvist",
    role: "Partner & Architectural Director",
    department: "Leadership",
    location: "Stockholm & Milan",
    experience: "18 Years",
    bio: "Pioneering the intersection of Scandinavian light-wells and monolithic Italian stonework. Marcus directs master planning, structural integrity, and sustainable passive climate modeling.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "Nordic Design Grand Prix",
      "Passive House Institute Gold Assessor",
      "Venice Architecture Biennale Contributor",
    ],
    quote: "Every joint and shadow gap is a technical promise kept to the client.",
  },
  {
    id: "team-3",
    name: "Elena Rossini",
    role: "Head of Materiality & Art Curation",
    department: "Art & Curation",
    location: "Florence & Paris",
    experience: "15 Years",
    bio: "Curator at Venice Biennale galleries prior to joining Decorex. Elena travels directly to private quarries and master artisans to source noble slabs, heritage weaves, and private art commissions.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "Curator for Venice Art Biennale 2019",
      "Master of Antiquities, École du Louvre",
      "Bespoke Italian Stone Guild Ambassador",
    ],
    quote: "A space without curated materiality and artisanal soul is merely an empty box.",
  },
  {
    id: "team-4",
    name: "David Chen",
    role: "Director of Joinery & Bespoke Furniture",
    department: "Architecture",
    location: "Tokyo & Zurich",
    experience: "14 Years",
    bio: "Trained in classical Japanese timber construction (Miyadaiku) and Swiss micro-mechanics. David oversees the custom fabrication of cantilevered islands, hidden wall systems, and bronze fittings.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "Kyoto Traditional Woodcraft Laureate",
      "Red Dot Best of the Best 2023",
      "12 Patented Concealed Joinery Details",
    ],
    quote: "The magic happens in millimetres that the eye doesn't immediately notice but the hand feels.",
  },
  {
    id: "team-5",
    name: "Sophie Van Houten",
    role: "Senior Project Architect & Turnkey Lead",
    department: "Engineering",
    location: "Amsterdam & Lake Como",
    experience: "12 Years",
    bio: "Specializing in ultra-luxury coastal and alpine cliffside engineering. Sophie coordinates geotechnical surveys, HVAC acoustic attenuation, and site execution with zero tolerance for deviations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "Chartered Architect Netherlands BNA",
      "Acoustic Engineering Excellence Award",
      "Over 40 Turnkey Residences Delivered",
    ],
    quote: "Precision on paper is meaningless without ruthless integrity during site execution.",
  },
  {
    id: "team-6",
    name: "Julian Thorne",
    role: "Principal Lighting Choreographer",
    department: "Art & Curation",
    location: "London & New York",
    experience: "16 Years",
    bio: "Former theatrical lighting designer transitioned to luxury spatial atmosphere. Julian sculpts shadow, circadian rhythm tunability, and micro-aperture optics for private galleries and estates.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85",
    achievements: [
      "IALD International Lighting Award",
      "Circadian Architectural System Developer",
      "Lighting Designer for 3 Michelin 3-Star Venues",
    ],
    quote: "We don't light the space; we reveal the emotional resonance of the architecture.",
  },
];

const DEPARTMENTS = ["All", "Leadership", "Architecture", "Art & Curation", "Engineering"] as const;

export default function AboutFounderAndTeamSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [activeLeader, setActiveLeader] = useState<TeamMember>(TEAM_MEMBERS[0]);

  const filteredTeam =
    selectedDept === "All"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === selectedDept);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".team-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedDept]);

  return (
    <section
      ref={containerRef}
      id="founder-and-team"
      className="relative z-10 py-24 sm:py-32 bg-[#20231F] text-[#F7F5F0] overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-[#B79A70]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#41483B]/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-16 pb-6 border-b border-[#41483B]/40">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B79A70]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
                The Architects &amp; Artisans
              </span>
            </div>
            <WaveText
              text={"Founder &\nCreative Collective"}
              tag="h2"
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F7F5F0] leading-[1.12]"
            />
          </div>

          <p className="text-sm text-[#E9E2D7]/75 font-light max-w-md font-sans">
            A multidisciplinary studio of registered architects, structural purists, stone curators, and master woodworkers united by absolute precision.
          </p>
        </div>

        {/* Founder Spotlight Feature */}
        <div className="mb-24 p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#1A1D1A] border border-[#B79A70]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-[#242522] border border-[#B79A70]/20">
              <Image
                src={TEAM_MEMBERS[0].image}
                alt={TEAM_MEMBERS[0].name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B79A70]">
                    Principal
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-light">
                    {TEAM_MEMBERS[0].name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#B79A70]">
                    {TEAM_MEMBERS[0].experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Story & Accolades */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B79A70]/20 border border-[#B79A70]/40 text-sm font-mono text-[#B79A70] uppercase tracking-wider mb-4">
                  <span>Founder&apos;s Perspective</span>
                </div>
                <TypewriterText
                  text="“A great home should feel as quiet and permanent as a monolithic stone temple, yet as intimate as a whisper.”"
                  tag="h3"
                  speed={0.042}
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white leading-tight"
                />
              </div>

              <p className="text-sm sm:text-base text-[#E9E2D7]/80 font-light leading-relaxed">
                {TEAM_MEMBERS[0].bio} Aurelia personally oversees the spatial master concept and material specification for every client estate, guaranteeing that the atelier&apos;s foundational principles of acoustic tranquility, spatial purity, and timeless dignity are honored down to the millimeter.
              </p>

              {/* Founder Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {TEAM_MEMBERS[0].achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm text-[#E9E2D7]/90 font-mono">
                    <Award className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Location and Contact */}
              <div className="flex items-center space-x-6 pt-4 text-sm font-mono text-[#B79A70]">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{TEAM_MEMBERS[0].location}</span>
                </span>
                <span>//</span>
                <span>Direct Executive Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Collective Grid with Department Filter */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div>
              <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70]">
                Studio Roster
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
                The Master Minds Behind the Work
              </h3>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedDept === dept
                      ? "bg-[#B79A70] text-[#20231F] font-bold shadow-md"
                      : "bg-white/5 text-[#E9E2D7]/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="team-card group relative bg-[#1E211E] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B79A70]/60 transition-all duration-500 flex flex-col justify-between p-6 hover:shadow-2xl"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-[#242522] mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">
                        {member.department}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#B79A70] bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#B79A70]/30">
                      {member.experience}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-1.5 mb-4">
                    <h4 className="font-serif text-2xl font-light text-white group-hover:text-[#B79A70] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-sm font-mono uppercase tracking-widest text-[#B79A70]">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#E9E2D7]/75 font-light leading-relaxed pt-2 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-mono text-[#E9E2D7]/60">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B79A70]" />
                    <span>{member.location}</span>
                  </span>
                  <span className="italic text-[11px] text-[#B79A70]/90 truncate max-w-[150px]">
                    &ldquo;{member.quote}&rdquo;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
