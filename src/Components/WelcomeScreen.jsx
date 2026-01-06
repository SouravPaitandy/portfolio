import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

const WelcomeScreen = ({ onEnter }) => {
  const [textStage, setTextStage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer1 = setTimeout(() => setTextStage(1), 1000); // "Hello"
    const timer2 = setTimeout(() => setTextStage(2), 2500); // "I am Sourav"
    const timer3 = setTimeout(() => setTextStage(3), 4000); // Button appears

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
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
            <motion.h1
              key="stage-1"
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              {t("welcome.hello")}
            </motion.h1>
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
                  {t("welcome.welcome_to")}
                </span>
                {t("welcome.name_possessive")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-purple-600">
                  {t("welcome.portfolio")}
                </span>
              </h1>

              <p className="max-w-md text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                {t("welcome.subtitle")}
              </p>

              {textStage >= 3 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={onEnter}
                  whileHover={{ scale: 1.05, gap: "12px" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 flex items-center gap-2 px-8 py-3 rounded-full bg-electric-indigo text-white font-medium text-lg hover:bg-indigo-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                  {t("welcome.enter")} <ArrowRight size={20} />
                </motion.button>
              )}
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
  );
};

export default WelcomeScreen;
