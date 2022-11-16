import { Text } from "@chakra-ui/react";
import BoxMotion from "../BoxMotion";

export default function RunningText({ text }: { text: any }) {
  return (
    <>
      <BoxMotion
        position="absolute"
        right="6%"
        top="0%"
        h="100vh"
        zIndex={2}
        w="full"
        overflow="hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
      >
        <BoxMotion
          animate={{
            y: ["-110%", "110%"],
            transition: {
              delay: 0.5,
              duration: 4,
              ease: "linear",
              repeat: Infinity,
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
            w="full"
            letterSpacing="wide"
          >
            {text}
          </Text>
        </BoxMotion>
      </BoxMotion>
      <BoxMotion
        position="absolute"
        right="6%"
        top="0%"
        h="100vh"
        zIndex={2}
        w="full"
        overflow="hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
      >
        <BoxMotion
          animate={{
            y: ["-110%", "110%"],
            transition: {
              delay: 2.5,
              duration: 4,
              ease: "linear",
              repeat: Infinity,
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
            w="full"
            letterSpacing="wide"
          >
            {text}
          </Text>
        </BoxMotion>
      </BoxMotion>
    </>
  );
}
