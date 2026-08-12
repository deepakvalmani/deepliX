import React, { useEffect, useState } from "react";
import { Layers, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, hash?: string) => void;
}

export const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => (
  <span className="flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-glow-blue">
      <Layers size={17} strokeWidth={2.4} />
    </span>
    <span className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-[#0F172A]"}`}>
      deepli<span className="text-blue-500">X</span>
    </span>
  </span>
);

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "capabilities", label: "Capabilities" },
    { id: "how-we-work", label: "How We Work" },
    { id: "systems-lab", label: "Systems Lab" },
    { id: "about", label: "About" },
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
          ? "border-b border-white/60 bg-white/80 shadow-soft-md backdrop-blur-xl"
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
        <div className="hidden items-center gap-1.5 lg:flex" data-testid="nav-links">
          {navLinks.map((l) => {
            const isActive = currentView === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => handleNavClick(l.id)}
                data-testid={`nav-link-${l.id}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            data-testid="nav-start-conversation-button"
            className="group hidden items-center gap-2 rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-glow-blue sm:inline-flex"
          >
            Start a Conversation
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-menu-button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-900 lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          data-testid="mobile-nav-panel"
          className="border-t border-slate-100 bg-white/95 px-6 py-5 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleNavClick(l.id)}
                data-testid={`mobile-nav-link-${l.id}`}
                className={`rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                  currentView === l.id ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              data-testid="mobile-nav-start-conversation-button"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#0F172A] px-5 py-3.5 text-sm font-semibold text-white"
            >
              Start a Conversation <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
