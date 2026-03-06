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
          width="50px"
          height="50px"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          onClick={() => {
            window.open(
              "https://wa.me/6281198895819?text=Hi%20Rubicube%20Group%2C%20I%20have%20already%20visited%20your%20website.%20Can%20I%20get%20more%20information%20about%20the%20services%20provided%20by%20Rubicube%20Group%3F",
              "_blank"
            );
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
