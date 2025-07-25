"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn("tw-:relative", className)}>
      <div
        className="tw-:group tw-:relative tw-:cursor-pointer"
        onClick={() => setIsVideoOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="tw-:w-full tw-:rounded-md tw-:border tw-:shadow-lg tw-:transition-all tw-:duration-200 tw-:ease-out tw-:group-hover:brightness-[0.8]"
        />
        <div className="tw-:absolute tw-:inset-0 tw-:flex tw-:scale-[0.9] tw-:items-center tw-:justify-center tw-:rounded-2xl tw-:transition-all tw-:duration-200 tw-:ease-out tw-:group-hover:scale-100">
          <div className="tw-:flex tw-:size-28 tw-:items-center tw-:justify-center tw-:rounded-full tw-:bg-primary/10 tw-:backdrop-blur-md">
            <div
              className={`relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]`}
            >
              <Play
                className="tw-:size-8 tw-:scale-100 tw-:fill-white tw-:text-white tw-:transition-transform tw-:duration-200 tw-:ease-out tw-:group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsVideoOpen(false)}
            exit={{ opacity: 0 }}
            className="tw-:fixed tw-:inset-0 tw-:z-50 tw-:flex tw-:items-center tw-:justify-center tw-:bg-black/50 tw-:backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="tw-:relative tw-:mx-4 tw-:aspect-video tw-:w-full tw-:max-w-4xl tw-:md:mx-0"
            >
              <motion.button className="tw-:absolute tw-:-top-16 tw-:right-0 tw-:rounded-full tw-:bg-neutral-900/50 tw-:p-2 tw-:text-xl tw-:text-white tw-:ring-1 tw-:backdrop-blur-md tw-:dark:bg-neutral-100/50 tw-:dark:text-black">
                <XIcon className="tw-:size-5" />
              </motion.button>
              <div className="tw-:relative tw-:isolate tw-:z-[1] tw-:size-full tw-:overflow-hidden tw-:rounded-2xl tw-:border-2 tw-:border-white">
                <iframe
                  src={videoSrc}
                  className="tw-:size-full tw-:rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
