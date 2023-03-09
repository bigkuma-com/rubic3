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
  marginXHeader,
  marginYHeader,
  showOnLarge,
  themeColor,
} from "../../utils/consts";
import { useScrollPosition } from "../../utils/hooks";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import MenuToggle from "./MenuToggle";

export default function Header({
  isLight = true,
  isTransparent = true,
  contactMarginRight = 0,
  bg,
  showContact = true,
  logo,
}: {
  isLight?: boolean;
  isTransparent?: boolean;
  contactMarginRight?: any;
  bg?: string;
  showContact?: boolean;
  logo?: any;
}) {
  const { push } = useRouter();

  const scrollPosition = useScrollPosition();

  const navRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navHover, setNavHover] = useState(-1);
  const [showBg, setShowBg] = useState(false);

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

  useEffect(() => {
    scrollPosition > 20 ? setShowBg(true) : setShowBg(false);
  }, [scrollPosition]);

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
      py={marginYHeader}
      px={marginXHeader}
      variants={animateTopToBottom}
      initial="initial"
      animate="animate"
      exit="exit"
      zIndex={isNavOpen ? 1002 : 1000}
      bg={
        showBg
          ? (bg ? bg : !isLight ? "light" : "dark") ?? "transparent"
          : "transparent"
      }
      // bg={!showBg || isTransparent ? "transparent" : bg ?? "dark"}
      className="animate-bg"
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
        >
          {logo ? (
            <Box
              w={{ base: "130px", lg: "200px" }}
              h={{ base: "60px", lg: "80px" }}
              position="relative"
            >
              <Image
                alt={logo}
                src={logo}
                fill
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </Box>
          ) : (
            <LogoRubicGroup
              width={isLarge ? 138 : 110}
              height={isLarge ? 46 : 35}
            />
          )}
        </BoxMotion>
      </Box>

      {showContact && (
        <Box
          display={showOnLarge}
          position={"absolute"}
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
        </Box>
      )}

      <LayoutGroup>
        <Box display="flex" alignItems="center" gap={10}>
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
              w="full"
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
              animate={"animate"}
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
              justifyContent={{ base: "flex-start", lg: "flex-start" }}
              pl={{ base: 10, lg: 32 }}
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
                alignItems="flex-start"
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
                      fontSize={{ base: "3xl", lg: "3xl" }}
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
                      display={{ base: "flex", lg: "unset" }}
                      alignItems={{ base: "center", lg: "unset" }}
                      gap={{ base: 2, lg: 0 }}
                    >
                      <Box
                        position={{ base: "relative", lg: "absolute" }}
                        left={{ base: "unset", lg: -8 }}
                        top={{ base: "unset", lg: "50%" }}
                        transform={{ base: "unset", lg: "translateY(-50%)" }}
                      >
                        <AnimatePresence>
                          {navHover === i && (
                            <BoxMotion
                              layout
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
                left={{ base: 12, lg: "8rem" }}
              >
                <Image
                  src={IconAdhya}
                  height={25}
                  width={120}
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
  { name: "Our Company", path: "/our-company" },
  { name: "Contact", path: "/contact" },
];
