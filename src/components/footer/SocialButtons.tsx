import { Box } from "@chakra-ui/react";
import { useState } from "react";
import IconFacebook from "../../assets/js/IconFacebook";
import IconInstagram from "../../assets/js/IconInstagram";
import IconYoutube from "../../assets/js/IconYoutube";
import {
  animateBottomToTop,
  marginX,
  marginY,
  themeColor,
} from "../../utils/consts";
import { toHTTPS } from "../../utils/functions.js";
import BoxMotion from "../BoxMotion";

export default function SocialButtons({
  isLight = true,
}: {
  isLight?: boolean;
}) {
  const [socialHover, setSocialHover] = useState(-1);

  return (
    <BoxMotion
      position="fixed"
      bottom={marginY}
      right={marginX}
      zIndex={500}
      variants={animateBottomToTop}
      initial="initial"
      animate="animate"
      exit="exit"
      p={2}
    >
      <Box
        display="flex"
        gap={2}
        onMouseLeave={() => {
          setSocialHover(-1);
        }}
      >
        {socials.map(({ icon, url }, i) => {
          return (
            <Box
              className="animate-fade"
              key={i}
              cursor="pointer"
              onClick={() => window.open(toHTTPS(url), "_blank")}
              _hover={{
                opacity: socialHover === i ? 1 : 0.6,
              }}
              opacity={socialHover === -1 ? 1 : 0.6}
              onMouseEnter={() => {
                setSocialHover(i);
              }}
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
                {icon}
              </BoxMotion>
            </Box>
          );
        })}
      </Box>
    </BoxMotion>
  );
}

const socials = [
  {
    icon: <IconInstagram />,
    url: "instagram.com",
  },
  {
    icon: <IconFacebook />,
    url: "fb.com",
  },
  { icon: <IconYoutube />, url: "youtube.com" },
];
