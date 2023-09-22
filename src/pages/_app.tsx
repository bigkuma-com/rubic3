import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-serif-display";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import NextNProgress from "nextjs-progressbar";
import "../assets/css/main.scss";
import WaIcon from "../assets/images/WA_icon-01.webp";
import BoxMotion from "../components/BoxMotion";
import WhatsappButton from "../components/WhatsappButton";
import Analytics from "../container/Analytics";
import theme from "../theme/theme";
import {
  animateBottomToTop,
  marginXHeader,
  marginYHeader,
} from "../utils/consts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <ChakraProvider theme={theme}>
        <NextNProgress
          color="#ffffff"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        <WhatsappButton />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
