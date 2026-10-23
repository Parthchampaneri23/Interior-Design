import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import AboutBrandStorySection from "@/components/AboutBrandStorySection";
import AboutFounderAndTeamSection from "@/components/AboutFounderAndTeamSection";
import AboutCapabilitiesSection from "@/components/AboutCapabilitiesSection";
import AboutAwardsSection from "@/components/AboutAwardsSection";
import AboutCtaSection from "@/components/AboutCtaSection";

export const metadata: Metadata = {
  title: "About The Atelier | DECOREX | Luxury Architecture & Interiors",
  description:
    "Learn about our Milan heritage, founding principles, multidisciplinary leadership, technical precision standards, and global architectural accolades.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full bg-[#F7F5F0]">
      {/* Page Banner with banner.jpg & Breadcrumb */}
      <PageBanner
        title="About Our Atelier"
        subtitle="Two decades of architectural stillness, monolithic materiality, and bespoke luxury."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* 1. Brand Story, Philosophy, Mission & Vision Section */}
      <AboutBrandStorySection />

      {/* 2. Founder & Collective Team Section */}
      <AboutFounderAndTeamSection />

      {/* 3. Capabilities & Quality Standards Section */}
      <AboutCapabilitiesSection />

      {/* 4. Awards & Peer Accolades Section */}
      <AboutAwardsSection />

      {/* 5. Consultation & Commission CTA Section */}
      <AboutCtaSection />
    </div>
  );
}
