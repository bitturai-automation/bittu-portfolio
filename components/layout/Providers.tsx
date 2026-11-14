"use client";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import MotionGuard from "@/components/motion/MotionGuard";
import { intro } from "@/lib/intro";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Runs after the first page (and its Intro, if any) has mounted, so later visits to Home skip the intro.
  useEffect(() => { intro.played = true; }, []);
  return <MotionConfig reducedMotion="user"><MotionGuard />{children}</MotionConfig>;
}
