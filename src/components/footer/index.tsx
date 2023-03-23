import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BoxMotion from "../BoxMotion";
import AdhyaGroup from "./AdhyaGroup";
import SocialButtons from "./SocialButtons";

export default function Footer({
  isHomepage = false,
  isShowing = true,
  isLight = true,
  position,
  style,
  hasBackground = false,
  backgroundColor = "transparent",
}: {
  isHomepage?: boolean;
  isShowing?: boolean;
  isLight?: boolean;
  position?: any;
  style?: any;
  hasBackground?: boolean;
  backgroundColor?: string;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const positionY = window.scrollY;
    setScrollPosition(positionY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="relative"
      display={position == "relative" ? "flex" : "unset"}
      justifyContent={position == "relative" ? "space-between" : "unset"}
      style={style}
    >
      {hasBackground && (
        <BoxMotion
          layout
          position={"fixed"}
          bottom={0}
          left={0}
          w="full"
          h={20}
          bg={backgroundColor}
          zIndex={99}
        />
      )}
      <AdhyaGroup key="adhya-group" isLight={isLight} position={position} />
      <SocialButtons isLight={isLight} position={position} />
    </Box>
  );
}
