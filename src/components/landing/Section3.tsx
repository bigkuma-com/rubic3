import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useContext, useState } from "react";
import IconPlus from "../../assets/js/IconPlus";
import { HomeContext } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
import RunningText from "./Runningtext";

export default function Section3() {
  const { section } = useContext(HomeContext);
  const [menuHover, setMenuHover] = useState(-1);

  console.log("kontol:", menuHover);

  return (
    <Box
      h="100vh"
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px="8%"
      position="relative"
    >
      <LayoutGroup>
        <Box
          display="flex"
          flexDir="column"
          gap={3}
          w="full"
          mr="25%"
          color={"white"}
          onMouseLeave={() => setMenuHover(-1)}
          zIndex={5}
        >
          {contents.map(({ title, subtitle }, i) => {
            return (
              <Box
                key={i}
                onMouseEnter={() => setMenuHover(i)}
                _hover={{
                  opacity: menuHover === i ? 1 : 0.6,
                }}
                opacity={menuHover === -1 ? 1 : 0.6}
                className="animate-fade"
              >
                <Box display="flex" flexDir="column" gap={2}>
                  <BoxMotion layout>
                    <Heading fontWeight="thin">{title}</Heading>
                  </BoxMotion>
                  <AnimatePresence>
                    {menuHover === i && (
                      <BoxMotion
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end"
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
                          <Text fontSize="x-small" display="flex" gap={1}>
                            View more <IconPlus />
                          </Text>
                        </BoxMotion>
                      </BoxMotion>
                    )}
                  </AnimatePresence>
                  <BoxMotion layout>
                    <Divider />
                  </BoxMotion>
                </Box>
              </Box>
            );
          })}
        </Box>
      </LayoutGroup>

      <RunningText
        text={
          <span>
            Se<span style={{ color: "white" }}>r</span>vice
          </span>
        }
      />
    </Box>
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
