"use client";

import { useState } from "react";
import { Calendar, Clock, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

import PageBanner from "@/components/PageBanner";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "14:00 (Milan / CET)",
    locationType: "In-Person (Studio)",
    preferredStudio: "Milan Atelier",
    scopeOverview: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      alert("Please provide your name, email, and preferred consultation date.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-24">
      {/* Page Banner with banner.jpg & Breadcrumb */}
      <PageBanner
        title="Private Consultation"
        subtitle="Schedule an initial 60-minute exploratory meeting with our Principal Architects to review drawings, discuss spatial visions, or structure preliminary feasibility."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation" },
        ]}
      />

      {/* Booking Form Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Booking Interface */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 border border-[#E9E2D7] shadow-xl rounded-sm">
            {isSubmitted ? (
              <div className="text-center py-16 space-y-5">
                <CheckCircle2 className="w-14 h-14 text-[#B79A70] mx-auto" />
                <h3 className="font-serif text-3xl font-light text-[#242522]">
                  Consultation Request Dispatched
                </h3>
                <p className="text-sm text-[#77766F] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#242522]">{formData.name}</strong>. Your requested date for{" "}
                  <strong className="text-[#242522]">{formData.date} at {formData.time}</strong> has been logged.
                </p>

                {/* Important Notice Callout */}
                <div className="p-4 bg-[#F7F5F0] border-l-4 border-[#B79A70] max-w-lg mx-auto text-left text-sm font-mono text-[#77766F] space-y-1">
                  <div className="flex items-center space-x-2 text-[#41483B] font-semibold">
                    <ShieldAlert className="w-4 h-4 text-[#B79A70]" />
                    <span>Indicative Request Notice:</span>
                  </div>
                  <p>
                    Please note: This consultation request is not automatically confirmed. A partner from Decorex will contact you within 24 hours to confirm calendar availability and send encrypted conference coordinates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#20231F] text-[#F7F5F0] text-sm font-mono uppercase tracking-wider"
                >
                  Schedule Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#242522] mb-1">
                    Select Your Preferred Session Details
                  </h3>
                  <p className="text-sm text-[#77766F] font-mono">
                    All initial sessions are hosted by a Studio Principal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                    >
                      <option>10:00 (Milan / CET)</option>
                      <option>14:00 (Milan / CET)</option>
                      <option>16:30 (London / GMT)</option>
                      <option>19:00 (New York / EST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                      Meeting Format
                    </label>
                    <select
                      value={formData.locationType}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                    >
                      <option>In-Person (Studio)</option>
                      <option>Encrypted Video Call</option>
                      <option>On-Site (Existing Property)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                    Preferred Atelier Location
                  </label>
                  <select
                    value={formData.preferredStudio}
                    onChange={(e) => setFormData({ ...formData, preferredStudio: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                  >
                    <option>Milan Atelier (Via Montenapoleone)</option>
                    <option>London Studio (Mayfair)</option>
                    <option>New York Suite (Meatpacking)</option>
                    <option>Virtual / Global Direct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono uppercase tracking-wider text-[#77766F] mb-2">
                    Preliminary Spatial Agenda / Objectives
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe the property, square footage, existing condition, and what you hope to achieve during the consultation..."
                    value={formData.scopeOverview}
                    onChange={(e) => setFormData({ ...formData, scopeOverview: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#F7F5F0] border border-[#E9E2D7] focus:outline-none focus:border-[#B79A70]"
                  />
                </div>

                {/* Clear Notice Callout */}
                <div className="p-4 bg-[#F7F5F0] border border-[#B79A70]/30 text-sm text-[#77766F] font-mono leading-relaxed">
                  Notice: Consultations are by appointment only. Submissions made here are client-side requests and will be confirmed by email prior to appointment.
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-[#20231F] hover:text-[#F7F5F0] transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation Slot</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Information Box */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-[#20231F] text-[#F7F5F0] rounded-sm space-y-6 shadow-xl">
              <div className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70]">
                <Sparkles className="w-4 h-4" />
                <span>What to Expect</span>
              </div>

              <h4 className="font-serif text-2xl font-light text-[#F7F5F0]">
                The Discovery Protocol
              </h4>

              <ul className="space-y-4 text-sm text-[#E9E2D7]/80 font-light leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-[#B79A70] font-mono font-bold">01.</span>
                  <span>Spatial Feasibility Review of site sketches or floor plans.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#B79A70] font-mono font-bold">02.</span>
                  <span>Material Palette discussion with physical sample trays.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#B79A70] font-mono font-bold">03.</span>
                  <span>Preliminary Budget Modeling and timeline estimation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#B79A70] font-mono font-bold">04.</span>
                  <span>No obligation to proceed; completely confidential.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-[#E9E2D7] rounded-sm space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70]">
                Concierge Assistance
              </span>
              <p className="text-sm text-[#77766F] leading-relaxed">
                Require special arrangements or evening appointment windows? Contact our executive assistant directly:
              </p>
              <p className="text-sm font-mono text-[#242522] font-semibold pt-1">
                concierge@decorex.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
