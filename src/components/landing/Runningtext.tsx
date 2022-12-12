import { Text } from "@chakra-ui/react";
import BoxMotion from "../BoxMotion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function RunningText({ text }: { text: any }) {
  return (
    <>
      <BoxMotion
        display={{ base: "none", lg: "unset" }}
        position="absolute"
        right="6%"
        top="0%"
        h="100vh"
        zIndex={2}
        w="full"
        overflow="hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {[0, 1].map((i) => {
          return (
            <BoxMotion
              key={i}
              animate={{
                y: i === 1 ? ["-200vh", "0vh"] : ["-100vh", "100vh"],
                transition: {
                  delay: i === 1 ? 2.1 : 0,
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
              h="100vh"
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
                userSelect="none"
              >
                {text}
              </Text>
            </BoxMotion>
          );
        })}
      </BoxMotion>
    </>
  );
}
