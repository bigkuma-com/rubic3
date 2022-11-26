import { Text } from "@chakra-ui/react";
import { animateRightLeft } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function HomePagination({
  section,
  maxSection,
}: {
  section: number;
  maxSection: number;
}) {
  return (
    <BoxMotion
      variants={animateRightLeft}
      initial="initial"
      animate="animate"
      exit="exit"
      letterSpacing="widest"
    >
      <Text as="span" fontSize="small" color="light" letterSpacing={2}>
        0{section + 1}{" "}
        <Text as="span" color="light" opacity={0.6} letterSpacing={2}>
          / 0{maxSection}
        </Text>
      </Text>
    </BoxMotion>
  );
}
