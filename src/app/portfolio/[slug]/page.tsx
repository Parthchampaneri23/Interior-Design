import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/siteData";
import PortfolioDetailClient from "./PortfolioDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Decorex Studio",
    };
  }

  return {
    title: `${project.title} — ${project.subtitle} | Decorex Architecture`,
    description: `${project.challenge} Discover bespoke spatial solutions by Decorex Architectural Studio.`,
    openGraph: {
      title: `${project.title} | Decorex Architecture`,
      description: project.subtitle,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <PortfolioDetailClient
      project={project}
      allProjects={PROJECTS}
      relatedProjects={relatedProjects}
    />
  );
}
