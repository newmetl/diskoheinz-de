"use client";

import { useState, useEffect } from "react";
import { Calendar, PlayCircle, PenSquare, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Media", href: "#media" },
  { label: "Gigs", href: "#gigs" },
  { label: "Booking", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className="text-2xl font-bold tracking-tighter text-white font-headline uppercase"
        >
          DISKOHEINZ
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-headline uppercase tracking-tighter text-on-surface-variant hover:text-white transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-surface/95 backdrop-blur-xl md:hidden border-b border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 font-headline uppercase tracking-tighter text-on-surface-variant hover:text-white hover:bg-surface-container-low transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 w-full md:hidden z-50 bg-surface/80 backdrop-blur-lg border-t border-surface-container-highest flex justify-around items-center h-16 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        <a
          href="#gigs"
          className="flex flex-col items-center justify-center text-on-surface-variant active:scale-110 transition-transform"
        >
          <Calendar size={20} />
          <span className="text-[10px] uppercase font-medium mt-1">Gigs</span>
        </a>
        <a
          href="#media"
          className="flex flex-col items-center justify-center text-on-surface-variant active:scale-110 transition-transform"
        >
          <PlayCircle size={20} />
          <span className="text-[10px] uppercase font-medium mt-1">Media</span>
        </a>
        <a
          href="#booking"
          className="flex flex-col items-center justify-center text-secondary active:scale-110 transition-transform"
        >
          <PenSquare size={20} />
          <span className="text-[10px] uppercase font-medium mt-1">
            Booking
          </span>
        </a>
      </nav>
    </>
  );
}
