import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import LogoFB from "../../assets/svg/icon-fb.svg";
import LogoIG from "../../assets/svg/icon-ig.svg";
import LogoYT from "../../assets/svg/icon-yt.svg";
import { marginX, marginY } from "../../utils/consts";
import { toHTTPS } from "../../utils/functions.js";
import BoxMotion from "../BoxMotion";

export default function Footer() {
  const [socialHover, setSocialHover] = useState(-1);
  return (
    <BoxMotion
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      pb={marginY}
      px={marginX}
      bottom={0}
      zIndex={1000}
      color="white"
      w="full"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box>
        {/* <Text textDecoration="underline">Copper – The Urban Grill</Text>
        <Text fontSize="small" color="whiteAlpha.700">
          Xerum fugia quodios molut alignia evellis dolore ducipicius int quas
          doluptia quam.
        </Text> */}
        {/* <Text fontSize="small">©2022 Rubicube Group. All Right Reserved</Text> */}
      </Box>
      <Box
        display="flex"
        gap={2}
        onMouseLeave={() => {
          setSocialHover(-1);
        }}
        p={2}
      >
        {socials.map(({ image, url }, i) => {
          return (
            <Box
              className="social-buttons"
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

const variants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
