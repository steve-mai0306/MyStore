import React from "react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { RetroButton } from "@/components/animated";
import { ArrowRight } from "lucide-react";
import { BlurText } from "@/components/animated";

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  subTitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrl,
  title,
  subTitle,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-pink-50 min-h-screen">
      <div className="flex w-full lg:w-1/2 h-full">
        <Link href="/shop" className="block h-full w-full">
          <Image
            src={imageUrl}
            alt="Hero"
            width={1000}
            height={1000}
            priority
            className="w-full h-[50vh] md:h-[60vh] lg:h-[100vh] hover:scale-103 transition-transform duration-1000"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[40vh] ">
        <div className=" flex flex-col items-start px-10 ">
          <h1 className="text-5xl font-semibold my-4">
            <BlurText
              text={title}
              delay={80}
              animateBy="letters"
              direction="top"
            />
          </h1>
          <p className="text-lg mb-6">{subTitle}</p>
          <RetroButton size="md" variant="secondary">
            Shop Now <ArrowRight className="ml-2" />
          </RetroButton>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
