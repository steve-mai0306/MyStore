"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Eye, ShoppingCart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Product Image Container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            SALE!
          </span>
          <span className="bg-pink-400 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            NEW
          </span>
        </div>

        {/* Main Product Image */}
        <Link href="#" className="block relative w-full h-full">
          <Image
            src="https://printspace.harutheme.com/tshirt/wp-content/uploads/sites/6/2023/07/p52.1-300x400.jpg"
            alt="Fit Round-Neck T-Shirt"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300  ${
              isHovered ? "opacity-0" : "opacity-100 "
            }`}
          />

          {/* Hover Image */}
          <Image
            src="https://printspace.harutheme.com/tshirt/wp-content/uploads/sites/6/2023/07/p52.2.jpg"
            alt="Fit Round-Neck T-Shirt - Back View"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-1500 hover:scale-110 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Action Buttons - Appear on Hover */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="py-4 text-left">
        <Link href="#" className="block">
          <h2 className="text-md font-bold uppercase tracking-wide hover:text-gray-600 transition-colors">
            FIT ROUND-NECK T-SHIRT
          </h2>
        </Link>
        <div className="mt-2">
          <span className="text-lg font-semibold text-gray-900">
            $23.00 - $33.00
          </span>
        </div>
      </div>
    </div>
  );
};
