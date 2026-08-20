"use client";

import { motion } from "framer-motion";

export default function ClientReveal({ 
  children, 
  initial = { opacity: 0, y: 20 }, 
  whileInView = { opacity: 1, y: 0 }, 
  transition = { duration: 0.6 },
  viewport = { once: true },
  className = "",
  as = "div",
  ...props
}) {
  const MotionComponent = motion[as] || motion.div;
  
  return (
    <MotionComponent
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
