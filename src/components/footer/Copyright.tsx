import { Text } from "@chakra-ui/react";
import {
  animateBottomToTop,
  marginXHeader,
  marginYHeader,
  showOnLarge,
  themeColor,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Copyright({
  isLight = true,
  position = "fixed",
}: {
  isLight?: boolean;
  position?: any;
}) {
  return (
    <BoxMotion
      display={showOnLarge}
      position={position}
      bottom={marginYHeader}
      left={marginXHeader}
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
        <Text fontSize="xs" as="span" color="inherit" className="text-shadow">
          ©2022 Rubicube Group. All Right Reserved
        </Text>
      </BoxMotion>
    </BoxMotion>
  );
}
