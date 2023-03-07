import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Rubic360 from "../../assets/images/FA Rubicube 360 Digital logo2.png";
import RubicCreative from "../../assets/images/FA Rubicube Creativity Logo2.png";
import RubicHospitality from "../../assets/images/FA Rubicube Hospitality Logo2.png";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Section1() {
  const { push } = useRouter();

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      h="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py={{ base: "25vmax", lg: 0 }}
    >
      <Box display="flex" flexDirection="column">
        <Heading
          w={{ base: "full", lg: "70%" }}
          fontSize={{ base: "xl", lg: "3xl" }}
          mb={[4, 4, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          HeArt-Work beats talent when talent doesn’t work with a heart
        </Heading>
        <BoxMotion
          w={{ base: "full", lg: "80%" }}
          mb={[6, 8]}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="p" fontSize="sm">
            <Text as="span" opacity={0.6}>
              Rubicube Group is a holistic branding and management advisory that
              excels in brand strategy, identity development, hotel management,
              F&B management, digital marketing, and communication. Rubicube
              Group operates in Singapore, Indonesia, and Malaysia, working with
              clients ranging from independent and international brands since
              2008.
            </Text>
            <br />
            <br />
            <b>
              Today, we are proud to announce that we have joined the Adhya
              Group and have extended our company divisions and services.
            </b>
          </Text>
        </BoxMotion>
        <BoxMotion
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          display="flex"
          gap={{ base: 4, lg: 10 }}
          alignItems={{ base: "flex-start", lg: "center" }}
          flexDir={{ base: "column", lg: "row" }}
        >
          {rubicServices.map(({ image, link, title }, i) => {
            return (
              <Fragment key={i}>
                <Box
                  onClick={() => {
                    push(link);
                  }}
                  position="relative"
                >
                  <BoxMotion
                    position="relative"
                    w={{ base: "120px", xl: "180px" }}
                    h={{ base: "80px", xl: "120px" }}
                    cursor="pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={image}
                      fill
                      alt={title}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </BoxMotion>
                </Box>

                {i < 2 && (
                  <Box
                    h={{ base: "1px", lg: "80px" }}
                    w={{ base: "full", lg: "1px" }}
                    bg="light"
                  />
                )}
              </Fragment>
            );
          })}
        </BoxMotion>
      </Box>
    </Box>
  );
}

const rubicServices = [
  {
    image: RubicCreative,
    title: "Rubicube Creativity",
    link: "/services?selected=creative",
  },
  {
    image: Rubic360,
    title: "Rubicube 360 Digital",
    link: "/services?selected=360",
  },
  {
    image: RubicHospitality,
    title: "Rubicube Hospitality",
    link: "/services?selected=hospitality",
  },
];
