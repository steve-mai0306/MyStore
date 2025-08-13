import React from "react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlurText } from "@/components/animated";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  subTitle: string;
  withAnimation: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrl,
  title,
  subTitle,
  withAnimation,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-pink-50 h-[88vh]">
      <div className="flex w-full lg:w-1/2 h-full">
        <Link href="/shop" className="block h-full w-full">
          {withAnimation ? (
            <div className="sm:h-[48vh] md:h-[50vh] lg:h-full bg-gradient-to-r from-pink-200 flex items-center justify-center">
              <div className="relative w-full h-[50vh] md:h-[50vh] lg:h-[60vh]">
                <div className="absolute top-10 left-[40%] rotate-[5deg] z-10 w-[120px] h-[120px] md:w-[200px] md:h-[250px] lg:w-[250px] lg:h-[300px] animate-in slide-in-from-top-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-xl shadow-lg"
                  />
                </div>

                <div className="absolute top-[20%] left-[20%] rotate-[-10deg] z-20 w-[90px] h-[120px] sm:w-[120px] sm:h-[120px] md:w-[200px] md:h-[250px] lg:w-[200px] lg:h-[270px] animate-in slide-in-from-left-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner-2.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-xl shadow-lg border-2 border-white"
                  />
                </div>

                <div className="absolute top-32 left-[40%] z-40  w-[120px] h-[200px] md:w-[150px] md:h-[300px] lg:w-[200px] lg:h-[350px] animate-in slide-in-from-bottom-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner-3.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=""
                  />
                </div>

                <div className="absolute bottom-[50%] md:bottom-[30%] lg:bottom-[20%] right-[20%] rotate-[12deg] z-30 w-[80px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[200px] md:h-[250px] lg:w-[200px] lg:h-[250px] animate-in slide-in-from-right-full fade-in duration-700">
                  <Image
                    src="/assets/about-us-banner-2.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-xl shadow-lg border-2 border-white"
                  />
                </div>

                <button className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 bg-white border-2 border-black px-6 py-2 rounded-full font-semibold shadow-lg animate-in  fade-in duration-700 text-xs sm:text-sm">
                  CHOOSE YOUR OWN
                </button>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt="Hero"
              width={1000}
              height={1000}
              priority
              className="w-full h-[50vh] md:h-[60vh] lg:h-[100vh] hover:scale-103 transition-transform duration-1000"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col justify-start sm:justify-center items-center w-full lg:w-1/2 min-h-[40vh] ">
        <div className=" flex flex-col items-start px-10">
          <h1 className="text-5xl font-semibold my-4">
            <BlurText
              text={title}
              delay={80}
              animateBy="letters"
              direction="top"
            />
          </h1>
          <p className="text-lg mb-6">{subTitle}</p>
          <InteractiveHoverButton className="uppercase" icon={<ArrowRight />}>
            Shop now
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
