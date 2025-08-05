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
} from "../animated";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import Link from "next/link";

export function Header() {
  const navItems = [
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Pricing Plans",
      link: "/pricing-plans",
    },
    {
      name: "Shop",
      link: "#shop",
    },
    {
      name: "Blog",
      link: "#blog",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "FAQs",
      link: "/faqs",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
                className="relative text-neutral-600 dark:text-neutral-300 uppercase"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <InteractiveHoverButton
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </InteractiveHoverButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </>
  );
}
