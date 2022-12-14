import { Box, Text } from "@chakra-ui/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import { animateRightLeft } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function HomePagination({
  section,
  maxSection,
  enableNavigation = false,
  nextSlide,
  prevSlide,
  bg,
}: {
  section: number;
  maxSection: number;
  enableNavigation?: boolean;
  nextSlide?: any;
  prevSlide?: any;
  bg?: string | undefined;
}) {
  return (
    <BoxMotion
      zIndex={10}
      color="light"
      display="flex"
      gap={3}
      justifyContent="flex-end"
      alignItems="center"
      bg={enableNavigation ? bg ?? "dark" : "transparent"}
      variants={animateRightLeft}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box letterSpacing="widest">
        <Text as="span" fontSize="small" color="light" letterSpacing={2}>
          0{section + 1}{" "}
          <Text as="span" color="light" opacity={0.6} letterSpacing={2}>
            / 0{maxSection}
          </Text>
        </Text>
      </Box>
      {enableNavigation && (
        <>
          <Box
            opacity={section === 0 ? 0.6 : 1}
            cursor="pointer"
            onClick={prevSlide}
          >
            <IconArrowLeft />
          </Box>
          <Box
            opacity={section === maxSection - 1 ? 0.6 : 1}
            cursor="pointer"
            onClick={nextSlide}
          >
            <IconArrowRight />
          </Box>
        </>
      )}
    </BoxMotion>
  );
}
