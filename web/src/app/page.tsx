import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { WhySignageSection } from "@/components/WhySignageSection";
import { AudienceSection } from "@/components/AudienceSection";
import { NetworkMapSection } from "@/components/NetworkMapSection";
import { AdvertiserSection } from "@/components/AdvertiserSection";
import { VenueHostSection } from "@/components/VenueHostSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { LeadFormsSection } from "@/components/LeadFormsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06080d] text-white flex flex-col">
      <Navbar />
      <Hero />
      <ProcessSection />
      <WhySignageSection />
      <AudienceSection />
      <NetworkMapSection />
      <AdvertiserSection />
      <VenueHostSection />
      <WhyUsSection />
      <LeadFormsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
