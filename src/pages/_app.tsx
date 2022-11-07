import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/domine";
import "@fontsource/questrial";
import type { AppProps } from "next/app";
import "../assets/css/main.scss";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
