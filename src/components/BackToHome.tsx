import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import { animateLeftRight } from "../utils/consts";
import BoxMotion from "./BoxMotion";

export default function BackToHome({ color = "light" }: { color?: string }) {
  const { push } = useRouter();
  return (
    <>
      <Box
        position="fixed"
        top="50%"
        left="5%"
        transform="translate(-50%, -50%)"
        zIndex={50}
        color={color}
      >
        <BoxMotion
          variants={animateLeftRight}
          initial="initial"
          animate="animate"
        >
          <Box
            display={{ base: "none", lg: "flex" }}
            flexDirection="column"
            alignItems="center"
            gap={2}
            cursor="pointer"
            color="inherit"
            onClick={() => push("/")}
          >
            <Text
              color="inherit"
              as="span"
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(-180deg)",
              }}
              fontSize="small"
              letterSpacing="wider"
              fontWeight={400}
            >
              Back to Home
            </Text>
            <ArrowLeftSm />
          </Box>
        </BoxMotion>
      </Box>
    </>
  );
}
