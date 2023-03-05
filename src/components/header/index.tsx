import {
  Box,
  Heading,
  Text,
  useMediaQuery,
  useOutsideClick,
} from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import IconArrowRightDark from "../../assets/js/IconArrowRightDark";
import LogoRubicGroup from "../../assets/js/LogoRubicGroup";
import IconAdhya from "../../assets/svg/icon-member-of-adhya.svg";
import {
  animateDiagonalTopRight,
  animateOpacityHalf,
  animateRightLeft100,
  animateRightLeftHalf,
  animateTopToBottom,
  marginX,
  marginY,
  showOnLarge,
  themeColor,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import MenuToggle from "./MenuToggle";

export default function Header({
  isLight = true,
  isTransparent = true,
  contactMarginRight = 0,
}: {
  isLight?: boolean;
  isTransparent?: boolean;
  contactMarginRight?: number;
}) {
  const { push } = useRouter();

  const navRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navHover, setNavHover] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    !isNavOpen && setNavHover(-1);
  }, [isNavOpen]);

  useEffect(() => {
    !isModalOpen && setIsNavOpen(false);
  }, [isModalOpen]);

  useOutsideClick({
    ref: navRef,
    handler: () => setIsModalOpen(false),
  });

  return (
    <BoxMotion
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      h="fit-content"
      position="fixed"
      top={0}
      px={marginX}
      pt={marginY}
      pb={isTransparent ? 0 : 8}
      variants={animateTopToBottom}
      initial="initial"
      animate="animate"
      exit="exit"
      zIndex={isNavOpen ? 1002 : 1000}
      bg={isTransparent ? "transparent" : "dark"}
    >
      <Box position="relative" cursor="pointer" onClick={() => push("/")}>
        <BoxMotion
          animate={{
            color: themeColor[isLight ? 1 : 0],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className="drop-shadow"
        >
          <LogoRubicGroup />
        </BoxMotion>
      </Box>

      <LayoutGroup>
        <Box display="flex" alignItems="center" gap={10}>
          <BoxMotion
            display={showOnLarge}
            position={contactMarginRight > 0 ? "absolute" : "relative"}
            layout
            right={contactMarginRight}
          >
            <Button
              isLight={isLight}
              text="Contact Us"
              withIcon={false}
              onClick={() => {
                push("/contact");
              }}
            />
          </BoxMotion>

          <Box
            cursor="pointer"
            onClick={() => {
              setIsModalOpen(true);
              setIsNavOpen(!isNavOpen);
            }}
          >
            <BoxMotion
              zIndex={1005}
              position={`relative`}
              initial={false}
              animate={isNavOpen ? "open" : "closed"}
              ref={containerRef}
              display="flex"
              alignItems="center"
              gap={1}
              className={isNavOpen ? "" : "drop-shadow"}
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
              <MenuToggle isLight={isLight} isNavOpen={isNavOpen} />
            </BoxMotion>
          </Box>
        </Box>
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
              ref={navRef}
              zIndex={1001}
              position="fixed"
              top={0}
              right={0}
              w={{ base: "full", lg: "50%" }}
              display="flex"
              alignItems="center"
              justifyContent={{ base: "center", lg: "flex-start" }}
              pl={{ base: 0, lg: 32 }}
              h={{ base: "100vh", lg: "80vh" }}
              bg="light"
              variants={
                !isLarge ? animateRightLeft100 : animateDiagonalTopRight
              }
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
                alignItems={{ base: "center", lg: "flex-start" }}
                gap={5}
                mt={-12}
                onMouseLeave={() => {
                  setNavHover(-1);
                }}
              >
                {navbarContents.map(({ name, path }, i) => {
                  return (
                    <Heading
                      as="li"
                      key={i}
                      fontWeight={500}
                      fontSize="3xl"
                      className="animate-fade"
                      color="dark"
                      cursor="pointer"
                      _hover={{
                        opacity: navHover === i ? 1 : 0.6,
                      }}
                      opacity={navHover === -1 ? 1 : 0.6}
                      onMouseEnter={() => {
                        setNavHover(i);
                      }}
                      onClick={() => push(path)}
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
              <Box
                position="absolute"
                bottom={"5rem"}
                left={{ base: "50%", lg: "8rem" }}
                transform={{ base: "translateX(-50%)", lg: "unset" }}
              >
                <Image
                  src={IconAdhya}
                  height={35}
                  width={160}
                  alt="Adhya"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
            </BoxMotion>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </BoxMotion>
  );
}

const navbarContents = [
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];
