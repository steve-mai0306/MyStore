import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, icon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-black bg-background hover:bg-black p-2 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
        {icon && (
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {icon}
          </span>
        )}
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        {icon ? icon : <ArrowRight />}
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";