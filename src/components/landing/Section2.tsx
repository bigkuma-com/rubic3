import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import ImageBgSection1 from "../../assets/images/Homepage Background Work Thumbnail.webp";
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
      py={{ base: 20, lg: 0 }}
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
          }}
        />
      </Box>
      <Box
        w={{ base: "full", lg: "50%" }}
        color="white"
        mt={{ base: 0, lg: "12%" }}
        pr={{ base: 0, lg: "7%" }}
        display="flex"
        flexDir={"column"}
        gap={8}
        zIndex={5}
      >
        <BoxMotion
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text
            fontSize={{ base: "xs", lg: "md" }}
            as="h3"
            mb={2}
            opacity={0.7}
          >
            Singapore | Indonesia
          </Text>
          <Heading fontSize={["3xl", null, null, "4xl", "5xl"]} as="h2">
            We use the power of creativity to build better futures for our
            people, planet, businesses, and communities.
          </Heading>
        </BoxMotion>

        <BoxMotion
          variants={itemBotToTop(0.3)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Button text="View Our Works" onClick={() => push("/works")} />
        </BoxMotion>
      </Box>
    </BoxMotion>
  );
}
