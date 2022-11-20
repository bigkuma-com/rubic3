import { Box, Text } from "@chakra-ui/react";
import { animateBottomToTop, marginX, marginY } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Copyright() {
  return (
    <BoxMotion
      position="fixed"
      bottom={marginY}
      left={marginX}
      zIndex={500}
      variants={animateBottomToTop}
      initial="initial"
      animate="animate"
      exit="exit"
      p={2}
      color="white"
    >
      <Box>
        <Text fontSize="small">©2022 Rubicube Group. All Right Reserved</Text>
      </Box>
    </BoxMotion>
  );
}
