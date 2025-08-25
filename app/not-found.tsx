import React from "react";
import { ErrorPage } from "@/components/layout";
import Image from "next/image";

export default function NotFound() {
  return (
    <ErrorPage 
      code={404} 
      message="Page not found" 
      image={
        <Image
          src="/page-not-found.svg"
          alt="Page not found illustration"
          width={256}
          height={256}
          className="w-full h-full"
        />
      }
    />
  );
}
