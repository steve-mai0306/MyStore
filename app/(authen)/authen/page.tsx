"use client";

import React from "react";
import { LoginForm, RegisterForm } from "../_components";
import { AnimatedContent } from "@/components/animated";
import { StyledBreadcrumb } from "@/components/styled";
import { Container } from "@/components/layout";

export default function LoginPage() {
  return (
    <>
      <StyledBreadcrumb route="Login" />
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
        <Container>
          <div className="grid min-h-svh lg:grid-cols-2 gap-4">
            <>
              <LoginForm />
            </>

            <>
              <RegisterForm />
            </>
          </div>
        </Container>
      </AnimatedContent>
    </>
  );
}
