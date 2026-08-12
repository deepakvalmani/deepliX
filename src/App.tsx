import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./pages/HomeView";
import { CapabilitiesView } from "./pages/CapabilitiesView";
import { HowWeWorkView } from "./pages/HowWeWorkView";
import { AboutView } from "./pages/AboutView";
import { SystemsLabView } from "./pages/SystemsLabView";
import { ContactView } from "./pages/ContactView";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [initialHash, setInitialHash] = useState<string | undefined>(undefined);

  const handleNavigate = (view: string, hash?: string) => {
    setCurrentView(view);
    setInitialHash(hash);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === "home" && <HomeView onNavigate={handleNavigate} />}
        {currentView === "capabilities" && (
          <CapabilitiesView initialHash={initialHash} onNavigate={handleNavigate} />
        )}
        {currentView === "how-we-work" && <HowWeWorkView onNavigate={handleNavigate} />}
        {currentView === "systems-lab" && <SystemsLabView onNavigate={handleNavigate} />}
        {currentView === "about" && <AboutView onNavigate={handleNavigate} />}
        {currentView === "contact" && <ContactView />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
