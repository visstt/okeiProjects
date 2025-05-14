export const backgroundVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const blockContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

export const blockVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const infoVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.98,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.3,
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};
