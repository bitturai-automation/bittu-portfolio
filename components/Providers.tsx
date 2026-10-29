"use client";
import { MotionConfig } from "framer-motion";
import MotionGuard from "./MotionGuard";
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user"><MotionGuard />{children}</MotionConfig>;
}
