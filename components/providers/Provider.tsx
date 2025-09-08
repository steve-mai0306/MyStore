"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./UserProvider";


const ProgressProvider = dynamic(
  () => import("@bprogress/next").then((m) => m.AppProgressProvider),
  { ssr: false }
);

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
          height="3px"
          color="#0A2FFF"
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
