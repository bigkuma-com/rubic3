import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'DM Serif Display', sans-serif`,
    body: `Roboto`,
  },
  colors: {
    dark: "#141314",
    light: "#f0f1f1",
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
  },
});

export default theme;
