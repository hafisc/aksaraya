import { Variants } from "framer-motion"

// Motion presets for consistent animations
export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export const slideIn: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleOnHover = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

export const glowOnHover = {
  hover: {
    boxShadow: "0 0 20px rgba(246, 196, 83, 0.5), 0 0 30px rgba(246, 196, 83, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}
