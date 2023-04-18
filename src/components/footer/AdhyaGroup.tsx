import { Box, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import IconAdhya from "../../assets/images/Logo Part of Adhya Group3.png";
import IconAdhyaLight from "../../assets/images/Logo Part of Adhya Group4.png";
import {
  animateBottomToTop,
  marginXHeader,
  marginYHeader,
  themeColor,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function AdhyaGroup({
  isLight = true,
  position = "fixed",
}: {
  isLight?: boolean;
  position?: any;
}) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <BoxMotion
      position={position}
      bottom={marginYHeader}
      left={marginXHeader}
      zIndex={500}
      variants={animateBottomToTop}
      initial="initial"
      animate="animate"
      exit="exit"
      p={2}
      ml={-2}
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
        <Box
          onClick={() => {
            window.open(`https://adhya.id/`, `_blank`);
          }}
          cursor="pointer"
        >
          {isLight ? (
            <Image
              src={IconAdhyaLight}
              height={isLarge ? 40 : 20}
              width={isLarge ? 150 : 100}
              alt="Adhya"
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <Image
              src={IconAdhya}
              height={isLarge ? 40 : 20}
              width={isLarge ? 150 : 100}
              alt="Adhya"
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </BoxMotion>
    </BoxMotion>
  );
}
