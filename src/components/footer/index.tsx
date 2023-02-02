import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdhyaGroup from "./AdhyaGroup";
import SocialButtons from "./SocialButtons";

export default function Footer({
  isHomepage = false,
  isShowing = true,
  isLight = true,
  position,
}: {
  isHomepage?: boolean;
  isShowing?: boolean;
  isLight?: boolean;
  position?: any;
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
    >
      {/* <AnimatePresence>
        {(scrollPosition > 400 || !isHomepage || isShowing) && (
          <Copyright key="copyright" isLight={isLight} position={position} />
        )}
      </AnimatePresence> */}

      <AdhyaGroup key="adhya-group" isLight={isLight} position={position} />
      <SocialButtons isLight={isLight} position={position} />
    </Box>
  );
}
