import type { Metadata } from "next";
import { PROCESS_STAGES } from "@/data/siteData";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our 7-Stage Architectural Process & Turnkey Delivery | Decorex Studio",
  description:
    "Explore our structured, transparent 7-stage interior methodology from lifestyle discovery and 3D concept visualization to turnkey civil contracting, fixed-price BOQ, and zero-defect handover.",
};

export default function ProcessPage() {
  return <ProcessClient stages={PROCESS_STAGES} />;
}
