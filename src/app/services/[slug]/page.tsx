import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/siteData";
import ServiceDetailClient from "./ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Decorex Studio",
    };
  }

  return {
    title: `${service.title} | Decorex Architecture & Interiors`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Decorex Luxury Design`,
      description: service.tagline,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} allServices={SERVICES} />;
}
