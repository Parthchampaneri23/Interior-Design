import HeroSection from "@/components/HeroSection";
import AboutShowcaseSection from "@/components/AboutShowcaseSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ServicesEditorialSection from "@/components/ServicesEditorialSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ProcessTimelineSection from "@/components/ProcessTimelineSection";
import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import ConsultationBannerSection from "@/components/ConsultationBannerSection";
import JournalPreviewSection from "@/components/JournalPreviewSection";

import { PROJECTS, SERVICES, TESTIMONIALS, BLOG_POSTS } from "@/data/siteData";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Full-Screen Video Hero (100vw x 100vh) */}
      <HeroSection />

      {/* 2. Bespoke "ABOUT US" Showcase Section directly below hero (Matching reference UI) */}
      <AboutShowcaseSection />

      {/* 3. Featured Project Showcases */}
      <FeaturedProjectsSection projects={PROJECTS} />

      {/* 4. Editorial Services Overview & Capabilities */}
      <ServicesEditorialSection services={SERVICES} />

      {/* 5. Interactive Before & After Transformation Slider */}
      <BeforeAfterSection />

      {/* 6. 7-Stage Architectural Design Process */}
      <ProcessTimelineSection />

      {/* 7. Patron Endorsements & Testimonials */}
      <TestimonialsCarouselSection testimonials={TESTIMONIALS} />

      {/* 8. Consultation Call-to-Action Banner */}
      <ConsultationBannerSection />

      {/* 9. Architectural Journal Essays Preview */}
      <JournalPreviewSection posts={BLOG_POSTS.slice(0, 3)} />
    </>
  );
}
