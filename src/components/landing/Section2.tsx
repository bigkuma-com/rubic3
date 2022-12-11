import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import Section2Image from "../../assets/images/Rubicube Office.webp";
import { marginXSection } from "../../utils/consts";
import { HomeContext } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import RunningText from "./Runningtext";

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
  const { section } = useContext(HomeContext);

  return (
    <BoxMotion
      h={{ base: "fit-content", lg: "100vh" }}
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px={marginXSection}
      position="relative"
      flexDir={{ base: "column", lg: "row" }}
      gap={{ base: 10, lg: 0 }}
    >
      <Box
        w={{ base: "full", lg: "50%" }}
        color="white"
        pr={{ base: 0, lg: "7%" }}
        display="flex"
        flexDir={"column"}
        gap={8}
        zIndex={5}
      >
        <Heading
          fontSize="3xl"
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          We use the power of creativity to build better futures for our people,
          planet, businesses, and communities.
        </Heading>
        <Text
          fontSize="sm"
          color="whiteAlpha.500"
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Rubicube Group is a holistic branding and management advisory that
          excels in brand strategy, identity development, hotel management, F&B
          management, digital marketing, and communication. Our role is to
          provide businesses with access to the best advisory and expertise to
          deliver transformative business results to become leading brands.
        </Text>
        <BoxMotion
          variants={itemBotToTop(0.3)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Button text="Discover more" onClick={() => push("/about")} />
        </BoxMotion>
      </Box>
      <Box w={{ base: "full", lg: "50%" }} pr={{ base: 0, lg: "12%" }}>
        <BoxMotion
          variants={itemBotToTop(0.6)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          position="relative"
          h={{ base: "40vmax", lg: "60vmin" }}
          w="full"
          zIndex={5}
        >
          <Image
            alt="Rubicube Office"
            src={Section2Image}
            fill
            style={{ objectFit: "cover" }}
          />
        </BoxMotion>
      </Box>

      <RunningText
        text={
          <span>
            Adviso<span style={{ color: "white" }}>r</span>
          </span>
        }
      />
    </BoxMotion>
  );
}
