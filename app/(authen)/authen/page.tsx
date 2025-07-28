"use client";

import React from "react";
import { LoginForm, RegisterForm } from "../_components";
import { AnimatedContent } from "@/components/animated";
import { StyledBreadcrumb } from "@/components/styled";

export default function LoginPage() {
  return (
    <AnimatedContent
      distance={150}
      direction="vertical"
      reverse={false}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.3}
    >
      <div>
        <StyledBreadcrumb route="Login" />
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-start justify-center">
              <div className="w-full ">
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-start justify-center">
              <div className="w-full ">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContent>
  );
}
