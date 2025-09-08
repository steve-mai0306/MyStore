"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { SplittingText } from "@/components/ui/shadcn-io/splitting-text";
import { useTheme } from "next-themes";

export function DashBoardLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const lightLogo = "/assets/new-my-store-logo.png";
  const darkLogo = "/assets/new-my-store-logo-dark.png";

  const logoSrc = mounted && resolvedTheme === "dark" ? darkLogo : lightLogo;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Link href="/vendor/dashboard">
        <Image src={logoSrc} alt="Logo" width={70} height={70} />
      </Link>

      <SplittingText
        text="Welcome vendor"
        className="hidden sm:block text-center text-lg font-semibold mt-2"
        type="words"
        inView={true}
        motionVariants={{
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          stagger: 0.3,
        }}
      />
    </div>
  );
}
