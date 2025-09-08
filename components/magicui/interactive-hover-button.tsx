import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
    loading?: boolean;
    loadingText?: React.ReactNode;
    loadingIcon?: React.ReactNode;
  };

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    { children, className, icon, loading, loadingText, loadingIcon, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative w-auto overflow-hidden rounded-full border border-black dark:border-white p-1.5 sm:p-2 px-4 sm:px-6 text-center font-semibold",
          loading || props.disabled
            ? "bg-background dark:bg-neutral-900 cursor-not-allowed opacity-70"
            : "group bg-background dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black cursor-pointer",
          className
        )}
        disabled={Boolean(props.disabled) || Boolean(loading)}
        aria-busy={Boolean(loading)}
        aria-disabled={Boolean(props.disabled) || Boolean(loading)}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {loadingIcon ? (
              loadingIcon
            ) : (
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" />
              </svg>
            )}
            <span className="text-xs sm:text-base">{loadingText ?? children}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <span className="inline-block text-xs sm:text-base transition-all duration-300 group-hover:translate-x-8 sm:group-hover:translate-x-12 group-hover:opacity-0">
                {children}
              </span>
              {icon && (
                <span className="inline-block transition-all duration-300 group-hover:translate-x-8 sm:group-hover:translate-x-12 group-hover:opacity-0">
                  {icon}
                </span>
              )}
            </div>
            <div className="absolute top-0 z-10 flex h-full w-full translate-x-8 sm:translate-x-12 items-center justify-center gap-1 sm:gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-3 sm:group-hover:-translate-x-5 group-hover:opacity-100">
              <span className="text-xs sm:text-base">{children}</span>
              {icon ? icon : <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
            </div>
          </>
        )}
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
