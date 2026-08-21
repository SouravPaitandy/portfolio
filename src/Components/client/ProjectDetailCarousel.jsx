"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Image from "next/image";

/**
 * ProjectDetailCarousel
 * ─────────────────────────────────────────────────────────────────────────────
 * Client Component — handles image carousel + lightbox on the project detail
 * page. All project text/info is server-rendered in the parent page.jsx.
 *
 * Props:
 *   images    string[]  — Array of image URL strings
 *   projectTitle string — For alt text
 */
export default function ProjectDetailCarousel({
  images,
  projectTitle,
  onImageChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    onImageChange?.(nextIdx);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    onImageChange?.(prevIdx);
  };

  return (
    <>
      {/* ── Main Carousel ── */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-rich-black rounded-2xl overflow-hidden group border border-black/5 dark:border-white/10 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
          >
            <Image
              src={images[currentIndex]}
              alt={`${projectTitle} — screenshot ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 80vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Click-to-lightbox overlay */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          aria-label="View image fullscreen"
          className="absolute inset-0 w-full h-full cursor-zoom-in group/zoom flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
          <div className="relative flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
              <Maximize2 size={22} className="text-white drop-shadow-lg" />
            </div>
            <span className="text-white text-xs font-medium tracking-wide drop-shadow-md bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              Click to expand
            </span>
          </div>
        </button>

        {/* Prev / Next arrows — only shown when >1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    onImageChange?.(idx);
                  }}
                  aria-label={`Go to image ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/80 w-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnail Strip (if > 1 image) ── */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                onImageChange?.(idx);
              }}
              aria-label={`View screenshot ${idx + 1}`}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-electric-indigo opacity-100"
                  : "border-black/10 dark:border-white/10 opacity-50 hover:opacity-80"
              }`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={src}
                  alt={`${projectTitle} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 bg-white/60 dark:bg-black/95 backdrop-blur-xl z-[80]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
            >
              {/* Top bar */}
              <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-5 pointer-events-auto">
                <span className="text-charcoal dark:text-white/60 font-mono text-sm tracking-widest select-none">
                  {String(currentIndex + 1).padStart(2, "0")}
                  <span className="text-charcoal/50 dark:text-white/30 mx-1">
                    /
                  </span>
                  {String(images.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:block text-charcoal dark:text-white/50 text-sm font-medium truncate max-w-[40%] text-center">
                  {projectTitle}
                </span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close lightbox"
                  className="p-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-charcoal dark:text-white/70 hover:text-charcoal dark:hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main lightbox image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-[88vw] h-[82vh]"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${projectTitle} — image ${currentIndex + 1}`}
                    fill
                    className="object-contain rounded-xl shadow-2xl pointer-events-auto select-none"
                    draggable={false}
                    sizes="88vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-charcoal dark:text-white/80 hover:text-charcoal dark:hover:text-white transition-all pointer-events-auto backdrop-blur-sm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-charcoal dark:text-white/80 hover:text-charcoal dark:hover:text-white transition-all pointer-events-auto backdrop-blur-sm"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
