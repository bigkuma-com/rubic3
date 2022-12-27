import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImagePoint from "../../assets/images/Point.webp";
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
      h="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      pt={{ base: 12, lg: 0 }}
    >
      <Box display="flex" flexDirection="column">
        <Heading
          w={{ base: "full", lg: "95%" }}
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
          w={{ base: "full", lg: "95%" }}
          mb={[6, 8, 10, 14]}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="p" opacity={0.6} fontSize="sm" whiteSpace="pre-line">
            {content.text}
          </Text>
        </BoxMotion>
        <BoxMotion
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          position="relative"
          w={{ base: "full", lg: "90%" }}
          h={["200px", null, "250px", "300px"]}
        >
          <Image
            src={ImagePoint}
            fill
            alt="point"
            style={{
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </BoxMotion>
      </Box>
    </Box>
  );
}

const content = {
  text: `Rubicube Group is a holistic branding and management advisory that excels in brand strategy, identity development, hotel management, F&B management, digital marketing, and communication. Rubicube Group operates in Singapore, Indonesia, and Malaysia, working with clients ranging from independent and international brands since 2008.
  
  With a track record of 14 years, Our deep understanding of and research into the forces of digital disruption, coupled with the new thinking required to unlock growth provides excellence, long-lasting results.`,
};
