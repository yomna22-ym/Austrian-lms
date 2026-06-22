"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";
import type { ReactNode } from "react";

const VIEWPORT = { once: true, amount: 0.18, margin: "0px 0px -80px 0px" };
const PROFESSIONAL_EASE = [0.16, 1, 0.3, 1] as const;

function fadeUpTransition(delay = 0): Transition {
  return {
    duration: 0.58,
    delay,
    ease: PROFESSIONAL_EASE,
  };
}

function scaleTransition(delay = 0): Transition {
  return {
    duration: 0.42,
    delay,
    ease: PROFESSIONAL_EASE,
  };
}

interface MotionBaseProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverLift?: boolean;
}

export function MotionSection({
  children,
  className = "",
  delay = 0,
  ...props
}: MotionBaseProps & HTMLMotionProps<"section">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={fadeUpTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionDiv({
  children,
  className = "",
  delay = 0,
  hoverLift = false,
  ...props
}: MotionBaseProps & HTMLMotionProps<"div">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        !reduceMotion && hoverLift ? { y: -6, scale: 1.006 } : undefined
      }
      viewport={VIEWPORT}
      transition={fadeUpTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionArticle({
  children,
  className = "",
  delay = 0,
  ...props
}: MotionBaseProps & HTMLMotionProps<"article">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.006 }}
      viewport={VIEWPORT}
      transition={scaleTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export function MotionLi({
  children,
  className = "",
  delay = 0,
  ...props
}: MotionBaseProps & HTMLMotionProps<"li">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={scaleTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.li>
  );
}

export function MotionAside({
  children,
  className = "",
  delay = 0,
  ...props
}: MotionBaseProps & HTMLMotionProps<"aside">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, x: -18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={fadeUpTransition(delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.aside>
  );
}
