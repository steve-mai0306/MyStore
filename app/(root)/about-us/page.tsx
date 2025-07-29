"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { StyledBreadcrumb } from "@/components/styled";
import Masonry from "@/components/animated/Mansory";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/animated";
import Accordion from "@/components/ui/accordion";
import { RetroButton } from "@/components/animated";
import { ArrowRight } from "lucide-react";
import { MagicBento } from "@/components/animated";
import { AnimatedContent } from "@/components/animated";

const items = [
  {
    id: "1",
    img: "assets/about-us-banner.jpg",
    url: "https://example.com/one",
    height: 600,
  },
  {
    id: "2",
    img: "assets/about-us-banner-4.jpg",
    url: "https://example.com/two",
    height: 590,
  },
  {
    id: "3",
    img: "assets/about-us-banner-3.png",
    url: "https://example.com/three",
    height: 700,
  },
  {
    id: "4",
    img: "assets/about-us-banner-2.jpg",
    url: "https://example.com/three",
    height: 500,
  },
  {
    id: "5",
    img: "assets/banner-subsection-1.jpg",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "6",
    img: "assets/banner-subsection-3.3.jpg",
    url: "https://example.com/three",
    height: 600,
  },
];

const faqData = [
  {
    title: "HOW DOES OUR SHOP WORKS?",
    content:
      "React's key features include its component-based architecture, virtual DOM for performance, JSX for templating, and one-way data flow. It can also be rendered on the server side, making it flexible for various use cases.",
  },
  {
    title: "HOW CAN WE HELP?",
    content:
      "Tailwind CSS accelerates development by providing a vast library of utility classes that can be applied directly in your HTML. This eliminates the need to write custom CSS for most styling, allowing for rapid prototyping and consistent design.",
  },
  {
    title: "WHAT SIZE AND HOW THICK IS A WALL ART PICTURE?",
    content:
      "Best practices for accessibility include using semantic HTML (e.g., <button>, <nav>), providing text alternatives for images (alt text), ensuring sufficient color contrast, enabling keyboard navigation, and using ARIA roles and attributes where necessary.",
  },
  {
    title: "WHAT IS A BEST BUSINESS GALLERY SHAPE & LAYOUT?",
    content:
      "For complex applications, state can be managed using built-in hooks like `useReducer` and `useContext` for medium-sized apps, or dedicated state management libraries like Redux, Zustand, or MobX for larger, more intricate state requirements.",
  },
  {
    title: "HOW TO MAKE YOUR ART AWESOME THING?",
    content:
      "For complex applications, state can be managed using built-in hooks like `useReducer` and `useContext` for medium-sized apps, or dedicated state management libraries like Redux, Zustand, or MobX for larger, more intricate state requirements.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <StyledBreadcrumb route="About Us" />
      <Container>
        <section className="first-section pb-15">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-1/2 p-6">
              <h2 className="text-2xl lg:text-5xl my-3">
                BRING YOU THE BEST COLLECTIONS FOR YOUR STYLE
              </h2>
              <h2 className="text-lg text-muted-foreground my-3">
                Browse your favorite brands in one place .Get skincare made to
                fit—with some of the top acne-busting ingredients prescribed by
                dermatologists nationwide.
              </h2>
              <h2 className="text-xl lg:text-3xl my-3">OUR MISSON</h2>
              <h2 className="text-lg text-muted-foreground my-3">
                Get skincare made to fit—with some of the top acne-busting
                ingredients prescribed by dermatologists nationwide.
              </h2>
              <h2 className="text-xl lg:text-3xl my-3">
                PRODUCING THE HIGHEST QUALITY PRODUCTS
              </h2>
              <h2 className="text-lg text-muted-foreground my-3">
                Complexion-perfecting natural foundation enriched with
                antioxidant-packed superfruits, vitamins, and other
                skin-nourishing nutrients.
              </h2>

              <Separator className="my-6" />
              <div className="flex flex-row items-center w-full">
                <div className="flex flex-col items-start w-1/2">
                  <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl font-bold"
                  />
                  <p className="text-muted-foreground">HAPPY CLIENTS</p>
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <CountUp
                    from={0}
                    to={92}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl font-bold"
                  />
                  <p className="text-muted-foreground">5 START REVIEWED</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-center p-6">
              <Masonry
                items={items}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </div>
          </div>
        </section>
        <section className="second-section pb-15">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full items-center justify-center lg:w-1/2 p-6 bg-gradient-to-b from-pink-100 relative">
              <span className="text-5xl tracking-wider font-bolb text-pink-400 leading-5 text-center uppercase">
                See Tips
              </span>
              <Image
                src="/assets/about-us-banner-5.png"
                alt="banner-img"
                width={500}
                height={500}
                className="align-middle"
              />
              <RetroButton
                variant="secondary"
                size="sm"
                className="uppercase absolute bottom-10 w-xs"
              >
                Contact us <ArrowRight className="ml-2" />
              </RetroButton>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-start p-6">
              <h2 className="text-2xl lg:text-5xl my-3 uppercase">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col items-center justify-center font-sans py-4 transition-colors duration-500">
                <div className="w-full max-w-2xl mx-auto">
                  <Accordion items={faqData} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="third-section pb-15">
          <h2 className="text-2xl lg:text-5xl my-3 text-center">
            WHAT MAKE US DIFFERENT?
          </h2>
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
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              disableAnimations
              clickEffect={false}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
          </AnimatedContent>
        </section>
      </Container>
    </>
  );
}
