import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Design Ateliers | Decorex Studio Architecture",
  description:
    "Connect with Decorex Studio principal architects across our Worli Sea Face Mumbai flagship, Alibaug coastal lab, Goa heritage pavilion, and New Delhi private suite.",
  openGraph: {
    title: "Contact Decorex Studio | Architectural Commissions & Ateliers",
    description:
      "Initiate a confidential dialogue for turnkey luxury residential estates, custom millwork, and heritage architectural restorations.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"],
  },
};

export default function ContactUsPage() {
  return <ContactClient />;
}
