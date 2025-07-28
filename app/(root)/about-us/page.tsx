"use client"

import React from "react";
import { StyledBreadcrumb } from "@/components/styled";


export default function AboutUsPage() {
  return (
    <div>
      <StyledBreadcrumb route="About Us" />
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-start justify-center">
            <div className="w-full ">
              {/* Content for About Us page goes here */}
              <h1>About Us</h1>
              <p>Welcome to our store! We are dedicated to providing the best products and services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}