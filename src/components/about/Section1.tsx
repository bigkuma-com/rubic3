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
          w={{ base: "full", lg: "80%" }}
          mb={[4, 4, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          HeArt-Work beats talent when talent doesn’t work with a heart
        </Heading>
        <Text
          w={{ base: "full", lg: "70%" }}
          opacity={0.6}
          mb={[6, 8, 10, 14]}
          fontSize="sm"
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          With a track record of 14 years, Our deep understanding of and
          research into the forces of digital disruption, coupled with the new
          thinking required to unlock growth provides excellence, long-lasting
          results.
        </Text>
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
