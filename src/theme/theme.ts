import { extendTheme } from "@chakra-ui/react";

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 1px 0 0 var(--chakra-ui-focus-ring-color)",
    },
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      ":host,:root": {
        "--chakra-ui-focus-ring-color": "transparent",
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)",
  },
  fonts: {
    heading: `'DM Serif Display', sans-serif`,
    body: `Roboto`,
  },
  fontSizes: {
    xs: "0.7rem",
    sm: "0.9rem",
    md: "1rem",
    lg: "1.2rem",
    xl: "1.35rem",
    "2xl": "1.6rem",
    "3xl": "2rem",
    "4xl": "2.4rem",
    "5xl": "3rem",
    "6xl": "3.8rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  colors: {
    dark: "#141314",
    light: "#ffffff",
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "thin",
        letterSpacing: "wide",
        color: "light",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: 300,
        letterSpacing: "wider",
        color: "light",
      },
    },
    Divider: {
      baseStyle: { opacity: 0.2 },
    },
    Input: {
      variants: {
        flushed: variantFlushed,
      },
    },
  },
});

export default theme;
