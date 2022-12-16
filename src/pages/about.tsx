import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import Section1 from "../components/about/Section1";
import Section2 from "../components/about/Section2";
import Section3 from "../components/about/Section3";
import Section4 from "../components/about/Section4";
import Section5 from "../components/about/Section5";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import { getFullList } from "../utils/api";
import { animateLeftRight, sidebarAbout, themeColor } from "../utils/consts";

const itemBotToTop = (delay = 0) => ({
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const seo = {
  url: "https://rubic3.com/about",
  title: "About - Rubicube Group",
  description:
    "With a track record of 14 years, Our deep understanding of and research into the forces of digital disruption, coupled with the new thinking required to unlock growth provides excellence, long-lasting results.",
};

export default function About({
  clients,
  partners,
  associates,
  leaders,
  careers,
}: {
  clients: any;
  partners: any;
  associates: any;
  leaders: any;
  careers: any;
}) {
  const { push, query, replace } = useRouter();
  const [section, setSection] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isEven, setIsEven] = useState(true);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    setIsEven(!!(section % 2));
  }, [section]);

  const slideTo = (index: any) => swiper.slideTo(index);

  useEffect(() => {
    const i = sidebarAbout.findIndex((item) => item.query === query?.selected);

    if (i > -1 && swiper?.enabled) {
      slideTo(i);
      setSection(i);
    }
  }, [query, swiper]);

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
      <BoxMotion
        position="relative"
        display="flex"
        initial={{ backgroundColor: themeColor[0] }}
        animate={{
          backgroundColor: themeColor[+isEven],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Header isLight={!isEven} />
        <Box
          position="fixed"
          top="50%"
          left="5%"
          transform="translate(-50%, -50%)"
          zIndex={50}
          color={themeColor[+!isEven]}
        >
          <BoxMotion
            variants={animateLeftRight}
            initial="initial"
            animate="animate"
          >
            <Box
              display={{ base: "none", lg: "flex" }}
              flexDirection="column"
              alignItems="center"
              gap={2}
              cursor="pointer"
              color="inherit"
              onClick={() => push("/")}
            >
              <Text
                color="inherit"
                as="span"
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotate(-180deg)",
                }}
                fontSize="small"
                letterSpacing="wider"
                fontWeight={400}
              >
                Back to Home
              </Text>
              <ArrowLeftSm />
            </Box>
          </BoxMotion>
        </Box>
        <Box
          position="relative"
          left={0}
          top={0}
          w="30%"
          h="100vh"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          pl="10%"
          color={themeColor[+!isEven]}
        >
          <Box
            as="ul"
            display="flex"
            flexDirection="column"
            gap={4}
            listStyleType="none"
          >
            {sidebarAbout.map((item, i) => {
              return (
                <BoxMotion
                  key={i}
                  variants={itemBotToTop(i * 0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                >
                  <Box
                    as="li"
                    // key={i}
                    opacity={section == i ? 1 : 0.6}
                    _hover={{ opacity: 1 }}
                    cursor="pointer"
                    onClick={() => {
                      slideTo(i);
                      setSection(i);
                      replace({
                        query: { ...query, selected: sidebarAbout[i].query },
                      });
                    }}
                    className="animate-fade"
                  >
                    {item.name}
                  </Box>
                </BoxMotion>
              );
            })}
          </Box>
          <BoxMotion
            w="2px"
            position="absolute"
            opacity={0.6}
            right={0}
            top={0}
            zIndex={5}
            layout
            initial={{
              height: "0%",
            }}
            animate={{
              height: `${(section + 1) * 20}%`,
              backgroundColor: themeColor[+!isEven],
              transition: {
                backgroundColor: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
                height: {
                  duration: 2,
                },
              },
            }}
          />
          <BoxMotion
            opacity={0.1}
            w="2px"
            position="absolute"
            right={0}
            top={0}
            zIndex={4}
            initial={{
              height: "0vh",
            }}
            animate={{
              height: "100vh",
              backgroundColor: themeColor[+!isEven],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                height: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
        </Box>

        <Box
          h="100vh"
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
        >
          <BoxMotion
            w="3px"
            position="absolute"
            opacity={0.6}
            right={0}
            top={0}
            zIndex={5}
            layout
            initial={{
              height: "0%",
            }}
            animate={{
              height: `${(section + 1) * 20}%`,
              backgroundColor: themeColor[+!isEven],
              transition: {
                backgroundColor: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
                height: {
                  duration: 2,
                },
              },
            }}
          />
          <BoxMotion
            opacity={0.1}
            w="3px"
            position="absolute"
            right={0}
            top={0}
            zIndex={4}
            initial={{
              height: "0vh",
            }}
            animate={{
              height: "100vh",
              backgroundColor: themeColor[+!isEven],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                height: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
        </Box>

        <Box h="100vh" w={{ base: "full", lg: "70%" }}>
          <Swiper
            direction={"vertical"}
            mousewheel={true}
            modules={[Mousewheel]}
            simulateTouch={false}
            onSlideChange={(swiper) => {
              setSection(swiper.realIndex);
              replace({
                query: {
                  ...query,
                  selected: sidebarAbout[swiper.realIndex].query,
                },
              });
            }}
            onSwiper={setSwiper}
          >
            <SwiperSlide style={{ height: "100vh" }}>
              <Section1 />
            </SwiperSlide>
            <SwiperSlide style={{ height: "100vh" }}>
              <Section2 clients={clients} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "100vh" }}>
              <Section3 leaders={leaders} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "100vh" }}>
              <Section4 associates={associates} partners={partners} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "100vh" }}>
              <Section5 careers={careers} />
            </SwiperSlide>
          </Swiper>
        </Box>
        <Footer isLight={!isEven} />
      </BoxMotion>
    </>
  );
}

export async function getStaticProps() {
  const resultsClients = await getFullList({
    collection: "clients_partners",
    params: { sort: "order" },
  });
  const resultLeaders = await getFullList({
    collection: "leaderships",
    params: { sort: "order" },
  });
  const resultCareers = await getFullList({
    collection: "careers",
    params: { sort: "-created" },
  });

  const partners = resultsClients.filter((client) => client.type === "partner");
  const associates = resultsClients.filter(
    (client) => client.type === "associate"
  );
  const clients = resultsClients.filter((client) => client.type === "client");

  const leaders = resultLeaders;
  const careers = resultCareers;

  return {
    props: {
      partners: JSON.parse(JSON.stringify(partners)),
      clients: JSON.parse(JSON.stringify(clients)),
      associates: JSON.parse(JSON.stringify(associates)),
      leaders: JSON.parse(JSON.stringify(leaders)),
      careers: JSON.parse(JSON.stringify(careers)),
    },
    revalidate: 2,
  };
}
