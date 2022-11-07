import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import LogoFB from "../../assets/svg/icon-fb.svg";
import LogoIG from "../../assets/svg/icon-ig.svg";
import LogoYT from "../../assets/svg/icon-yt.svg";
import { marginX, marginY } from "../../utils/consts";

export default function Footer() {
  return (
    <Box
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
    >
      <Box>
        <Text textDecoration="underline">Copper – The Urban Grill</Text>
        <Text fontSize="small" color="whiteAlpha.700">
          Xerum fugia quodios molut alignia evellis dolore ducipicius int quas
          doluptia quam.
        </Text>
      </Box>
      <Box display="flex" gap={2}>
        {socials.map(({ image, url }, i) => {
          return (
            <Box key={i} position="relative" w="24px" h="24px">
              <Image alt="" src={image} fill />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const socials = [
  { image: LogoIG, url: "" },
  { image: LogoFB, url: "" },
  { image: LogoYT, url: "" },
];
