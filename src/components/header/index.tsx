import { Box, Heading, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import IconArrowRightDark from "../../assets/js/IconArrowRightDark";
import IconAdhya from "../../assets/svg/icon-member-of-adhya.svg";
import LogoGroup from "../../assets/svg/rubicube_group.svg";
import {
  animateDiagonalTopRight,
  animateOpacityHalf,
  animateRightLeftHalf,
  animateTopToBottom,
  marginX,
  marginY,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import MenuToggle from "./MenuToggle";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef<any>(null);
  const [navHover, setNavHover] = useState(-1);

  useEffect(() => {
    !isNavOpen && setNavHover(-1);
  }, [isNavOpen]);

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
      variants={animateTopToBottom}
      initial="initial"
      animate="animate"
      exit="exit"
      zIndex={1000}
    >
      <Box w={140} h={45} position="relative">
        <Image alt="Rubicube Group Logo" src={LogoGroup} fill />
      </Box>
      <BoxMotion
        zIndex={1005}
        position={`relative`}
        initial={false}
        animate={isNavOpen ? "open" : "closed"}
        ref={containerRef}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <AnimatePresence>
          {isNavOpen && (
            <Text
              as={motion.span}
              fontSize="small"
              color="dark"
              variants={animateOpacityHalf}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Close
            </Text>
          )}
        </AnimatePresence>
        <MenuToggle
          isNavOpen={isNavOpen}
          setIsNavOpen={() => {
            setIsNavOpen(!isNavOpen);
          }}
        />
      </BoxMotion>
      <AnimatePresence>
        {isNavOpen && (
          <BoxMotion
            zIndex={1001}
            position="fixed"
            top={0}
            left={0}
            w="full"
            display="flex"
            h="100vh"
            bg="blackAlpha.900"
            variants={animateOpacityHalf}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNavOpen && (
          <BoxMotion
            zIndex={1001}
            position="fixed"
            top={0}
            right={0}
            w="50%"
            display="flex"
            alignItems="center"
            pl={32}
            h="80vh"
            bg="light"
            variants={animateDiagonalTopRight}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box
              as="ul"
              listStyleType="none"
              color="dark"
              display="flex"
              flexDirection="column"
              gap={5}
              mt={-12}
              onMouseLeave={() => {
                setNavHover(-1);
              }}
            >
              {navbarContents.map(({ name }, i) => {
                return (
                  <Heading
                    as="li"
                    key={i}
                    fontWeight={500}
                    fontSize="3xl"
                    className="animate-fade"
                    cursor="pointer"
                    _hover={{
                      opacity: navHover === i ? 1 : 0.6,
                    }}
                    opacity={navHover === -1 ? 1 : 0.6}
                    onMouseEnter={() => {
                      setNavHover(i);
                    }}
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      left="-30%"
                      top="50%"
                      transform="translateY(-50%)"
                    >
                      <AnimatePresence>
                        {navHover === i && (
                          <BoxMotion
                            variants={animateRightLeftHalf}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <IconArrowRightDark />
                          </BoxMotion>
                        )}
                      </AnimatePresence>
                    </Box>
                    {name}
                  </Heading>
                );
              })}
            </Box>
            <Image
              src={IconAdhya}
              height={35}
              width={160}
              alt="Adhya"
              style={{
                position: "absolute",
                bottom: "5rem",
                left: "8rem",
                objectFit: "contain",
              }}
            />
          </BoxMotion>
        )}
      </AnimatePresence>
    </BoxMotion>
  );
}

const navbarContents = [
  { name: "About" },
  { name: "Works" },
  { name: "Services" },
  { name: "Contact" },
];
