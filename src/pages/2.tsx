import { Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import { marginX } from "../utils/consts";
import { HomeContext } from "../utils/hooks";

export default function Home() {
  const [section, setSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const homepageRef = useRef<any>(null);

  return (
    <HomeContext.Provider value={{ section, setSection }}>
      <Header />

      <Box
        h="100vh"
        position="absolute"
        top={0}
        left={0}
        overflow="auto"
        w="full"
        ref={homepageRef}
        onScroll={(e) => {
          setScrollPosition(e.currentTarget.scrollTop);
          setSection(
            Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight)
          );
        }}
      >
        <Section1 />
        <Section2 />
        <Box h="100vh" bg="purple.900"></Box>
        <Box h="100vh" bg="pink.900"></Box>
      </Box>

      <Box
        position="fixed"
        zIndex={50}
        right={marginX}
        top="50%"
        transform="translateY(-50%)"
      >
        <Text
          as="span"
          letterSpacing="widest"
          fontSize="small"
          color="whiteAlpha.700"
        >
          <Text as="span" color="white">
            0{section + 1}
          </Text>{" "}
          / 04
        </Text>
      </Box>

      <Footer isHomepage isShowing={scrollPosition > 400} />
    </HomeContext.Provider>
  );
}
