import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Domine', sans-serif`,
    body: `'Questrial', sans-serif`,
  },
  colors: {
    dark: "#141314",
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 400,
        letterSpacing: "wide",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: 400,
        letterSpacing: "wide",
      },
    },
    Divider: {
      baseStyle: { opacity: 0.2 },
    },
    Button: {},
  },
});

export default theme;
