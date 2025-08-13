"use client";

import React from "react";
import { LoginForm, RegisterForm } from "../_components";
import { AnimatedContent } from "@/components/animated";
import { StyledBreadcrumb } from "@/components/styled";
import { Container } from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "../store/useAuthStore";
import { CheckCircle2Icon, Mail } from "lucide-react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";

export default function LoginPage() {
  const { customerRegistered, vendorRegistered, reset } = useAuthStore();
  React.useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
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
          {(customerRegistered || vendorRegistered) && (
            <div className="my-4">
              <Alert variant="success">
                <CheckCircle2Icon />
                <AlertTitle>Registration successfully!</AlertTitle>
                <AlertDescription>
                  {customerRegistered
                    ? "We've sent a email to your email address. Please check your email for the next steps."
                    : "Welcome vendors. We've sent a email to your email address. Please check your email for the next steps."}
                  <InteractiveHoverButton
                    className="w-fit mt-2"
                    icon={<Mail size={20} />}
                  >
                    <Link target="_blank" rel="noopener noreferrer" href="https://mail.google.com/"> Go to Gmail</Link>
                   
                  </InteractiveHoverButton>
                </AlertDescription>
              </Alert>
            </div>
          )}
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
