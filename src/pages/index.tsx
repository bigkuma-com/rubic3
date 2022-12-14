import { Box, useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRef, useState } from "react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/footer";
import Header from "../components/header";
import HomePagination from "../components/landing/HomePagination";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import Section3 from "../components/landing/Section3";
import Section4 from "../components/landing/Section4";
import { getFullList } from "../utils/api";
import { marginX } from "../utils/consts";
import { HomeContext } from "../utils/hooks";

const seo = {
  url: "https://rubic3.com",
  title: "Home - Rubicube Group",
  description:
    "Rubicube Group is a holistic branding and management advisory that excels in brand strategy, identity development, hotel management, F&B management, digital marketing, and communication. Our role is to provide businesses with access to the best advisory and expertise to deliver transformative business results to become leading brands.",
};

export default function Home({ sliders }: any) {
  const [section, setSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const homepageRef = useRef<any>(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
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
      <HomeContext.Provider value={{ section, setSection }}>
        <Header />

        {isLarge ? (
          <Box w="full" h="100vh">
            <Swiper
              direction={"vertical"}
              mousewheel={true}
              modules={[Mousewheel]}
              simulateTouch={false}
              onSlideChange={(swiper) => {
                setSection(swiper.realIndex);
              }}
            >
              <SwiperSlide>
                <Section1 sliders={sliders} />
              </SwiperSlide>
              <SwiperSlide>
                <Section2 />
              </SwiperSlide>

              <SwiperSlide>
                <Section3 />
              </SwiperSlide>
              <SwiperSlide>
                <Section4 />
              </SwiperSlide>
            </Swiper>
          </Box>
        ) : (
          <>
            <Box bg="dark" display="flex" flexDirection="column" gap={16}>
              <Section1 sliders={sliders} />
              <Section2 />
              <Section3 />
              <Section4 />
            </Box>
          </>
        )}

        <Box
          display={{ base: "none", lg: "unset" }}
          position="fixed"
          zIndex={50}
          right={marginX}
          top="50%"
          transform="translateY(-50%)"
        >
          <HomePagination section={section} maxSection={4} />
        </Box>

        <Footer isHomepage isShowing={section > 0} />
      </HomeContext.Provider>
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
