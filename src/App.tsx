import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./pages/HomeView";
import { CapabilitiesView } from "./pages/CapabilitiesView";
import { HowWeWorkView } from "./pages/HowWeWorkView";
import { AboutView } from "./pages/AboutView";
import { SystemsLabView } from "./pages/SystemsLabView";
import { ContactView } from "./pages/ContactView";
import { AdminView } from "./pages/AdminView";
import { PrivacyPolicyView } from "./pages/PrivacyPolicyView";
import { TermsView } from "./pages/TermsView";
import { CookiePolicyView } from "./pages/CookiePolicyView";
import { CareersView } from "./pages/CareersView";
import { CookieBanner } from "./components/CookieBanner";
import { BlueprintBuilder } from "./components/BlueprintBuilder";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [initialHash, setInitialHash] = useState<string | undefined>(undefined);
  const [attachedBlueprint, setAttachedBlueprint] = useState<{
    tools: string[];
    outcomes: string[];
    diagramSummary: string;
  } | null>(null);

  const handleNavigate = (view: string, hash?: string) => {
    setCurrentView(view);
    setInitialHash(hash);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAttachBlueprint = (data: {
    tools: string[];
    outcomes: string[];
    diagramSummary: string;
  }) => {
    setAttachedBlueprint(data);
    handleNavigate("contact");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1 pt-16">
        {currentView === "home" && <HomeView onNavigate={handleNavigate} />}
        {currentView === "capabilities" && (
          <CapabilitiesView initialHash={initialHash} onNavigate={handleNavigate} />
        )}
        {currentView === "blueprint" && (
          <div className="pt-8">
            <BlueprintBuilder onAttachToContact={handleAttachBlueprint} />
          </div>
        )}
        {currentView === "how-we-work" && <HowWeWorkView onNavigate={handleNavigate} />}
        {currentView === "systems-lab" && <SystemsLabView onNavigate={handleNavigate} />}
        {currentView === "about" && <AboutView onNavigate={handleNavigate} />}
        {currentView === "careers" && <CareersView onNavigate={handleNavigate} />}
        {currentView === "admin" && <AdminView onNavigate={handleNavigate} />}
        {currentView === "privacy" && <PrivacyPolicyView onNavigate={handleNavigate} />}
        {currentView === "terms" && <TermsView onNavigate={handleNavigate} />}
        {currentView === "cookies" && <CookiePolicyView onNavigate={handleNavigate} />}
        {currentView === "contact" && (
          <ContactView initialBlueprint={attachedBlueprint} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <CookieBanner onNavigate={handleNavigate} />
    </div>
  );
}
