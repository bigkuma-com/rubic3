import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import Section2Image from "../../assets/images/Rubicube Office.webp";
import ArrowRightSm from "../../assets/js/ArrowRightSm";
import { HomeContext } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";

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
      zIndex={30}
    >
      <Box
        w="50%"
        color="white"
        pr="7%"
        display="flex"
        flexDir="column"
        gap={8}
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
          <Button
            // rightIcon={<ArrowRightSm />}
            variant="outline"
            fontWeight={200}
            borderRadius={32}
            fontSize="sm"
            px={5}
            py={4}
            display="flex"
            alignItems="center"
            gap={3}
            color="white"
            _hover={{
              color: "dark",
              backgroundColor: "white",
            }}
          >
            Discover more
            <ArrowRightSm />
          </Button>
        </Box>
      </Box>
      <Box w="50%" pr="12%">
        <Box position="relative" h="60vh" w="full" zIndex={35}>
          <Image
            alt="Rubicube Office"
            src={Section2Image}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      <AnimatePresence>
        {section === 1 && (
          <>
            <Box
              position="absolute"
              right="6%"
              top="0%"
              h="100vh"
              zIndex={31}
              overflow="hidden"
            >
              <BoxMotion
                initial={{ opacity: 0 }}
                animate={{
                  y: ["-110%", "140%"],
                  opacity: 1,
                  transition: {
                    duration: 6,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                <Text
                  style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(-180deg)",
                  }}
                  fontSize="180"
                  textShadow="-1px -1px 0 #ffffff15, 1px -1px 0 #ffffff15, -1px 1px 0 #ffffff15, 1px 1px 0 #ffffff15"
                  color="dark"
                  whiteSpace="nowrap"
                >
                  Advso<span style={{ color: "white" }}>r</span>
                </Text>
              </BoxMotion>
            </Box>
            <Box
              position="absolute"
              right="6%"
              top="0%"
              h="100vh"
              zIndex={31}
              overflow="hidden"
            >
              <BoxMotion
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: ["-110%", "140%"],
                  transition: {
                    duration: 6,
                    delay: 3,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 1,
                  },
                }}
              >
                <Text
                  style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(-180deg)",
                  }}
                  fontSize="180"
                  textShadow="-1px -1px 0 #ffffff15, 1px -1px 0 #ffffff15, -1px 1px 0 #ffffff15, 1px 1px 0 #ffffff15"
                  color="dark"
                  whiteSpace="nowrap"
                >
                  Advso<span style={{ color: "white" }}>r</span>
                </Text>
              </BoxMotion>
            </Box>
          </>
        )}
      </AnimatePresence>
    </BoxMotion>
  );
}
