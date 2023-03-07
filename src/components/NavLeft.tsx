import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { itemBotToTop, sidebarAbout } from "../utils/consts";
import BoxMotion from "./BoxMotion";

export default function NavLef({
  color = "light",
  contents,
  section,
  setSection,
  showPaddingLeft = true,
}: {
  color?: string;
  contents: any;
  section: number;
  setSection: any;
  showPaddingLeft?: boolean;
}) {
  const { query, replace } = useRouter();
  return (
    <>
      <Box
        position="fixed"
        left={0}
        top={0}
        w="30%"
        pl="10%"
        h="100vh"
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
        color={color}
      >
        <Box
          as="ul"
          display="flex"
          flexDirection="column"
          gap={4}
          listStyleType="none"
        >
          {contents.map((item: any, i: number) => {
            return (
              <BoxMotion
                key={i}
                variants={itemBotToTop(i * 0.2)}
                initial="offscreen"
                whileInView="onscreen"
              >
                <Box
                  as="li"
                  fontWeight={section == i ? 400 : 300}
                  opacity={section == i ? 1 : 0.6}
                  _hover={{ opacity: 1 }}
                  cursor="pointer"
                  onClick={() => {
                    setSection(i);
                    replace({
                      query: { ...query, selected: contents[i].query },
                    });
                  }}
                  className="animate-fade"
                >
                  {item.name}
                </Box>
              </BoxMotion>
            );
          })}
        </Box>
      </Box>

      <BoxMotion
        w="2px"
        position="fixed"
        opacity={0.6}
        left="30%"
        top={0}
        zIndex={1005}
        layout
        initial={{
          height: "0%",
        }}
        animate={{
          height: `${(section + 1) * 20}%`,
          backgroundColor: color,
          transition: {
            backgroundColor: {
              duration: 0.5,
              ease: "easeInOut",
            },
            height: {
              duration: 2,
            },
          },
        }}
      />

      <BoxMotion
        opacity={0.1}
        w="2px"
        position="absolute"
        left="30%"
        top={0}
        zIndex={1004}
        initial={{
          height: "0%",
        }}
        animate={{
          height: "100%",
          backgroundColor: color,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            height: {
              duration: 1,
              ease: "easeInOut",
            },
          },
        }}
      />

      <Box h="full" display={{ base: "flex", lg: "none" }} alignItems="center">
        <BoxMotion
          w="3px"
          position="absolute"
          opacity={0.6}
          right={0}
          top={0}
          zIndex={5}
          layout
          initial={{
            height: "0%",
          }}
          animate={{
            height: `${(section + 1) * 20}%`,
            backgroundColor: color,
            transition: {
              backgroundColor: {
                duration: 0.5,
                ease: "easeInOut",
              },
              height: {
                duration: 2,
              },
            },
          }}
        />
        <BoxMotion
          opacity={0.1}
          w="3px"
          position="absolute"
          right={0}
          top={0}
          zIndex={4}
          initial={{
            height: "0vh",
          }}
          animate={{
            height: "100vh",
            backgroundColor: color,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              height: {
                duration: 1,
                ease: "easeInOut",
              },
            },
          }}
        />
      </Box>
    </>
  );
}
