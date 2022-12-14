import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Image360 from "../../assets/images/360 Digital.webp";
import LogoRubicubeHospitality from "../../assets/js/LogoRubicubeHospitality";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
  showOnLarge,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import HomePagination from "../landing/HomePagination";

export default function Section4() {
  const { replace, query, push } = useRouter();
  const [menuSelected, setMenuSelected] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <LayoutGroup>
      <Box
        w="full"
        h="fit-content"
        pt={28}
        pb={36}
        pr={sectionMarginRight}
        pl={sectionMarginLeft}
        display="flex"
        flexDirection="column"
      >
        <Box
          pb={12}
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="full"
          h="full"
        >
          <BoxMotion
            layout
            variants={itemBotToTop(0)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false }}
          >
            <LogoRubicubeHospitality />
          </BoxMotion>

          <Box display={showOnLarge}>
            <HomePagination
              section={3}
              maxSection={4}
              enableNavigation={true}
              prevSlide={() => {
                replace({
                  query: { ...query, selected: "connoisseur" },
                });
              }}
            />
          </Box>
        </Box>

        <BoxMotion
          layout
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <BoxMotion layout w="full" position="relative">
            <Image
              src={Image360}
              alt="360 digital"
              height={isLarge ? 700 : 400}
              style={{ objectFit: "contain", objectPosition: "center center" }}
            />
          </BoxMotion>

          <BoxMotion layout mt={16} mb={5}>
            <Text as="h2">Our Services</Text>
          </BoxMotion>

          <BoxMotion
            layout
            display="flex"
            flexDir="column"
            gap={3}
            w="full"
            mr="25%"
            color={"white"}
            zIndex={5}
            h="full"
          >
            {contents.map(({ title, subtitle, list }, i) => {
              return (
                <BoxMotion layout key={i} opacity={1} className="animate-fade">
                  <Box display="flex" flexDir="column" gap={2}>
                    <BoxMotion layout>
                      {i === 0 && (
                        <Box
                          h="0.5px"
                          w="full"
                          bg="light"
                          opacity={0.6}
                          mb={1}
                        />
                      )}
                    </BoxMotion>

                    <BoxMotion
                      layout
                      display="flex"
                      w="full"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text
                        as="h4"
                        fontSize={{ base: "xl", lg: "3xl" }}
                        fontWeight={300}
                        cursor="pointer"
                        onClick={() => {
                          setMenuSelected(menuSelected === i ? -1 : i);
                        }}
                      >
                        <span style={{ opacity: 0.6 }}>0{i + 1}.</span> {title}
                      </Text>
                    </BoxMotion>

                    <BoxMotion layout>
                      <AnimatePresence>
                        {menuSelected === i && (
                          <BoxMotion
                            pb={4}
                            display="flex"
                            flexDirection="column"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            }}
                            exit={{
                              opacity: 0,
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            }}
                          >
                            <Text
                              fontWeight={300}
                              letterSpacing="wider"
                              opacity={0.6}
                              fontSize="xs"
                              my={5}
                            >
                              {subtitle}
                            </Text>
                            <Box
                              as="ul"
                              listStyleType="none"
                              display="flex"
                              flexDirection="column"
                              gap={2}
                            >
                              {list.map((v) => {
                                return (
                                  <Text key={v} as="li">
                                    {v}
                                  </Text>
                                );
                              })}
                            </Box>
                          </BoxMotion>
                        )}
                      </AnimatePresence>
                    </BoxMotion>

                    <BoxMotion layout>
                      <Box h="0.5px" w="full" bg="light" opacity={0.6} />
                    </BoxMotion>
                  </Box>
                </BoxMotion>
              );
            })}
          </BoxMotion>
        </BoxMotion>
      </Box>
    </LayoutGroup>
  );
}

const contents = [
  {
    title: "Creative Content",
    subtitle:
      "Content marketing is the key to reach your target audience and the foundation of a successful digital marketing strategy.",
    list: ["Copywriting", "Photography", "Video Production", "Motion Graphic"],
  },
  {
    title: "Digital Marketing",
    subtitle:
      "Content marketing is the key to reach your target audience and the foundation of a successful digital marketing strategy.",
    list: ["Copywriting", "Photography", "Video Production", "Motion Graphic"],
  },
  {
    title: "Social Media Marketing",
    subtitle:
      "Content marketing is the key to reach your target audience and the foundation of a successful digital marketing strategy.",
    list: ["Copywriting", "Photography", "Video Production", "Motion Graphic"],
  },
  {
    title: "Hosting & Security",
    subtitle:
      "Content marketing is the key to reach your target audience and the foundation of a successful digital marketing strategy.",
    list: ["Copywriting", "Photography", "Video Production", "Motion Graphic"],
  },
];
