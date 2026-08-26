import React from "react";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/Marquee";
import { ProblemSection } from "../components/home/ProblemSection";
import { TransformationSection } from "../components/home/TransformationSection";
import { AudienceSection } from "../components/home/AudienceSection";
import { SystemExplorer } from "../components/home/SystemExplorer";
import { InstantMeetingBanner } from "../components/home/InstantMeetingBanner";
import { CTASection } from "../components/CTASection";

interface HomeProps {
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking: () => void;
}

export const HomeView: React.FC<HomeProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <>
      {/* 1. Hero: Core proposition + Instant Meeting & Explore Actions */}
      <Hero onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* 2. Marquee: Live systems & integrations banner */}
      <Marquee />

      {/* 3. The Core Challenge: Fragmented Operations */}
      <ProblemSection />

      {/* 4. The Transformation: Before deepliX vs With deepliX */}
      <TransformationSection />

      {/* 5. Audience: Who We Build For */}
      <AudienceSection />

      {/* 6. System Explorer: Interactive Architecture Preview */}
      <SystemExplorer />

      {/* 7. Instant Meeting Discovery Booking Banner */}
      <InstantMeetingBanner onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* 8. Final High-Impact CTA */}
      <CTASection onNavigate={onNavigate} />
    </>
  );
};
