import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import LogoFB from "../../assets/svg/icon-fb.svg";
import LogoIG from "../../assets/svg/icon-ig.svg";
import LogoYT from "../../assets/svg/icon-yt.svg";
import { animateBottomToTop, marginX, marginY } from "../../utils/consts";
import { toHTTPS } from "../../utils/functions.js";
import BoxMotion from "../BoxMotion";

export default function SocialButtons() {
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
      color="white"
    >
      <Box
        display="flex"
        gap={2}
        onMouseLeave={() => {
          setSocialHover(-1);
        }}
      >
        {socials.map(({ image, url }, i) => {
          return (
            <Box
              className="animate-fade"
              key={i}
              position="relative"
              w="24px"
              h="24px"
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
              <Image alt="" src={image} fill sizes="24px" />
            </Box>
          );
        })}
      </Box>
    </BoxMotion>
  );
}

const socials = [
  { image: LogoIG, url: "instagram.com" },
  { image: LogoFB, url: "fb.com" },
  { image: LogoYT, url: "youtube.com" },
];
