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
      // Create a CSS variable with the focus ring color desired.
      // rgba function does not work here so use the hex value.
      // Either :host,:root or html work. body does not work for
      // button, checkbox, radio, switch.
      // html: {
      ":host,:root": {
        "--chakra-ui-focus-ring-color": "transparent",
      },
    },
  },
  shadows: {
    // This is also possible. Not sure I like inject this into
    // an existing theme section.
    // It creates a CSS variable named --chakra-shadows-focus-ring-color
    // 'focus-ring-color': 'rgba(255, 0, 125, 0.6)',
    outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)",
  },
  fonts: {
    heading: `'DM Serif Display', sans-serif`,
    body: `Roboto`,
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
