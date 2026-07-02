"use client";
import { useEffect } from "react";
import { animate, useMotionValue, useTransform, motion } from "motion/react";

export function AnimatedNumber({ value, format }: { value: number; format?: (n: number) => string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => (format ? format(v) : Math.round(v).toString()));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
}
