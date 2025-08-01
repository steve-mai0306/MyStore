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
import dynamic from "next/dynamic";

const items = [
  {
    id: "1",
    img: "assets/about-us-banner-5.jpg",
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

const NetworkVisualization = dynamic(
  () => import("@/components/animated/Network"),
  { ssr: false }
);

export default function AboutUsPage() {
  return (
    <>
      <StyledBreadcrumb route="About Us" />
      <Container>
        <section className="introduction-section pb-15">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-col w-full lg:w-1/2">
              <h2 className="text-2xl lg:text-4xl my-3 font-bold uppercase">
                Bring you the best collections for your style
              </h2>
              <h2 className="text-lg text-muted-foreground my-3">
                Browse your favorite brands in one place .Get skincare made to
                fit—with some of the top acne-busting ingredients prescribed by
                dermatologists nationwide.
              </h2>
              <h2 className="text-xl lg:text-3xl my-3 uppercase">Our Mission</h2>
              <h2 className="text-lg text-muted-foreground my-3">
                Get skincare made to fit—with some of the top acne-busting
                ingredients prescribed by dermatologists nationwide.
              </h2>
              <h2 className="text-xl lg:text-3xl my-3 uppercase">
                Producing the highest quality products
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
                  <p className="text-muted-foreground uppercase">Happy Clients</p>
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
                  <p className="text-muted-foreground uppercase">5 Start Reviewed</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-center lg:justify-start">
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
        <section className="faqs-section pb-15">
          <div className="flex flex-col lg:flex-row gap-10"> 
            <div className="flex flex-col w-full items-center justify-center lg:w-1/2 bg-gradient-to-b from-pink-100 to-blue-300 relative gap-2 py-5">
              <span className="text-3xl md:text-5xl tracking-wider font-bold text-pink-400 leading-5 text-center uppercase ">
                See Tips
              </span>
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
                  src="/assets/about-us-banner-5.png"
                  alt="banner-img"
                  width={600}
                  height={600}
                />
              </AnimatedContent>

              <RetroButton
                variant="secondary"
                size="sm"
                className="uppercase absolute bottom-10 w-xs"
              >
                Contact us <ArrowRight className="ml-2" />
              </RetroButton>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-start">
              <h2 className="text-2xl lg:text-4xl my-3 uppercase font-bold">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col items-center justify-center py-4 transition-colors duration-500">
                <div className="w-full mx-auto">
                  <Accordion items={faqData} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="spotlight-section pb-15">
          <h2 className="text-2xl lg:text-4xl my-3 text-center font-bold uppercase">
            What make us different?
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
        <section className="network-section pb-15">
          <h2 className="text-2xl lg:text-4xl my-3 text-center font-bold uppercase">
            We bring people together
          </h2>
          <h2 className="text-lg text-muted-foreground my-3 text-center">
            Connecting vendors and customers seamlessly — building
            relationships, enabling collaboration, and making every interaction
            easier and more meaningful.
          </h2>
          <NetworkVisualization />
        </section>
      </Container>
    </>
  );
}
