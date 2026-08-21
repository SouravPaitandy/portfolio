"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectDetailCarousel from "./ProjectDetailCarousel";

export default function HexodeHeroWrapper({ images, title, children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return <>{children}</>;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] mb-20 shadow-xl border border-gray-200 dark:border-white/5">
      {/* Blurred background */}
      <div className="absolute inset-0 z-0 scale-[1.10]">
        <Image
          src={images[activeIndex]}
          alt="Background"
          fill
          priority
          className="object-cover blur-sm opacity-100 transition-opacity duration-700 ease-in-out saturate-200"
        />
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/20 dark:bg-rich-black/40 backdrop-blur-sm" />
        {/* Gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 dark:from-rich-black/90 via-white/30 dark:via-rich-black/30 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
          <div className="flex-1 space-y-6 w-full">{children}</div>
          <div className="flex-1 w-full relative z-20">
            <ProjectDetailCarousel
              images={images}
              projectTitle={title}
              onImageChange={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
