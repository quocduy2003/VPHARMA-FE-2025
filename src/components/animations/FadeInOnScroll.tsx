"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
};

export default function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
