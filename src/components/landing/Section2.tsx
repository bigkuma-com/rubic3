import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import Section2Image from "../../assets/images/Rubicube Office.webp";
import { HomeContext } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import RunningText from "./Runningtext";

export default function Section2() {
  const { section } = useContext(HomeContext);

  return (
    <BoxMotion
      h="100vh"
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px="8%"
      position="relative"
    >
      <Box
        w="50%"
        color="white"
        pr="7%"
        display="flex"
        flexDir="column"
        gap={8}
        zIndex={5}
      >
        <Heading fontWeight={400} fontSize="3xl">
          We use the power of creativity to build better futures for our people,
          planet, businesses, and communities.
        </Heading>
        <Text fontSize="sm" color="whiteAlpha.500">
          Rubicube Group is a holistic branding and management advisory that
          excels in brand strategy, identity development, hotel management, F&B
          management, digital marketing, and communication. Our role is to
          provide businesses with access to the best advisory and expertise to
          deliver transformative business results to become leading brands.
        </Text>
        <Box>
          <Button text="Discover more" />
        </Box>
      </Box>
      <Box w="50%" pr="12%">
        <Box position="relative" h="60vh" w="full" zIndex={5}>
          <Image
            alt="Rubicube Office"
            src={Section2Image}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <RunningText
        text={
          <span>
            Advso<span style={{ color: "white" }}>r</span>
          </span>
        }
      />
    </BoxMotion>
  );
}
