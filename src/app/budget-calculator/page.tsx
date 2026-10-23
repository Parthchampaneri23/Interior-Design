"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowUpRight, AlertCircle, Sparkles } from "lucide-react";

import PageBanner from "@/components/PageBanner";

export default function BudgetCalculatorPage() {
  const [propertyType, setPropertyType] = useState<"residential" | "penthouse" | "commercial">("residential");
  const [areaSqM, setAreaSqM] = useState<number>(350);
  const [finishGrade, setFinishGrade] = useState<"bespoke" | "haute" | "museum">("haute");
  const [includeJoinery, setIncludeJoinery] = useState<boolean>(true);
  const [includeLightingAutomation, setIncludeLightingAutomation] = useState<boolean>(true);
  const [includeArtCuration, setIncludeArtCuration] = useState<boolean>(false);

  // Rate estimates per square meter (indicative rates)
  const ratesPerSqM = {
    residential: {
      bespoke: 1200, // USD/sqm
      haute: 1900,
      museum: 2800,
    },
    penthouse: {
      bespoke: 1500,
      haute: 2400,
      museum: 3500,
    },
    commercial: {
      bespoke: 1100,
      haute: 1800,
      museum: 2600,
    },
  };

  const baseRate = ratesPerSqM[propertyType][finishGrade];
  const baseCost = areaSqM * baseRate;

  // Addon multipliers
  const joineryCost = includeJoinery ? areaSqM * 350 : 0;
  const lightingCost = includeLightingAutomation ? areaSqM * 220 : 0;
  const artCost = includeArtCuration ? areaSqM * 180 : 0;

  const totalEstimate = baseCost + joineryCost + lightingCost + artCost;
  const lowRange = Math.round(totalEstimate * 0.9);
  const highRange = Math.round(totalEstimate * 1.15);

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-24">
      {/* Page Banner with banner.jpg & Breadcrumb */}
      <PageBanner
        title="Budget Estimator"
        subtitle="Interactive client-side calculator providing indicative budget frameworks for bespoke architectural and interior remodeling."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Budget Calculator" },
        ]}
      />

      {/* Calculator Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[#E9E2D7] shadow-xl rounded-sm space-y-8">
            {/* Step 1: Typology */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-3">
                01. Space Typology
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["residential", "penthouse", "commercial"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-3 px-2 text-sm font-mono uppercase tracking-wider border text-center transition-all ${
                      propertyType === type
                        ? "bg-[#20231F] text-[#F7F5F0] border-[#20231F]"
                        : "bg-[#F7F5F0] text-[#77766F] border-[#E9E2D7] hover:border-[#B79A70]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-mono uppercase tracking-wider text-[#77766F]">
                  02. Interior Area (Square Meters)
                </label>
                <span className="font-serif text-2xl text-[#242522] font-semibold">
                  {areaSqM} sq.m{" "}
                  <span className="text-sm text-[#77766F] font-mono font-normal">
                    (~{(areaSqM * 10.764).toFixed(0)} sq.ft)
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={1500}
                step={10}
                value={areaSqM}
                onChange={(e) => setAreaSqM(Number(e.target.value))}
                className="w-full accent-[#B79A70] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#77766F] mt-1">
                <span>80 sq.m</span>
                <span>1500 sq.m</span>
              </div>
            </div>

            {/* Step 3: Craftsmanship Grade */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-3">
                03. Craftsmanship &amp; Material Tier
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bespoke", label: "Bespoke Luxury", rate: "$1,200/m²" },
                  { id: "haute", label: "Haute Atelier", rate: "$1,900/m²" },
                  { id: "museum", label: "Museum Grade", rate: "$2,800/m²" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setFinishGrade(tier.id as any)}
                    className={`p-3 text-left border transition-all ${
                      finishGrade === tier.id
                        ? "bg-[#20231F] text-[#F7F5F0] border-[#20231F]"
                        : "bg-[#F7F5F0] text-[#242522] border-[#E9E2D7] hover:border-[#B79A70]"
                    }`}
                  >
                    <div className="text-sm font-serif font-semibold">{tier.label}</div>
                    <div className="text-[10px] font-mono opacity-70 mt-1">{tier.rate}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-3">
                04. Architectural Scope Add-ons
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 bg-[#F7F5F0] border border-[#E9E2D7] rounded-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeJoinery}
                    onChange={(e) => setIncludeJoinery(e.target.checked)}
                    className="accent-[#B79A70] w-4 h-4"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-[#242522]">Custom Italian Millwork &amp; Dressing Suites</span>
                    <span className="text-[#77766F] block">Integrated wardrobes, library shelving, and marble vanity islands</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-[#F7F5F0] border border-[#E9E2D7] rounded-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLightingAutomation}
                    onChange={(e) => setIncludeLightingAutomation(e.target.checked)}
                    className="accent-[#B79A70] w-4 h-4"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-[#242522]">Circadian Architectural Lighting &amp; Home Automation</span>
                    <span className="text-[#77766F] block">Concealed LED wash channels, driver racks, and scene keypads</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-[#F7F5F0] border border-[#E9E2D7] rounded-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeArtCuration}
                    onChange={(e) => setIncludeArtCuration(e.target.checked)}
                    className="accent-[#B79A70] w-4 h-4"
                  />
                  <div className="text-sm">
                    <span className="font-semibold text-[#242522]">Curated Art Collection &amp; Bespoke Sculptural Commission</span>
                    <span className="text-[#77766F] block">Direct gallery acquisition and museum-standard hanging setup</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#20231F] text-[#F7F5F0] rounded-sm shadow-2xl space-y-6">
              <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70]">
                <Calculator className="w-4 h-4" />
                <span>Indicative Investment Range</span>
              </div>

              <div>
                <span className="text-sm font-mono text-[#E9E2D7]/75 uppercase">
                  Estimated Total Capital:
                </span>
                <div className="font-serif text-3xl sm:text-4xl text-[#F7F5F0] mt-1 font-light">
                  ${lowRange.toLocaleString()} – ${highRange.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-[#B79A70] mt-1">
                  Indicative average: ~${totalEstimate.toLocaleString()} USD
                </div>
              </div>

              <div className="pt-4 border-t border-[#41483B]/40 space-y-2 text-sm font-mono text-[#E9E2D7]/80">
                <div className="flex justify-between">
                  <span>Base Architecture &amp; Construction:</span>
                  <span>${baseCost.toLocaleString()}</span>
                </div>
                {includeJoinery && (
                  <div className="flex justify-between">
                    <span>Bespoke Millwork &amp; Dressing:</span>
                    <span>${joineryCost.toLocaleString()}</span>
                  </div>
                )}
                {includeLightingAutomation && (
                  <div className="flex justify-between">
                    <span>Circadian Lighting &amp; Controls:</span>
                    <span>${lightingCost.toLocaleString()}</span>
                  </div>
                )}
                {includeArtCuration && (
                  <div className="flex justify-between">
                    <span>Art Provenance &amp; Sculptures:</span>
                    <span>${artCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <Link
                href="/consultation"
                className="w-full inline-flex items-center justify-center space-x-2 py-4 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl group"
              >
                <span>Book Formal Project Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Disclaimer & Unverified Rates Notice */}
            <div className="p-6 bg-white border border-[#E9E2D7] rounded-sm space-y-3">
              <div className="flex items-center space-x-2 text-sm font-mono uppercase text-[#77766F]">
                <AlertCircle className="w-4 h-4 text-[#B79A70]" />
                <span className="font-semibold text-[#242522]">Indicative Disclaimer</span>
              </div>
              <p className="text-sm text-[#77766F] leading-relaxed font-light">
                * Note on Rates: Figures presented above are purely demonstration benchmarks calculated using unverified demonstration rates. Actual project capital depends upon structural heritage constraints, council permits, local contractor labor indices, and bespoke foreign stone procurement.
              </p>
              <p className="text-sm text-[#77766F] leading-relaxed font-light">
                Exclusions: Statutory local planning taxes, major foundation underpinning, and unforeseen historical site remediation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
