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
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface HeaderProps {
  hiddenAt?: string | string[];
}

export function Header({ hiddenAt }: HeaderProps) {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  const normalizePath = (path?: string) => {
    if (!path) return "/";
    return path === "/" ? "/" : path.replace(/\/+$/, "");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const shouldHide =
    Boolean(hiddenAt) &&
    (Array.isArray(hiddenAt)
      ? hiddenAt.some((path) =>
          normalizePath(pathname).startsWith(normalizePath(path))
        )
      : normalizePath(pathname).startsWith(normalizePath(hiddenAt)));
  if (shouldHide) {
    return null;
  }

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

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody
          userAvatar={session?.user?.image ?? undefined}
          userName={session?.user?.name ?? undefined}
          userSlug={session?.user?.slug ?? undefined}
          isAuthenticated={status === "authenticated"}
          isUserLoading={status === "loading"}
          logOut={async () => {
            await signOut({ callbackUrl: "/authen" });
          }}
        >
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
              {status === "authenticated" ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <InteractiveHoverButton className="w-full">
                    Dashboard
                  </InteractiveHoverButton>
                </Link>
              ) : (
                <Link href="/authen" onClick={() => setIsMobileMenuOpen(false)}>
                  <InteractiveHoverButton className="w-full">
                    Login
                  </InteractiveHoverButton>
                </Link>
              )}
              {status === "unauthenticated" ? (
                <Link href="/authen" onClick={() => setIsMobileMenuOpen(false)}>
                  <InteractiveHoverButton className="w-full">
                    Login
                  </InteractiveHoverButton>
                </Link>
              ) : (
                <Link
                  href="/auth/logout"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <InteractiveHoverButton className="w-full">
                    Logout
                  </InteractiveHoverButton>
                </Link>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </>
  );
}
