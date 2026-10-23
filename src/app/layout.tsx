import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import RouteScrollTriggerCleanup from "@/components/RouteScrollTriggerCleanup";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";

// Logo serif font family
const logoSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Title font
const titleFont = Plus_Jakarta_Sans({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DECOREX | Luxury Architecture & Interior Studio",
  description:
    "Award-winning bespoke interior design, architectural storytelling, and high-end residential & commercial spaces crafted with timeless elegance.",
  keywords: [
    "Luxury Interior Design",
    "Architectural Studio",
    "Bespoke Living",
    "Residential Architecture",
    "Contemporary Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${logoSerif.variable} ${titleFont.variable} ${manrope.variable} antialiased selection:bg-[#B79A70] selection:text-[#20231F]`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#242522] overflow-x-hidden">
        <CustomCursor />
        <RouteScrollTriggerCleanup />
        <ScrollProgress />
        <Navigation />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
