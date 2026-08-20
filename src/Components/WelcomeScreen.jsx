"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";

const WelcomeScreen = ({ dict }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [textStage, setTextStage] = useState(0);
  const [helloIndex, setHelloIndex] = useState(0);
  const hellos = ["Hello", "नमस्ते", "নমস্কার", "Hola"];
  const t = dict.welcome;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowWelcome(false);
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) return;
    const timer1 = setTimeout(() => setTextStage(1), 500); // "Hello"
    const timer2 = setTimeout(() => setTextStage(2), 4000); // "I am Sourav"

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [showWelcome]);

  useEffect(() => {
    if (textStage !== 1 || !showWelcome) return;
    const interval = setInterval(() => {
      setHelloIndex((prev) => {
        if (prev < hellos.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [textStage, hellos.length, showWelcome]);

  const handleEnter = () => {
    setShowWelcome(false);
    sessionStorage.setItem("hasVisited", "true");
  };

  if (!isMounted || !showWelcome) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-rich-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          y: -20,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
      >
        {/* Background Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] rounded-full border border-electric-indigo/5 dark:border-white/5"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-[80vw] h-[80vw] rounded-full border border-electric-indigo/5 dark:border-white/5"
          />
        </div>

        <div className="z-10 flex flex-col items-center text-center px-4">
          <AnimatePresence mode="wait">
            {textStage === 0 && (
              <motion.div
                key="stage-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
              >
                <Code
                  size={60}
                  className="text-electric-indigo mb-4 mx-auto"
                  strokeWidth={1.5}
                />
              </motion.div>
            )}

            {textStage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                className="relative h-20 w-full flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={helloIndex}
                    className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white absolute whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {hellos[helloIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
            )}

            {textStage >= 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  <span className="text-gray-400 dark:text-gray-600 block text-lg md:text-2xl font-normal mb-2 tracking-widest uppercase">
                    {t.welcome_to}
                  </span>
                  {t.name_possessive}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-purple-600">
                    {t.portfolio}
                  </span>
                </h1>

                <p className="max-w-md text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  {t.subtitle}
                </p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={handleEnter}
                  whileTap={{ scale: 0.95 }}
                  className="group mt-8 flex items-center gap-2 px-8 py-3 rounded-full bg-electric-indigo text-white font-medium text-lg hover:bg-indigo-600 ease-in-out transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                  {t.enter}{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 duration-300 transition-all ease-in-out"
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Bar at bottom (Decorative) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-1 bg-electric-indigo/20"
        >
          <div className="h-full bg-electric-indigo w-full" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;
