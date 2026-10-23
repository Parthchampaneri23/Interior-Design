import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, HelpCircle } from "lucide-react";
import { SERVICES } from "@/data/siteData";

import PageBanner from "@/components/PageBanner";

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-24">
      {/* Page Banner with Service Image & Breadcrumbs */}
      <PageBanner
        title={service.title}
        subtitle={`${service.number} // ${service.tagline}`}
        imageSrc={service.heroImage}
        imageAlt={service.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#77766F] hover:text-[#B79A70] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Overview & Deliverables */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#41483B]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl font-light text-[#242522]">
              Detailed Methodology &amp; Scope
            </h2>
            <p className="text-[#77766F] font-light leading-relaxed text-base">
              {service.description}
            </p>

            <div className="pt-6 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#242522]">
                Full Scope of Works:
              </h3>
              <ul className="space-y-3">
                {service.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-[#41483B]">
                    <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#E9E2D7]/70 border border-[#B79A70]/30 p-8 rounded-sm space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#B79A70]">
              Tangible Deliverables
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm md:text-base text-[#242522]">
                  <span className="w-2 h-2 rounded-full bg-[#B79A70]" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#41483B]/20">
              <Link
                href="/consultation"
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-[#20231F] text-[#F7F5F0] text-sm uppercase tracking-[0.2em] font-semibold hover:bg-[#B79A70] hover:text-[#20231F] transition-all"
              >
                <span>Request Service Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#41483B]/20">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70]">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-[#242522]">
              Clarifications &amp; Planning
            </h2>

            <div className="space-y-6 pt-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#E9E2D7] rounded-sm space-y-2">
                  <h4 className="font-serif text-xl text-[#242522]">{faq.question}</h4>
                  <p className="text-sm text-[#77766F] font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
