"use client";
import { useState } from "react";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  RetroButton,
} from "../animated";
import Link from "next/link";

export function Header() {
  const navItems = [
    {
      name: "FEATURES",
      link: "#features",
    },
    {
      name: "PRICING",
      link: "#pricing",
    },
    {
      name: "SHOP",
      link: "#shop",
    },
    {
      name: "BLOG",
      link: "#blog",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <RetroButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Login
              </RetroButton>
              <RetroButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Book a call
              </RetroButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
