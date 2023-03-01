export const marginX = [5, 6, 10, 16];
export const marginY = [6, 8, 10, 12];
export const marginXSection = [5, 6, 10, "8%"];

export const showOnLarge = { base: "none", lg: "unset" };

export const sectionMarginLeft = [5, 6, 10, 16];
export const sectionMarginRight = [5, 6, 10, 52];

export const themeColor = [
  "var(--chakra-colors-dark)",
  "var(--chakra-colors-light)",
];

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const sidebarAbout = [
  { name: "Company Overview", query: "overview" },
  { name: "Partners & Associations", query: "partners-associations" },
  { name: "Leadership", query: "leadership" },
  { name: "Partners", query: "partners" },
  { name: "Careers", query: "careers" },
];

export const sidebarServices = [
  { name: "Rubicube Creative", query: "creative" },
  { name: "Rubicube Hospitality", query: "hospitality" },
  { name: "Rubicube Connoisseur", query: "connoisseur" },
  { name: "Rubicube 360 Digital", query: "360" },
];

export const animateBottomToTop = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateTopToBottom = {
  initial: { y: -50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateRightLeft = {
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateLeftRight = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const animateRightLeftHalf = {
  initial: { x: 10, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    x: 10,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

export const animateOpacity = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
export const animateOpacityHalf = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateScaling = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateDiagonalTopRight = {
  initial: {
    x: "100%",
    y: "-100%",
  },
  animate: {
    x: "0%",
    y: "0%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%",
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const animateRightLeft100 = {
  initial: {
    x: "100%",
  },
  animate: {
    x: "0%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const itemBotToTop = (delay = 0) => ({
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    },
  },
});