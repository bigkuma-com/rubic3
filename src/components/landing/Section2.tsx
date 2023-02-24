import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import ImageBgSection1 from "../../assets/images/francesco-ungaro-n3kAqdcF_Fo-unsplash.jpg";
import { marginXSection } from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";

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

export default function Section2() {
  const { push } = useRouter();

  return (
    <BoxMotion
      h={{ base: "fit-content", lg: "100vh" }}
      w="full"
      bg="dark"
      display="flex"
      px={marginXSection}
      position="relative"
      flexDir={{ base: "column", lg: "row" }}
      gap={{ base: 10, lg: 0 }}
    >
      <Box w="full" h="full" position="absolute" top={0} left={0}>
        <Image
          src={ImageBgSection1}
          fill
          alt="s2"
          style={{
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
      </Box>
      <Box
        w={{ base: "full", lg: "50%" }}
        color="white"
        mt="12%"
        pr={{ base: 0, lg: "7%" }}
        display="flex"
        flexDir={"column"}
        gap={8}
        zIndex={5}
      >
        <Heading
          fontSize="5xl"
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          We use the power of creativity to build better futures for our people,
          planet, businesses, and communities.
        </Heading>

        <BoxMotion
          variants={itemBotToTop(0.3)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Button text="View Our Works" onClick={() => push("/about")} />
        </BoxMotion>
      </Box>
    </BoxMotion>
  );
}
