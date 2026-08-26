import React, { useEffect, useState } from "react";
import { Layers, Menu, X, ArrowRight, ShieldCheck, Sparkles, Calendar } from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, hash?: string) => void;
  onOpenBooking: () => void;
}

export const Logo: React.FC<{ light?: boolean }> = () => (
  <span className="flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#00BFFF] via-[#06B6D4] to-[#8B5CF6] text-white shadow-glow-blue">
      <Layers size={17} strokeWidth={2.4} />
    </span>
    <span className="text-lg font-extrabold tracking-tight text-[#E4E4E7]">
      deepli<span className="text-[#00BFFF]">X</span>
    </span>
  </span>
);

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "solutions", label: "Solutions" },
    { id: "how-we-work", label: "Methodology" },
    { id: "about", label: "About" },
    { id: "systems-lab", label: "Systems Lab" },
    { id: "blueprint", label: "Blueprint" },
    { id: "careers", label: "Careers" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-[#121212]/90 shadow-soft-md backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10"
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          data-testid="nav-logo"
          className="text-left"
          aria-label="deepliX home"
        >
          <Logo />
        </button>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 xl:gap-1.5 lg:flex" data-testid="nav-links">
          {navLinks.map((l) => {
            const isActive = currentView === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => handleNavClick(l.id)}
                data-testid={`nav-link-${l.id}`}
                className={`rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#1E1E1E] text-[#00BFFF] border border-[#00BFFF]/30 shadow-glow-blue"
                    : "text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]"
                }`}
              >
                {l.id === "blueprint" ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#00BFFF]" />
                    {l.label}
                  </span>
                ) : (
                  l.label
                )}
              </button>
            );
          })}
        </div>

        {/* CTA & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Direct Calendly Meeting Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            data-testid="nav-book-meeting-button"
            title="Book Instant Discovery Call"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#00BFFF]/40 bg-[#1E1E1E] px-3.5 py-2 text-xs font-bold text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#121212] transition-all shadow-glow-blue"
          >
            <Calendar size={13} />
            <span>Book Call</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            data-testid="nav-start-conversation-button"
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-4 py-2 text-xs font-bold text-[#121212] transition-all duration-300 hover:shadow-glow-blue hover:brightness-110 md:inline-flex"
          >
            <span>Contact</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick("admin")}
            data-testid="nav-admin-link"
            title="Admin Lead Inbox"
            className={`grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#1E1E1E] text-[#A1A1AA] transition-colors hover:border-[#00BFFF]/40 hover:text-[#E4E4E7] ${
              currentView === "admin" ? "bg-[#00BFFF]/15 text-[#00BFFF] border-[#00BFFF]/40" : ""
            }`}
          >
            <ShieldCheck size={16} />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-menu-button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#1E1E1E] text-[#E4E4E7] lg:hidden"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          data-testid="mobile-nav-panel"
          className="border-t border-white/10 bg-[#121212]/95 px-6 py-5 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((l) => {
              const isActive = currentView === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleNavClick(l.id)}
                  data-testid={`mobile-nav-link-${l.id}`}
                  className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                    isActive ? "bg-[#1E1E1E] text-[#00BFFF] border border-[#00BFFF]/30" : "text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                data-testid="mobile-book-meeting-button"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#00BFFF]/40 bg-[#1E1E1E] px-4 py-3 text-sm font-bold text-[#00BFFF]"
              >
                <Calendar size={16} />
                <span>Book Instant Meeting (Calendly)</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                data-testid="mobile-nav-start-conversation-button"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00BFFF] to-[#06B6D4] px-4 py-3 text-sm font-bold text-[#121212]"
              >
                <span>Send Direct Message</span> <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
