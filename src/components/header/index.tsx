import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import LogoGroup from "../../assets/svg/rubicube_group.svg";
import { animateTopToBottom, marginX, marginY } from "../../utils/consts";
import { useDimensions } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
import MenuToggle from "./MenuToggle";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef<any>(null);
  const { height }: any = useDimensions(containerRef);

  return (
    <BoxMotion
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      h="fit-content"
      bg="transparent"
      position="fixed"
      top={0}
      px={marginX}
      pt={marginY}
      zIndex={1000}
      variants={animateTopToBottom}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box w={140} h={45} position="relative">
        <Image alt="Rubicube Group Logo" src={LogoGroup} fill />
      </Box>
      <BoxMotion
        position={`relative`}
        initial={false}
        animate={isNavOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <MenuToggle
          setIsNavOpen={() => {
            setIsNavOpen(!isNavOpen);
          }}
        />
      </BoxMotion>
    </BoxMotion>
  );
}
