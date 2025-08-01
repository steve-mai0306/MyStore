"use client";

import { Container } from "@/components/layout";
import { StyledBreadcrumb } from "@/components/styled";
import Image from "next/image";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { CircleCheck, ArrowRight } from "lucide-react";
import { AnimatedContent, RetroButton } from "@/components/animated";

export default function SellWithUsPage() {
  return (
    <>
      <StyledBreadcrumb route="Sell With Us" />
      <Container>
        <div className="pb-15">
          <h2 className="text-2xl lg:text-4xl my-3 text-center font-bold uppercase">
            Step to become a seller
          </h2>
          <section className="step-1-section flex flex-col lg:flex-row gap-10 pt-10">
            <div className="flex flex-col w-full items-center justify-center h-[55vh] md:h-[60vh] lg:h-[100vh] lg:w-1/2 bg-gradient-to-b from-pink-100 to-blue-300 relative gap-2 py-5">
              <div className="relative w-full h-[50vh]">
                <div className="absolute top-20 left-[40%] rotate-[5deg] z-10 w-[150px] h-[150px] md:w-[200px] md:h-[250px] lg:w-[250px] lg:h-[300px] animate-in slide-in-from-right-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner.jpg"
                    alt=""
                    fill
                    className="rounded-xl shadow-lg"
                  />
                </div>

                <div className="absolute top-[20%] left-[10%] rotate-[-10deg] z-20 w-[140px] h-[140px] md:w-[200px] md:h-[250px] lg:w-[200px] lg:h-[270px] animate-in slide-in-from-left-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner-2.jpg"
                    alt=""
                    fill
                    className="rounded-xl shadow-lg border-2 border-white"
                  />
                </div>

                <div className="absolute top-32 left-[30%] z-40 w-[150px] h-[250px] md:w-[150px] md:h-[250px] lg:w-[200px] lg:h-[350px] animate-in slide-in-from-bottom-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner-3.png"
                    alt=""
                    fill
                    className=""
                  />
                </div>

                <button className="absolute bottom-20 md:bottom-0 left-1/2 -translate-x-1/2 z-40 bg-white border-2 border-black px-6 py-2 rounded-full font-semibold shadow-lg animate-in  fade-in duration-700 text-sm md:text-lg">
                  CHOOSE YOUR OWN
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-start justify-start">
              <h2
                className="text-5xl lg:text-7xl my-3 uppercase font-bold text-rose-500"
                style={{
                  WebkitTextStroke: "1px black",
                }}
              >
                01
              </h2>
              <h2 className="text-2xl lg:text-4xl my-3 uppercase font-bold">
                Customize & design your shirts
              </h2>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg text-muted-foreground my-3">
                  Lorem ipsum det, consec tetur adipiscing elit duis nec fringi
                  det, consec tetur. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore consec adipiscing elit duis
                  nec fringi det, consec tetur. Lorem ipsum , consec tetur
                  adipiscing...
                </h2>
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <div className="inline-flex gap-2">
                    <span className="text-rose-500">
                      <CircleCheck />
                    </span>
                    <span className="font-medium">
                      Mix and match colors, sizes, and designs
                    </span>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <div className="inline-flex gap-2">
                    <span className="text-rose-500">
                      <CircleCheck />
                    </span>
                    <span className="font-medium">Describe the details</span>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <div className="inline-flex gap-2">
                    <span className="text-rose-500">
                      <CircleCheck />
                    </span>
                    <span className="font-medium">
                      Upload high quality images
                    </span>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <div className="inline-flex gap-2">
                    <span className="text-rose-500">
                      <CircleCheck />
                    </span>
                    <span className="font-medium">
                      Upload the products to customer
                    </span>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <RetroButton variant="secondary" className="w-fit">
                    Start selling today <ArrowRight className="ml-2" />
                  </RetroButton>
                </BoxReveal>
              </div>
            </div>
          </section>

          <section className="step-2-section flex flex-col lg:flex-row gap-10 pt-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col w-full lg:w-1/2 items-start justify-start">
                <h2
                  className="text-5xl lg:text-7xl my-3 uppercase font-bold text-rose-500"
                  style={{
                    WebkitTextStroke: "1px black",
                  }}
                >
                  02
                </h2>
                <h2 className="text-2xl lg:text-4xl my-3 uppercase font-bold">
                  Manage & Update your store
                </h2>
                <div className="flex flex-col">
                  <h2 className="text-lg text-muted-foreground my-3">
                    Lorem ipsum det, consec tetur adipiscing elit duis nec
                    fringi det, consec tetur. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore consec
                    adipiscing elit duis nec fringi det, consec tetur. Lorem
                    ipsum , consec tetur adipiscing...
                  </h2>
                  <BoxReveal boxColor={"blue"} duration={0.5}>
                    <h2 className="text-xl my-3 uppercase font-bold">
                      100% free editing tools
                    </h2>
                  </BoxReveal>
                  <BoxReveal boxColor={"blue"} duration={0.5}>
                    <h2 className="text-lg text-muted-foreground my-3">
                      Complexion-perfecting natural foundation enriched with
                      antioxidant-packed superfruits, vitamins, and other
                      skin-nourishing nutrients.
                    </h2>
                  </BoxReveal>
                  <BoxReveal boxColor={"blue"} duration={0.5}>
                    <h2 className="text-xl my-3 uppercase font-bold">
                      High quality & real-time communicating
                    </h2>
                  </BoxReveal>
                  <BoxReveal boxColor={"blue"} duration={0.5}>
                    <h2 className="text-lg text-muted-foreground my-3">
                      Complexion-perfecting natural foundation enriched with
                      antioxidant-packed superfruits, vitamins, and other
                      skin-nourishing nutrients.
                    </h2>
                  </BoxReveal>
                  <BoxReveal boxColor={"blue"} duration={0.5}>
                    <RetroButton variant="secondary" className="w-fit">
                      Start selling today <ArrowRight className="ml-2" />
                    </RetroButton>
                  </BoxReveal>
                </div>
              </div>

              <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.2}
                delay={0.3}
              >
                <Image
                  src="/assets/about-us-banner-5.jpg"
                  alt="banner-img"
                  width={600}
                  height={600}
                />
              </AnimatedContent>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
