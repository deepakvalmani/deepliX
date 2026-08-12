import React from "react";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/Marquee";
import { ProblemSection } from "../components/home/ProblemSection";
import { TransformationSection } from "../components/home/TransformationSection";
import { CapabilitiesSection } from "../components/home/CapabilitiesSection";
import { SystemExplorer } from "../components/home/SystemExplorer";
import { LifecycleSection } from "../components/home/LifecycleSection";
import { PartnershipSection } from "../components/home/PartnershipSection";
import { AudienceSection } from "../components/home/AudienceSection";
import { ProcessSection } from "../components/home/ProcessSection";
import { PrinciplesSection } from "../components/home/PrinciplesSection";
import { CTASection } from "../components/CTASection";

interface HomeProps {
  onNavigate: (view: string, hash?: string) => void;
}

export const HomeView: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Marquee />
      <ProblemSection />
      <TransformationSection />
      <CapabilitiesSection onNavigate={onNavigate} />
      <SystemExplorer />
      <LifecycleSection />
      <PartnershipSection />
      <AudienceSection />
      <ProcessSection onNavigate={onNavigate} />
      <PrinciplesSection onNavigate={onNavigate} />
      <CTASection onNavigate={onNavigate} />
    </>
  );
};
