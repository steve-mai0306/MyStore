"use client";

import React from "react";
import { SwiperCarousel } from "./_components";
import { Container } from "@/components/layout";
import { RetroButton } from "@/components/animated";
import { CategoryCard } from "@/components/animated";
import { FeatureCard } from "./_components";
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

export default function Home() {
  return (
    <>
      <section className="carousel-section">
        <SwiperCarousel />
      </section>

      <section className="product-category-section overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-start lg:items-center w-full justify-between">
            <h2 className="text-5xl mb-6">
              FIND A FIT <br></br> FOR EVERYONE
            </h2>
            <div className="category-tag-list flex flex-wrap justify-start lg:justify-end gap-4">
              <RetroButton
                size="lg"
                variant="default"
                className="bg-yellow-700"
              >
                T-SHIRT
              </RetroButton>
              <RetroButton size="lg" variant="default" className="bg-teal-200">
                SWEARTSHIRT
              </RetroButton>
              <RetroButton size="lg" variant="default" className="bg-pink-500">
                HOODIE
              </RetroButton>
              <RetroButton size="lg" variant="default" className="bg-blue-400">
                TANK TOP
              </RetroButton>
              <RetroButton size="lg" variant="default">
                LONG_SLEEVES
              </RetroButton>
            </div>
          </div>
          <div className="pt-10 flex flex-col lg:flex-row gap-4 items-center w-full justify-evenly">
            <CategoryCard
              imageSrc="/assets/men-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="400px"
              containerWidth="400px"
              imageHeight="400px"
              imageWidth="400px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <RetroButton variant="secondary">
                  MEN&apos;S COLLECTION <ChevronRightIcon />
                </RetroButton>
              }
            />
            <CategoryCard
              imageSrc="/assets/kid-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="400px"
              containerWidth="400px"
              imageHeight="400px"
              imageWidth="400px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <RetroButton variant="secondary">
                  KID&apos;S COLLECTION <ChevronRightIcon />
                </RetroButton>
              }
            />
            <CategoryCard
              imageSrc="/assets/women-banner.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Kendrick Lamar - GNX"
              containerHeight="400px"
              containerWidth="400px"
              imageHeight="400px"
              imageWidth="400px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <RetroButton variant="secondary">
                  WOMEN&apos;S COLLECTION <ChevronRightIcon />
                </RetroButton>
              }
            />
          </div>
        </Container>
      </section>

      <section className="shop-featured-highlights-section py-10">
        <div className="flex flex-col lg:flex-row flex-wrap justify-evenly">
          <FeatureCard
            icon={<Globe className="icon" size={64} strokeWidth={1} />}
            title="WORLDWIDE SHIPPING"
          />
          <FeatureCard
            icon={<Shirt className="icon" size={64} strokeWidth={1} />}
            title="PREMIUM QUALITY SHIRTS"
          />
          <FeatureCard
            icon={<Heart className="icon" size={64} strokeWidth={1} />}
            title="SUPPORT AGOOD CAUSE"
          />
          <FeatureCard
            icon={<CreditCard className="icon" size={64} strokeWidth={1} />}
            title="SAFE ONLINE PAYMENT"
          />
        </div>
      </section>

      <section className="video-introduction-section py-10 w-full overflow-hidden bg-pink-100">
        <div className="flex flex-col lg:flex-row flex-wrap">
          <div className="sub-section-1 flex flex-col justify-center items-center align-middle w-full lg:w-[30%] p-3 ">
            <Image
              src="/assets/banner-subsection-1.jpg"
              alt="banner"
              width={280}
              height={280}
              className="border border-black rounded-lg shadow-lg rotate-z-[15deg]"
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
              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <h2 className="text-7xl font-semibold align-middle tracking-wider text-center">
                  SEE HOW WE <br />
                  <span className="block text-center">WORK</span>
                </h2>
              </BoxReveal>

              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <h2 className="mt-[.5rem] text-[1rem]">
                  UI library for{" "}
                  <span className="text-[#5046e6]">Design Engineers</span>
                </h2>
              </BoxReveal>

              <RetroButton variant="secondary" size="icon" className="mt-4">
                <Play />
              </RetroButton>
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
              className="border border-black rounded-lg shadow-lg rotate-z-[15deg] translate-x-[10rem] translate-y-[-4rem]"
            />
          </div>
        </div>
      </section>

      <section className="top-sale-products py-10">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-5xl mb-6">WHAT&apos;S HOT?</h2>
            <RetroButton variant="link">
              VIEW ALL <ArrowRight className="ml-2" />
            </RetroButton>
          </div>
        </Container>
      </section>
    </>
  );
}
