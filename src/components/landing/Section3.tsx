import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  marginXSection,
  showOnLarge,
  sidebarServices,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import Divider from "../Divider";

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
    <Box mt={20} px={marginXSection} h={{ base: "55vh", xl: "65vh" }} bg="dark">
      <Divider text="Our Division" />

      <LayoutGroup>
        <Box
          display="flex"
          flexDir="column"
          gap={5}
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
                onMouseLeave={() => {
                  isLarge && setMenuHover(-1);
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
                      fontSize={{ base: "3xl", lg: "5xl" }}
                      onClick={() => {
                        if (isLarge) {
                          push(
                            `/our-company?selected=${sidebarServices[i].query}`
                          );
                        } else {
                          if (menuHover === i) {
                            push(
                              `/our-company?selected=${sidebarServices[i].query}`
                            );
                            setMenuHover(-1);
                          } else {
                            setMenuHover(i);
                          }
                        }
                      }}
                    >
                      {title}
                    </Heading>
                  </BoxMotion>
                  <AnimatePresence>
                    {menuHover == i && (
                      <BoxMotion
                        layout
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={{ base: "column", lg: "row" }}
                        alignItems={{ base: "flex-start", lg: "flex-end" }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            ease: "easeInOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.1,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <BoxMotion layout w="75%">
                          <Text
                            fontWeight={200}
                            letterSpacing="wider"
                            opacity={0.6}
                            fontSize={{ base: "sm", lg: "md" }}
                          >
                            {subtitle}
                          </Text>
                        </BoxMotion>

                        <BoxMotion layout display={showOnLarge}>
                          <Button
                            text="View more"
                            onClick={() =>
                              push(
                                `/our-company?selected=${sidebarServices[i].query}`
                              )
                            }
                          />
                        </BoxMotion>
                      </BoxMotion>
                    )}
                  </AnimatePresence>
                  <BoxMotion layout mt={5}>
                    <Divider mb={0} lineOpacity={0.3} />
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
