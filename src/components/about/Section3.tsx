import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "swiper/css";
import { itemBotToTop, sectionMarginLeft2 } from "../../utils/consts";
import TeamShowCase from "../TeamShowCase";

export default function Section3({ leaders }: { leaders: any }) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      position="relative"
      w={{ base: "full", lg: "70%" }}
      display="flex"
      alignItems="center"
      py={{ base: "10vh", lg: "15vh" }}
      bg="dark"
      h="full"
      minH="100vh"
      pl={sectionMarginLeft2}
      pr={{ base: 0, lg: 28 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        w="full"
        h="full"
        position="relative"
      >
        <Heading
          w={{ base: "full", lg: "70%" }}
          mb={[2, 3, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          px={[5, 6, 10, 0]}
        >
          Our Team
        </Heading>

        <TeamShowCase leaders={leaders} />
      </Box>
    </Box>
  );
}
