import { Box } from "@chakra-ui/react";
import Image from "next/image";
import WaIcon from "../assets/images/WA_icon-01.webp";
import {
  animateBottomToTop,
  marginXHeader,
  marginYHeader2,
} from "../utils/consts";
import BoxMotion from "./BoxMotion";

export default function WhatsappButton() {
  return (
    <Box position="relative" zIndex={999}>
      <BoxMotion
        position="fixed"
        bottom={marginYHeader2}
        right={marginXHeader}
        variants={animateBottomToTop}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Box
          position="relative"
          width="60px"
          height="60px"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          onClick={() => {
            window.open("https://wa.me/6281292926551", "_blank");
          }}
        >
          <Image
            src={WaIcon.src}
            alt="wa-icon"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </BoxMotion>
    </Box>
  );
}
