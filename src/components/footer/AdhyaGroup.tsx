import Image from "next/image";
import IconAdhyaLight from "../../assets/svg/icon-member-of-adhya-light.svg";
import IconAdhya from "../../assets/svg/icon-member-of-adhya.svg";
import {
  animateBottomToTop,
  marginX,
  marginY,
  showOnLarge,
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
  return (
    <BoxMotion
      display={showOnLarge}
      position={position}
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
        {isLight ? (
          <Image
            src={IconAdhyaLight}
            height={35}
            width={160}
            alt="Adhya"
            style={{
              objectFit: "contain",
            }}
          />
        ) : (
          <Image
            src={IconAdhya}
            height={35}
            width={160}
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
