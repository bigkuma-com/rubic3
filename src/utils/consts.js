import Rubic360 from "../assets/images/FA Rubicube 360 Digital logo2.webp";
import RubicCreative from "../assets/images/FA Rubicube Creativity Logo2.png";
import RubicHospitality from "../assets/images/FA Rubicube Hospitality Logo2.png";

export const marginXHeader = { base: 4, lg: 8 };
export const marginYHeader = { base: 4, lg: 6 };
export const marginYHeader2 = { base: 4, lg: 16 };
export const marginRightContact = { base: 4, lg: 28 };
export const marginRightContact2 = { base: 0, lg: 28 };

export const marginX = [5, 6, 10, 16];
export const marginY = [6, 8, 10, 12];
export const marginXSection = [5, 6, 10, "8%"];
export const showOnLarge = { base: "none", lg: "unset" };

export const sectionMarginLeft = [5, 6, 10, 16];
export const sectionMarginRight = [5, 6, 10, 52];

export const sectionMarginLeft2 = [0, null, null, 16];
export const sectionMarginRight2 = [0, null, null, 52];

export const marginTop = { base: 36, lg: 28 };
export const marginBottom = { base: 12, lg: 0 };

export const themeColor = [
  "var(--chakra-colors-dark)",
  "var(--chakra-colors-light)",
];

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const sidebarAbout = [
  { name: "Company Overview", query: "overview" },
  { name: "Partners & Associations", query: "partners-associations" },
  { name: "Team", query: "team" },
  { name: "Clients", query: "clients" },
  { name: "Careers", query: "careers" },
];

export const sidebarServices = [
  {
    name: "Rubicube Creative",
    query: "creative",
    color: "var(--chakra-colors-dark)",
    logo: RubicCreative,
  },
  {
    name: "Rubicube Hospitality",
    query: "hospitality",
    color: "#325D92",
    logo: RubicHospitality,
  },
  {
    name: "Rubicube 360 Digital",
    query: "360",
    color: "#FFC925",
    logo: Rubic360,
  },
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

export const animateYWithBg = (bg1, bg2, y) => ({
  initial: { y, opacity: 0 },
  animate1: {
    y: 0,
    opacity: 1,
    backgroundColor: bg1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  animate2: {
    y: 0,
    opacity: 1,
    backgroundColor: bg2,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    y,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
});

export const containerFilter = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ease: "easeInOut",
    },
  },
};

export const itemFilter = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
