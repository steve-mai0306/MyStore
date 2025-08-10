"use client";

import Image from "next/image";
import { StyledBreadcrumb } from "@/components/styled";
import { Container } from "@/components/layout";
import { AnimatedContent } from "@/components/animated";
import Accordion from "@/components/ui/accordion";
import { Newsletter } from "../_components";

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
export default function FAQsPage() {
  return (
    <>
      <StyledBreadcrumb route="FAQs" />
      <Container>
        <section className="faqs-section pb-15">
          <h2 className="text-2xl lg:text-4xl my-3 uppercase font-bold tracking-wide text-center">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            <div className="flex flex-col w-full items-center justify-center lg:w-1/2 bg-gradient-to-b from-pink-100 to-blue-300 relative gap-2 py-5">
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
              <div
                className="rounded-2xl absolute rotate-[10deg] left-0 bottom-10 sm:bottom-30 border-blue-500 border-2 animate-in fade-in duration-1000
    w-[140px] h-[200px] sm:w-[220px] sm:h-[250px] xs:left-2 xs:bottom-10 xs:border xs:p-1"
              >
                <Image
                  src="/assets/about-us-banner-2.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-2xl"
                />
              </div>

              <div className="absolute z-10 bottom-0 right-10 p-5 border-2 rounded-2xl bg-muted border-pink-500 rotate-[-10deg] uppercase text-xl sm:text-4xl text-center animate-in fade-in duration-1000">
                Frequently <br></br> asked <br></br> questions{" "}
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center justify-start">
              <div className="flex flex-col items-center justify-center py-4 transition-colors duration-500">
                <div className="w-full mx-auto">
                  <Accordion items={faqData} />
                </div>
              </div>
            </div>
          </div>
          <Newsletter />
        </section>
      </Container>
    </>
  );
}
