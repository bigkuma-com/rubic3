import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  return (
    <Box
      w="full"
      h="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      pt={{ base: 12, lg: 0 }}
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
        <Box display="flex" gap={10} alignItems="center">
          {[RubicCreative, Rubic360, RubicHospitality].map((item, i) => {
            return (
              <Fragment key={i}>
                <BoxMotion
                  // bg="yellow.100"
                  variants={itemBotToTop(0.4)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  position="relative"
                  w={{ base: "full", xl: "180px" }}
                  h={{ base: "180px", xl: "120px" }}
                >
                  <Image
                    src={item}
                    fill
                    alt="point"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                </BoxMotion>

                {i < 2 && <Box h="80px" w="1px" bg="light" />}
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
