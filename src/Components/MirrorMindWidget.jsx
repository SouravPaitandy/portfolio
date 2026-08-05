import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles } from "lucide-react";

export default function MirrorMindWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the "Ask me anything" tooltip after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);

    // Auto-hide tooltip after 15 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 20000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  // Lock body scroll when the chat panel is open to prevent background scrolling on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        {/* Tooltip bubble */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4 bg-white dark:bg-charcoal text-gray-900 dark:text-white px-4 py-3 rounded-2xl shadow-xl border border-black/10 dark:border-white/10 flex items-center gap-2 relative cursor-pointer"
              onClick={toggleWidget}
            >
              <Sparkles className="text-electric-indigo" size={16} />
              <span className="text-sm font-medium whitespace-nowrap">
                Ask me anything 👋
              </span>

              {/* Down arrow triangle */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-charcoal border-b border-r border-black/10 dark:border-white/10 rotate-45"></div>

              <button
                className="ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                aria-label="Close tooltip"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={toggleWidget}
              className="relative group w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] transition-all duration-300 bg-gradient-to-br from-electric-indigo via-indigo-600 to-purple-700 text-white hover:scale-105 z-50"
              aria-label="Toggle MirrorMind Chat"
            >
              {/* Subtle pulse ring behind */}
              <div
                className="absolute inset-0 rounded-full border-2 border-electric-indigo animate-ping opacity-40"
                style={{ animationDuration: "2s" }}
              ></div>

              {/* Premium Icon with dot */}
              <div className="relative">
                <Bot size={26} strokeWidth={1.5} className="drop-shadow-md" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-indigo-600 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-[100dvh] sm:w-[400px] sm:h-[85vh] sm:max-h-[700px] bg-white dark:bg-[#111111] sm:rounded-2xl shadow-2xl overflow-hidden z-[100] border-0 sm:border border-black/10 dark:border-white/10 flex flex-col"
          >
            {/* Minimal Header just for dragging/closing and identity */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-electric-indigo/20 flex items-center justify-center relative">
                  <Sparkles size={16} className="text-electric-indigo" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-charcoal"></div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none tracking-wide">
                      MirrorMind
                    </h3>
                    <span className="text-[10px] text-electric-indigo font-mono font-medium leading-none mt-0.5">
                      v1.0
                    </span>
                    <span className="text-[8px] font-bold text-green-600 dark:text-green-400 tracking-widest uppercase rounded-full bg-green-500/10 px-1.5 py-[3px] border border-green-500/20 leading-none ml-0.5">
                      BETA
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase">
                    Sourav&apos;s AI Digital Twin
                  </p>
                </div>
              </div>

              <button
                onClick={toggleWidget}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Iframe container */}
            <div className="flex-1 bg-white dark:bg-[#0A0A0A] relative">
              {/* Loader placeholder while iframe loads */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-3">
                <div className="w-6 h-6 border-2 border-electric-indigo/20 border-t-electric-indigo rounded-full animate-spin"></div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-600">
                  Initializing Digital Twin...
                </span>
              </div>

              <iframe
                src="https://mirror-mind-xi.vercel.app"
                title="MirrorMind AI Digital Twin"
                className="w-full h-full relative z-10 border-0"
                allow="microphone; clipboard-write"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
