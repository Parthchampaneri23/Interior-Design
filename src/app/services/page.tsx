import type { Metadata } from "next";
import { SERVICES } from "@/data/siteData";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Interior Design & Turnkey Execution Services | Decorex Studio",
  description:
    "Explore our comprehensive interior design services: turnkey luxury residential interiors, custom modular kitchens & wardrobes, architectural lighting, and boutique commercial fit-outs across India.",
};

export default function ServicesPage() {
  return <ServicesClient services={SERVICES} />;
}
