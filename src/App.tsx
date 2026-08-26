import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./pages/HomeView";
import { SolutionsView } from "./pages/SolutionsView";
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
import { BookingModal } from "./components/BookingModal";

// Helper to determine initial view from URL path
function getViewFromPath(): string {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!path) return "home";
  const known = [
    "home",
    "solutions",
    "capabilities",
    "how-we-work",
    "about",
    "systems-lab",
    "blueprint",
    "careers",
    "contact",
    "admin",
    "privacy",
    "terms",
    "cookies",
  ];
  return known.includes(path) ? path : "home";
}

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => getViewFromPath());
  const [initialHash, setInitialHash] = useState<string | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [attachedBlueprint, setAttachedBlueprint] = useState<{
    tools: string[];
    outcomes: string[];
    diagramSummary: string;
  } | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const v = getViewFromPath();
      setCurrentView(v);
      setInitialHash(window.location.hash.replace("#", "") || undefined);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleNavigate = (view: string, hash?: string) => {
    let targetView = view;
    if (view === "capabilities") {
      targetView = "solutions";
    }

    setCurrentView(targetView);
    setInitialHash(hash);

    // Update browser URL without reload
    const newPath = targetView === "home" ? "/" : `/${targetView}`;
    const newUrl = hash ? `${newPath}#${hash}` : newPath;
    window.history.pushState({ view: targetView }, "", newUrl);

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
    <div className="flex min-h-screen flex-col bg-[#121212] text-[#E4E4E7]">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <main className="flex-1 pt-16">
        {/* Dedicated Individual Page Routing */}
        {currentView === "home" && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentView === "solutions" && (
          <SolutionsView
            initialHash={initialHash}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "how-we-work" && (
          <HowWeWorkView
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentView === "about" && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentView === "systems-lab" && (
          <SystemsLabView onNavigate={handleNavigate} />
        )}

        {currentView === "blueprint" && (
          <div className="pt-8">
            <BlueprintBuilder onAttachToContact={handleAttachBlueprint} />
          </div>
        )}

        {currentView === "careers" && (
          <CareersView onNavigate={handleNavigate} />
        )}

        {currentView === "admin" && (
          <AdminView onNavigate={handleNavigate} />
        )}

        {currentView === "privacy" && (
          <PrivacyPolicyView onNavigate={handleNavigate} />
        )}

        {currentView === "terms" && (
          <TermsView onNavigate={handleNavigate} />
        )}

        {currentView === "cookies" && (
          <CookiePolicyView onNavigate={handleNavigate} />
        )}

        {currentView === "contact" && (
          <ContactView
            initialBlueprint={attachedBlueprint}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Global Booking Modal with Instant Calendly integration */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <CookieBanner onNavigate={handleNavigate} />
    </div>
  );
}
