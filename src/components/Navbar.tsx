"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Gigs", href: "#gigs" },
  { label: "Booking", href: "#booking" },
  { label: "Bio", href: "#bio" },
];

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show nav as soon as hero is no longer (meaningfully) intersecting
        setShowNav(!entry.isIntersecting);
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-hidden={!showNav}
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        showNav
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <a href="#" className="flex items-center">
        <Image
          src="/images/logo_260x127.png"
          alt="Diskoheinz"
          width={130}
          height={63}
          priority
          className="h-auto w-[96px]"
        />
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
        aria-label="Toggle menu"
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
  );
}
