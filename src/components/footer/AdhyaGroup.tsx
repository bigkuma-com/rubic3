import { useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import IconAdhyaLight from "../../assets/svg/icon-member-of-adhya-light.svg";
import IconAdhya from "../../assets/svg/icon-member-of-adhya.svg";
import {
  animateBottomToTop,
  marginX,
  marginY,
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
      bottom={marginY}
      left={marginX}
      zIndex={500}
      variants={animateBottomToTop}
      initial="initial"
      animate="animate"
      exit="exit"
      p={2}
      ml={-2}
      mb={-2}
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
        {isLight ? (
          <Image
            src={IconAdhyaLight}
            height={isLarge ? 35 : 25}
            width={isLarge ? 160 : 120}
            alt="Adhya"
            style={{
              objectFit: "contain",
            }}
          />
        ) : (
          <Image
            src={IconAdhya}
            height={isLarge ? 35 : 25}
            width={isLarge ? 160 : 120}
            alt="Adhya"
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </BoxMotion>
    </BoxMotion>
  );
}
