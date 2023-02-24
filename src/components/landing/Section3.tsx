import { Box, Divider, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { marginXSection, sidebarServices } from "../../utils/consts";
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

export default function Section3() {
  const { push } = useRouter();
  const [menuHover, setMenuHover] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box my="5vh" px={marginXSection} h="65vh" bg="dark">
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        mb={14}
      >
        <Heading as="h3" fontSize="lg" mr={5}>
          Our Division
        </Heading>
        <Box h="1px" bg="light" flexGrow={1} opacity={0.5} mb={1} />
      </Box>

      <LayoutGroup>
        <Box
          display="flex"
          flexDir="column"
          gap={5}
          h="full"
          w="full"
          mr={{ base: 0, lg: "25%" }}
          color={"white"}
          onMouseLeave={() => {
            isLarge && setMenuHover(-1);
          }}
          zIndex={5}
        >
          {contents.map(({ title, subtitle }, i) => {
            return (
              <Box
                key={i}
                onMouseEnter={() => {
                  isLarge && setMenuHover(i);
                }}
                _hover={{
                  opacity: menuHover === i ? 1 : 0.5,
                }}
                opacity={menuHover === -1 ? 1 : 0.5}
                className="animate-fade"
              >
                <BoxMotion
                  layout
                  display="flex"
                  flexDir="column"
                  variants={itemBotToTop(i * 0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                >
                  <BoxMotion layout>
                    <Heading
                      fontWeight="thin"
                      cursor="pointer"
                      fontSize="5xl"
                      onClick={() =>
                        isLarge
                          ? push(
                              `/services?selected=${sidebarServices[i].query}`
                            )
                          : setMenuHover(menuHover === i ? -1 : i)
                      }
                    >
                      {title}
                    </Heading>
                  </BoxMotion>
                  <AnimatePresence>
                    {menuHover === i && (
                      <BoxMotion
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={{ base: "column", lg: "row" }}
                        alignItems={{ base: "flex-start", lg: "flex-end" }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: "easeInOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.6,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <BoxMotion layout w="75%">
                          <Text
                            fontWeight={200}
                            letterSpacing="wider"
                            opacity={0.6}
                          >
                            {subtitle}
                          </Text>
                        </BoxMotion>

                        <BoxMotion layout>
                          <Button
                            text="View more"
                            onClick={() =>
                              push(
                                `/services?selected=${sidebarServices[i].query}`
                              )
                            }
                          />
                        </BoxMotion>
                      </BoxMotion>
                    )}
                  </AnimatePresence>
                  <BoxMotion layout mt={5}>
                    <Divider />
                  </BoxMotion>
                </BoxMotion>
              </Box>
            );
          })}
        </Box>
      </LayoutGroup>
    </Box>
  );
}

const contents = [
  {
    title: "Creative",
    subtitle: "Brand Research & analysis, Strategy, Design, and Production.",
  },
  {
    title: "Hospitality",
    subtitle:
      "Specializes in providing hotel management and advisory for hotels and resorts.",
  },
  {
    title: "360 Digital",
    subtitle:
      "We are providing 360 digital services, from Creative content, Digital & Social Media Marketing to Hosting & Security.",
  },
];
