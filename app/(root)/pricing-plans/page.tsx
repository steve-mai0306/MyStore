"use client";

import { StyledBreadcrumb } from "@/components/styled";
import { Container } from "@/components/layout";
import { PricingPlan } from "../_components";

export default function PricingPlansPage() {
  return (
    <>
      <StyledBreadcrumb route="Pricing Plans" />
      <Container>
        <PricingPlan />
      </Container>
    </>
  );
}
