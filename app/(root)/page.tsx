"use client";

import React from "react";
import { SwiperCarousel } from "./_components";
import { Container } from "@/components/layout";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  CategoryCard,
  RetroButton,
  CurvedLoop,
  AnimatedCarousel,
  AnimatedContent,
  MagicBento,
} from "@/components/animated";
import { FeatureCard, ProductListSection } from "./_components";
import {
  Globe,
  Shirt,
  Heart,
  CreditCard,
  Play,
  ArrowRight,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FeedbackMarquee } from "./_components";

export default function Home() {
  return (
    <>
      <section className="carousel-section">
        <SwiperCarousel />
      </section>

      <section className="product-category-section pt-20">
        <Container>
          <div className="flex flex-col lg:flex-row items-start lg:items-center w-full justify-between">
            <h2 className="text-2xl lg:text-5xl mb-6 w-[40%] font-bold tracking-wide">
              FIND A FIT <br></br> FOR EVERYONE
            </h2>
            <div className="category-tag-list flex flex-wrap justify-start lg:justify-end gap-4 w-[70%]">
              <InteractiveHoverButton className="bg-yellow-700 py-4">
                T-SHIRT
              </InteractiveHoverButton>
              <InteractiveHoverButton className="bg-teal-200 py-4 ">
                SWEARTSHIRT
              </InteractiveHoverButton>
              <InteractiveHoverButton className="bg-pink-500 py-4">
                HOODIE
              </InteractiveHoverButton>
              <InteractiveHoverButton className="bg-blue-400 py-4">
                TANK TOP
              </InteractiveHoverButton>
              <InteractiveHoverButton className="bg-lime-500 py-4">
                LONG_SLEEVES
              </InteractiveHoverButton>
            </div>
          </div>
          <div className="pt-10 flex flex-wrap md:flex-row gap-4 items-center w-full justify-center xl:justify-between">
            <CategoryCard
              imageSrc="/assets/men-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="30rem"
              containerWidth="22rem"
              imageHeight="30rem"
              imageWidth="22rem"
              rotateAmplitude={5}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <InteractiveHoverButton icon={<ChevronRightIcon />}>
                  MEN&apos;S COLLECTION
                </InteractiveHoverButton>
              }
            />
            <CategoryCard
              imageSrc="/assets/kid-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="30rem"
              containerWidth="22rem"
              imageHeight="30rem"
              imageWidth="22rem"
              rotateAmplitude={5}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <InteractiveHoverButton icon={<ChevronRightIcon />}>
                  KID&apos;S COLLECTION
                </InteractiveHoverButton>
              }
            />
            <CategoryCard
              imageSrc="/assets/women-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="30rem"
              containerWidth="22rem"
              imageHeight="30rem"
              imageWidth="22rem"
              rotateAmplitude={5}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <InteractiveHoverButton icon={<ChevronRightIcon />}>
                  WOMEN&apos;S COLLECTION
                </InteractiveHoverButton>
              }
            />
          </div>
        </Container>
      </section>

      <section className="shop-featured-highlights-section py-20">
        <Container>
          <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-4">
            <FeatureCard
              icon={<Globe className="icon" size={64} strokeWidth={1} />}
              title="World"
              subtitle="wide shipping"
            />
            <FeatureCard
              icon={<Shirt className="icon" size={64} strokeWidth={1} />}
              title="Premium Quality"
              subtitle=" Shirts"
            />
            <FeatureCard
              icon={<Heart className="icon" size={64} strokeWidth={1} />}
              title="Support Agood"
              subtitle="Causes"
            />
            <FeatureCard
              icon={<CreditCard className="icon" size={64} strokeWidth={1} />}
              title="Safe"
              subtitle="Online payment"
            />
          </div>
        </Container>
      </section>

      <section className="video-introduction-section py-20 w-full overflow-hidden bg-pink-100">
        <Container>
          <div className="flex flex-col lg:flex-row flex-wrap">
            <div className="sub-section-1 flex flex-col justify-center items-center align-middle w-full lg:w-[30%] p-3 ">
              <Image
                src="/assets/banner-subsection-1.jpg"
                alt="banner"
                width={220}
                height={220}
                className="border border-black rounded-lg shadow-lg rotate-z-[15deg] translate-y-5"
              />
              <Image
                src="/assets/banner-subsection-1.2.jpg"
                alt="banner"
                width={220}
                height={220}
                className="border border-black rounded-lg shadow-lg rotate-z-[-15deg] translate-x-[3rem] translate-y-[-5rem]"
              />
            </div>

            <div className="sub-section-2 flex flex-col w-full lg:w-[40%] p-3">
              <div className="size-full flex flex-col items-center justify-center overflow-hidden">
                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <h2 className="text-7xl font-semibold align-middle tracking-wider text-center">
                    SEE HOW WE <br />
                    <span className="block text-center">WORK</span>
                  </h2>
                </BoxReveal>

                <BoxReveal boxColor={"blue"} duration={0.5}>
                  <h2 className="mt-[.5rem] text-[1rem]">
                    UI library for <span className="">Design Engineers</span>
                  </h2>
                </BoxReveal>

                <InteractiveHoverButton className="mt-4">
                  <Play />
                </InteractiveHoverButton>
              </div>
            </div>

            <div className="sub-section-3 flex flex-col justify-center items-center align-middle w-full lg:w-[30%] p-3 ">
              <Image
                src="/assets/banner-subsection-3.1.jpg"
                alt="banner"
                width={150}
                height={150}
                className="border border-black rounded-lg shadow-lg"
              />
              <Image
                src="/assets/banner-subsection-3.2.jpg"
                alt="banner"
                width={220}
                height={220}
                className="rounded-lg shadow-lg rotate-z-[-15deg] translate-y-[-2rem] translate-x-[5rem]"
              />
              <Image
                src="/assets/banner-subsection-3.3.jpg"
                alt="banner"
                width={200}
                height={200}
                className="border border-black rounded-lg shadow-lg rotate-z-[15deg] translate-x-[-2rem] translate-y-[-4rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="top-sale-products py-20">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl lg:text-5xl uppercase font-bold  tracking-wide">
              What&apos;s hot?
            </h2>
            <RetroButton variant="link" className="uppercase">
              View all <ArrowRight className="ml-2" />
            </RetroButton>
          </div>
          <ProductListSection />
        </Container>
      </section>

      <section className="curved-loop-section bg-muted">
        <CurvedLoop
          marqueeText="MyStore ✦ Creative ✦ Accessible ✦ Affordable Products ✦ Morden ✦"
          speed={1}
          curveAmount={0}
          interactive={false}
          className=""
        />
      </section>
      <section className="extra-sale-section py-20">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="image-attachment align-middle w-full flex items-center justify-center  md:w-1/2 relative">
              <Image
                src="/assets/home-banner-4.jpg"
                alt="banner"
                width={660}
                height={880}
                className="w-full h-auto object-cover md:pr-5"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <InteractiveHoverButton
                className="uppercase absolute bottom-10 w-xs"
                icon={<ArrowRight />}
              >
                Shop now
              </InteractiveHoverButton>
            </div>

            <div className="flex flex-col justify-start items-center w-full  md:w-1/2">
              <h2 className="text-2xl lg:text-4xl uppercase mb-6 font-bold  tracking-wide">
                Extra sale 30% off
              </h2>
              <span className="mt-[-2%] px-[16%] pb-[3%] pt-0 text-center">
                <h2>
                  What’s more, we do it right! A full administration printing
                  background.
                </h2>
              </span>
              <div className="flex flex-row w-full">
                <AnimatedCarousel />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="feedback-marquee-section py-20">
        <h2 className="text-2xl lg:text-4xl uppercase mb-6 text-center font-bold  tracking-wide">
          See what our happy clients share about
        </h2>
        <FeedbackMarquee />
      </section>

      <section className="more-discover-section pb-20">
        <Container>
          <h2 className="text-2xl lg:text-4xl uppercase mb-6 text-center font-bold tracking-wide">
            More to discover
          </h2>
          <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
            <div className="group/image flex relative w-full h-100 md:h-100 justify-center items-center overflow-hidden">
              <Image
                src="/assets/sell-with-us-img.png"
                alt="banner"
                fill
                className="object-cover transition duration-700 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <InteractiveHoverButton
                className="uppercase absolute bottom-10 w-xs text-center"
                icon={<ArrowRight />}
              >
                Sell with us
              </InteractiveHoverButton>
            </div>
            <div className="group/image flex relative w-full h-100 md:h-100 justify-center items-center overflow-hidden">
              <Image
                src="/assets/about-us-banner-5.jpg"
                alt="banner"
                fill
                className="object-cover transition duration-700 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <InteractiveHoverButton
                className="uppercase absolute bottom-10 w-xs text-center"
                icon={<ArrowRight />}
              >
                Blog update
              </InteractiveHoverButton>
            </div>
            <div className="group/image flex relative w-full h-100 md:h-100 justify-center items-center overflow-hidden">
              <Image
                src="/assets/home-banner-5.jpg"
                alt="banner"
                fill
                className="object-cover transition duration-700 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <InteractiveHoverButton
                className="uppercase absolute bottom-10 w-xs text-center"
                icon={<ArrowRight />}
              >
                Reviews
              </InteractiveHoverButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="spotlight-section pb-20">
        <Container>
          <h2 className="text-2xl lg:text-4xl mb-6 text-center font-bold uppercase tracking-wide">
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
        </Container>
      </section>
    </>
  );
}
