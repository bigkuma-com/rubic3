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
  marginBottom,
  marginRightContact,
  marginTop,
  sectionMarginLeft,
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
      pl={sectionMarginLeft}
      pr={marginRightContact}
      pt={marginTop}
      pb={marginBottom}
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
              {`Rubicube Group, established in 2008, is a distinguished branding and management advisory firm renowned for innovative solutions in brand strategy, identity development, hotel management, digital marketing, and communication. Our approach is holistic, aiming to seamlessly integrate all aspects of a business, from brand identity to digital presence, to ensure success. Operating in Singapore and Indonesia, we have partnered with a diverse clientele, from startups to international brands. Our commitment to client-centric strategies has made us a leader in helping businesses achieve their goals and unlock their full potential.`}
            </Text>
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
          mb={{ base: 6, lg: 20 }}
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
    link: "/our-company?selected=creative",
  },
  {
    image: RubicHospitality,
    title: "Rubicube Hospitality",
    link: "/our-company?selected=hospitality",
  },
];
