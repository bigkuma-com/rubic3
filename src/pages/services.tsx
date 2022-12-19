import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import LogoRubicGroup from "../assets/js/LogoRubicGroup";
import LogoRubicubeConnoisseur from "../assets/js/LogoRubicubeConnoisseur";
import LogoRubicubeHospitality from "../assets/js/LogoRubicubeHospitality";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import HomePagination from "../components/landing/HomePagination";
import Section1 from "../components/services/Section1";
import Section2 from "../components/services/Section2";
import Section3 from "../components/services/Section3";
import Section4 from "../components/services/Section4";
import { getFullList } from "../utils/api";
import {
  marginX,
  marginY,
  showOnLarge,
  sidebarServices,
} from "../utils/consts";
import { arrayChunk } from "../utils/functions";

const seo = {
  url: "https://rubic3.com/services",
  title: "Services - Rubicube Group",
  description: "What we do.",
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

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [section, setSection] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);

  const slideTo = (index: any) => swiper.slideTo(index);

  useEffect(() => {
    const i = sidebarServices.findIndex(
      (item) => item.query === query?.selected
    );

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
      <BoxMotion position="relative" display="flex" bg="dark">
        <Header />
        <Box
          display={showOnLarge}
          position="fixed"
          top="50%"
          left="5%"
          transform="translate(-50%, -50%)"
          zIndex={50}
          color="light"
        >
          <Box
            display="flex"
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
        </Box>
        <Box
          position="fixed"
          left={0}
          top={0}
          w="30%"
          h="100vh"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          pl="10%"
          color="light"
        >
          <Box
            as="ul"
            display="flex"
            flexDirection="column"
            gap={4}
            listStyleType="none"
          >
            {sidebarServices.map((item, i) => {
              return (
                <Box
                  as="li"
                  fontWeight={300}
                  key={i}
                  opacity={section == i ? 1 : 0.6}
                  _hover={{ opacity: 1 }}
                  cursor="pointer"
                  onClick={() => {
                    slideTo(i);
                    setSection(i);
                    replace({
                      query: { ...query, selected: sidebarServices[i].query },
                    });
                  }}
                  className="animate-fade"
                >
                  {item.name}
                </Box>
              );
            })}
          </Box>
          <BoxMotion
            w="2px"
            h={`${(section + 1) * 25}%`}
            position="absolute"
            opacity={0.6}
            right={0}
            top={0}
            zIndex={5}
            layout
            animate={{
              backgroundColor: "var(--chakra-colors-light)",
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
            h="100vh"
            position="absolute"
            right={0}
            top={0}
            zIndex={4}
            animate={{
              backgroundColor: "var(--chakra-colors-light)",
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
          />
        </Box>

        <Box w="30%" display={showOnLarge} />

        <Box
          position={{ base: "fixed", lg: "unset" }}
          bottom={marginY}
          left={marginX}
          transform="translateY(-50%)"
          zIndex={99}
          display={{ base: "unset", lg: "none" }}
        >
          <HomePagination
            section={section}
            maxSection={4}
            bg="transparent"
            enableNavigation={true}
            nextSlide={() => {
              slideTo(section + 1);
            }}
            prevSlide={() => {
              slideTo(section - 1);
            }}
          />
        </Box>

        <Box
          h="100vh"
          w={{ base: "full", lg: "70%" }}
          className="page-services"
          position="relative"
        >
          <Swiper
            direction={"horizontal"}
            modules={[Pagination, Navigation]}
            simulateTouch={true}
            allowTouchMove={isLarge}
            onSlideChange={(swiper) => {
              setSection(swiper.realIndex);
              replace({
                query: {
                  ...query,
                  selected: sidebarServices[swiper.realIndex].query,
                },
              });
            }}
            onInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRefSlides.current;
              swiper.params.navigation.nextEl = nextRefSlides.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSwiper={setSwiper}
          >
            <SwiperSlide
              onScroll={(e) => {
                console.log(
                  e.currentTarget.scrollTop + e.currentTarget.offsetHeight,
                  e.currentTarget.scrollHeight
                );
                if (
                  !(
                    e.currentTarget.scrollTop + e.currentTarget.offsetHeight <
                    e.currentTarget.scrollHeight - 1
                  )
                ) {
                  slideTo(1);
                }
              }}
            >
              <Section1 />
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
        <Footer />
      </BoxMotion>
    </>
  );
}

const serviceLogos = [
  <LogoRubicGroup key={1} />,
  <LogoRubicubeHospitality key={2} />,
  <LogoRubicubeConnoisseur key={3} />,
  <LogoRubicGroup key={4} />,
];

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

  const leaders = arrayChunk(resultLeaders, 4);
  const careers = arrayChunk(resultCareers, 3);

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
