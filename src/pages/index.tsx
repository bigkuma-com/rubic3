import { Box } from "@chakra-ui/react";
import { LayoutGroup } from "framer-motion";
import { NextSeo } from "next-seo";
import "swiper/css";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import Section3 from "../components/landing/Section3";
import Section4 from "../components/landing/Section4";
import { getFullList } from "../utils/api";
import { marginRightContact } from "../utils/consts";

const seo = {
  url: "https://www.rubic3.com",
  title: "Home - Rubicube Group",
  description:
    "Rubicube Group is a holistic branding and management advisory that excels in brand strategy, identity development, hotel management, F&B management, digital marketing, and communication. Our role is to provide businesses with access to the best advisory and expertise to deliver transformative business results to become leading brands.",
};

export default function Home({ sliders }: any) {
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

      <Box bg="dark" display="flex" flexDirection="column" position="relative">
        <Header contactMarginRight={marginRightContact} />
        <Section1 sliders={sliders} />
        <Section2 />
        <LayoutGroup>
          <Section3 />
          <BoxMotion layout>
            <Section4 />
            <Footer position="relative" />
          </BoxMotion>
        </LayoutGroup>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const sliders = await getFullList({
    collection: "home_slider",
    params: { sort: "order", expand: "work" },
  });

  return {
    props: {
      sliders: JSON.parse(JSON.stringify(sliders)),
    },
    revalidate: 10,
  };
}
