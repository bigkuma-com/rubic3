import { Box, Divider, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import IconPlus from "../../assets/js/IconPlus";
import { marginXSection, sidebarServices } from "../../utils/consts";
import { HomeContext } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
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

export default function Section3() {
  const { push } = useRouter();
  const { section } = useContext(HomeContext);
  const [menuHover, setMenuHover] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <BoxMotion
      h={{ base: "60vh", lg: "100vh" }}
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px={marginXSection}
      py={{ base: "15%", lg: 0 }}
      position="relative"
    >
      <LayoutGroup>
        <Box
          display="flex"
          flexDir="column"
          gap={3}
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
                  opacity: menuHover === i ? 1 : 0.6,
                }}
                opacity={menuHover === -1 ? 1 : 0.6}
                className="animate-fade"
              >
                <BoxMotion
                  layout
                  display="flex"
                  flexDir="column"
                  gap={2}
                  variants={itemBotToTop(i * 0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                >
                  <BoxMotion layout>
                    <Heading
                      fontWeight="thin"
                      cursor="pointer"
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
                        <BoxMotion layout>
                          <Text
                            fontWeight={200}
                            letterSpacing="wider"
                            opacity={0.6}
                          >
                            {subtitle}
                          </Text>
                        </BoxMotion>

                        <BoxMotion layout>
                          <Text
                            fontSize="x-small"
                            display="flex"
                            alignItems="center"
                            gap={1}
                            cursor="pointer"
                            mt={{ base: 5, lg: 0 }}
                            onClick={() =>
                              push(
                                `/services?selected=${sidebarServices[i].query}`
                              )
                            }
                          >
                            View more <IconPlus />
                          </Text>
                        </BoxMotion>
                      </BoxMotion>
                    )}
                  </AnimatePresence>
                  <BoxMotion layout>
                    <Divider />
                  </BoxMotion>
                </BoxMotion>
              </Box>
            );
          })}
        </Box>
      </LayoutGroup>

      <RunningText
        text="Service"
      />
    </BoxMotion>
  );
}

const contents = [
  {
    title: "Creative",
    subtitle: "Brand Research & analysis, Strategy, Design, and Production",
  },
  {
    title: "Hospitality",
    subtitle: "Brand Research & analysis, Strategy, Design, and Production",
  },
  {
    title: "Connoisseur",
    subtitle: "Brand Research & analysis, Strategy, Design, and Production",
  },
  {
    title: "360 Digital",
    subtitle: "Brand Research & analysis, Strategy, Design, and Production",
  },
];
