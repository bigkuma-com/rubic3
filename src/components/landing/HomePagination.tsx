import { Text } from "@chakra-ui/react";
import { animateRightLeft, marginX } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function HomePagination({ section }: { section: number }) {
  return (
    <BoxMotion
      position="fixed"
      zIndex={50}
      right={marginX}
      top="50%"
      transform="translateY(-50%)"
      variants={animateRightLeft}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Text
        as="span"
        letterSpacing="widest"
        fontSize="small"
        color="whiteAlpha.700"
      >
        <Text as="span" color="white">
          0{section + 1}
        </Text>{" "}
        / 04
      </Text>
    </BoxMotion>
  );
}
