import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import Section1 from "../components/services/Section1";
import { getFullList } from "../utils/api";
import { sidebarServices } from "../utils/consts";
import { arrayChunk } from "../utils/functions";

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

  useEffect(() => {
    const i = sidebarServices.findIndex(
      (item) => item.query === query?.selected
    );
    if (i > -1) {
      setSection(i);
    }
  }, [query]);

  const slideTo = (index: any) => swiper.slideTo(index);

  return (
    <BoxMotion position="relative" display="flex" bg="dark">
      <Header />
      <Box
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
        position="relative"
        left={0}
        top={0}
        w="30%"
        h="100vh"
        display="flex"
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
      <Box h="100vh" w="70%">
        <Swiper
          direction={"horizontal"}
          simulateTouch={true}
          onSlideChange={(swiper) => {
            setSection(swiper.realIndex);
            replace({
              query: {
                ...query,
                selected: sidebarServices[swiper.realIndex].query,
              },
            });
          }}
          onSwiper={setSwiper}
        >
          <SwiperSlide>
            <Section1 />
          </SwiperSlide>
          <SwiperSlide>
            <Box h="100vh" bg="green.800" w="full"></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box h="100vh" bg="blue.800" w="full"></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box h="100vh" bg="yellow.800" w="full"></Box>
          </SwiperSlide>
        </Swiper>
      </Box>
      <Footer />
    </BoxMotion>
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
