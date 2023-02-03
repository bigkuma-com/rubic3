import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-serif-display";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import "../assets/css/main.scss";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="google-site-verification"
          content="YIX-d0c9CMXch52a2X_wFMYqjpxyKgUV0vnsBabfqWE"
        />
      </Head>
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <ChakraProvider theme={theme}>
        <NextNProgress
          color="#ffffff"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />

        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
