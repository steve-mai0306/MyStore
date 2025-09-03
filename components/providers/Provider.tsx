"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./UserProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <ProgressProvider
          height="4px"
          color="black"
          options={{ showSpinner: false }}
          shallowRouting
        >
          <UserProvider>
            {children}
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ProgressProvider>
      </QueryClientProvider>
      <Toaster richColors position="bottom-right" closeButton />
    </SessionProvider>
  );
}

export default Providers;
