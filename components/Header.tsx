"use client";

import React, { useState } from "react";
import { LucideMenu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Studio", href: "#" },
    { name: "About", href: "#" },
    { name: "Journal", href: "#" },
    { name: "Reach Us", href: "#" },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav className="relative z-20 max-w-7xl mx-auto px-8 py-6 flex justify-between items-center bg-background/80 backdrop-blur-sm">
        <div className="flex items-center">
          <img
            src="/logo without element.svg"
            alt="Logo"
            className="w-40 h-full"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-inter transition-colors ${
                link.name === "Home"
                  ? "text-heading"
                  : "text-muted hover:text-heading"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:block rounded-full px-6 py-2.5 text-sm font-inter bg-button text-button-text hover:bg-button-hover hover:scale-[1.03] transition-all duration-200">
            Begin Journey
          </button>
          <button
            className="md:hidden p-2 text-heading"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <LucideMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center space-y-8 md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-heading"
          >
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-display ${
                link.name === "Home"
                  ? "text-heading"
                  : "text-muted hover:text-heading"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="rounded-full px-10 py-4 bg-button text-button-text hover:bg-button-hover font-inter mt-4 transition-colors">
            Begin Journey
          </button>
        </div>
      )}
    </>
  );
}
