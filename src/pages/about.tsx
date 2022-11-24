import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import Section1 from "../components/about/Section1";
import Section2 from "../components/about/Section2";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import { getFullList } from "../utils/api";
import { themeColor } from "../utils/consts";
import { dynamicSort } from "../utils/functions";

export default function About({
  clients,
  partners,
  associates,
}: {
  clients: any;
  partners: any;
  associates: any;
}) {
  const { push } = useRouter();
  const [section, setSection] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isEven, setIsEven] = useState(true);

  useEffect(() => {
    setIsEven(!!(section % 2));
  }, [section]);

  const slideTo = (index: any) => swiper.slideTo(index);

  return (
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
        w="35%"
        h="100vh"
        display="flex"
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
          {sidebarItems.map((item, i) => {
            return (
              <Box
                as="li"
                key={i}
                opacity={section == i ? 1 : 0.6}
                _hover={{ opacity: 1 }}
                cursor="pointer"
                onClick={() => {
                  slideTo(i);
                  setSection(i);
                }}
                className="animate-fade"
              >
                {item}
              </Box>
            );
          })}
        </Box>
        <BoxMotion
          w="2px"
          h={`${(section + 1) * 20}%`}
          position="absolute"
          opacity={0.6}
          right={0}
          top={0}
          zIndex={5}
          layout
          animate={{
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
          h="100vh"
          position="absolute"
          right={0}
          top={0}
          zIndex={4}
          animate={{
            backgroundColor: themeColor[+!isEven],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        />
      </Box>
      <Box h="100vh" w="full">
        <Swiper
          direction={"vertical"}
          mousewheel={true}
          modules={[Mousewheel]}
          className="mySwiper"
          simulateTouch={false}
          onSlideChange={(swiper) => {
            setSection(swiper.realIndex);
          }}
          onSwiper={setSwiper}
        >
          <SwiperSlide>
            <Section1 />
          </SwiperSlide>
          <SwiperSlide>
            <Section2 clients={clients} />
          </SwiperSlide>
          <SwiperSlide>
            <Center h="full">
              <Heading>kon2</Heading>
            </Center>
          </SwiperSlide>
          <SwiperSlide>
            <Center h="full">
              <Heading>kon2</Heading>
            </Center>
          </SwiperSlide>
          <SwiperSlide>
            <Center h="full">
              <Heading>kon2</Heading>
            </Center>
          </SwiperSlide>
        </Swiper>
      </Box>
      <Footer isLight={!isEven} />
    </BoxMotion>
  );
}

const sidebarItems = [
  "Company Overview",
  "Clients",
  "Leadership",
  "Partners",
  "Careers",
];

export async function getStaticProps() {
  const results = await getFullList({ collection: "clients_partners" });

  const partners = results
    .filter((client) => client.type === "partner")
    .sort(dynamicSort("order"));

  const associates = results
    .filter((client) => client.type === "associate")
    .sort(dynamicSort("order"));

  const clients = results
    .filter((client) => client.type === "client")
    .sort(dynamicSort("order"));

  return {
    props: {
      partners: JSON.parse(JSON.stringify(partners)),
      clients: JSON.parse(JSON.stringify(clients)),
      associates: JSON.parse(JSON.stringify(associates)),
    },
  };
}
