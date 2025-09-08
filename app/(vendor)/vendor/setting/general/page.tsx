"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout";
import { VendorWrapper } from "@/app/(vendor)/_components";
import {
  ThemeToggleButton,
  useThemeTransition,
} from "@/components/ui/shadcn-io/theme-toggle-button";
import { Button } from "@/components/ui";

export default function VendorGeneralSettingsPage() {
  const { setTheme, resolvedTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newMode = resolvedTheme === "dark" ? "light" : "dark";
    startTransition(() => {
      setTheme(newMode);
    });
  }, [resolvedTheme, setTheme, startTransition]);

  const currentTheme =
    resolvedTheme === "system" ? "light" : (resolvedTheme as "light" | "dark");

  if (!mounted) {
    return null;
  }

  return (
    <VendorSidebarLayout
      breadcrumb={[
        { label: "Dashboard", href: "/vendor" },
        { label: "General Settings" },
      ]}
    >
      <VendorWrapper>
        <h1 className="text-3xl font-bold my-5">General Settings</h1>

        {/* Accessibility Section */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-2">Accessibility</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <Label htmlFor="high-contrast">System Theme</Label>
              <ThemeToggleButton
                theme={currentTheme}
                onClick={handleThemeToggle}
                variant="circle-blur"
                start="top-right"
              />
              <div className="text-center">
                <span className="text-xs font-medium">Theme Mode</span>
                <p className="text-xs text-muted-foreground">
                  Toggle between light and dark mode for better accessibility
                  and comfort.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <Switch id="high-contrast" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="text-size">Large Text</Label>
              <Switch id="text-size" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Notifications Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sms-notifications" />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push-notifications" />
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
          </div>
        </section>

        <Separator />

        {/* Privacy Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Switch id="profile-visibility" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="search-engine-indexing" />
              <Label htmlFor="search-engine-indexing">
                Allow search engines to index my profile
              </Label>
            </div>
          </div>
        </section>

        <Separator />

        {/* Data Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Data</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-download">Download My Data</Label>
              <Button variant="outline" id="data-download">
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-delete">Delete My Account</Label>
              <Button variant="destructive" id="data-delete">
                Delete
              </Button>
            </div>
          </div>
        </section>
      </VendorWrapper>
    </VendorSidebarLayout>
  );
}
