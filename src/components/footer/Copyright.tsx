import { Text } from "@chakra-ui/react";
import {
  animateBottomToTop,
  marginX,
  marginY,
  themeColor,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Copyright({ isLight = true }: { isLight?: boolean }) {
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
    >
      <BoxMotion
        animate={{
          color: themeColor[+isLight],
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
      >
        <Text fontSize="small" as="span" color="inherit">
          ©2022 Rubicube Group. All Right Reserved
        </Text>
      </BoxMotion>
    </BoxMotion>
  );
}
