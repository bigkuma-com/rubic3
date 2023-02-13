import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/header";
import { itemBotToTop } from "../utils/consts";

const seo = {
  url: "https://rubic3.com/500",
  title: "500 | Rubic3",
  description: "Server-side error occurred.",
};

export default function Custom500() {
  const { push } = useRouter();
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        additionalMetaTags={[
          {
            name: "dc:creator",
            content: "arridhow",
          },
        ]}
        openGraph={{
          url: seo.url,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: "/logo.png",
              alt: "Logo Image",
              type: "image/jpeg",
            },
            { url: "/logo.png" },
          ],
          site_name: "Rubic3",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/fav.svg",
          },
          {
            rel: "apple-touch-icon",
            href: "/fav.svg",
            sizes: "76x76",
          },
        ]}
      />
      <Header />

      <Box
        w="100vw"
        h="100vh"
        bg="dark"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Heading
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          500 - Error.
        </Heading>
        <Text
          mb={4}
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="span" opacity={0.6}>
            {seo.description}
          </Text>
        </Text>
        <Box
          as={motion.div}
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Button
            text="Home"
            onClick={() => {
              push("/");
            }}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}
