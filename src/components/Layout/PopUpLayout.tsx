import { Box, Heading, Text, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import IconClose from "../../assets/js/IconClose";
import { getImage } from "../../utils/api";
import {
  animateOpacity,
  animateScaling,
  showOnLarge,
} from "../../utils/consts";
import { isEmpty } from "../../utils/functions";
import BoxMotion from "../BoxMotion";

export default function PopUpLayout({
  children,
  display = false,
  setDisplay,
  dataLeadership,
  isLeadership = false,
  type,
}: {
  children?: any;
  display: boolean;
  setDisplay: any;
  dataLeadership?: any;
  isLeadership?: boolean;
  type: "creative" | "360" | "hospitality" | "team";
}) {
  const boxRef = useRef(null);
  useOutsideClick({ ref: boxRef, handler: () => setDisplay(false) });

  return (
    <AnimatePresence>
      {display && (
        <BoxMotion
          variants={animateOpacity}
          initial="initial"
          animate="animate"
          exit="exit"
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.900"
          zIndex={1500}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BoxMotion
            variants={animateScaling}
            initial="initial"
            animate="animate"
            exit="exit"
            w={{ base: "90%", lg: "80%" }}
            h={{ base: "90%", lg: "80%" }}
            bg="light"
            position="relative"
            px={[4, null, null, 20]}
            py={[10, null, null, 20]}
            ref={boxRef}
          >
            <Box
              position="absolute"
              top={6}
              right={6}
              cursor="pointer"
              onClick={() => {
                setDisplay(false);
              }}
            >
              <IconClose />
            </Box>

            {isLeadership && (
              <Box display="flex" h="full" gap={20}>
                <Box position="relative" h="full" w="30%" display={showOnLarge}>
                  <Image
                    src={getImage({
                      collectionName: dataLeadership.collectionName,
                      recordId: dataLeadership.id,
                      filename: dataLeadership.picture,
                    })}
                    alt={dataLeadership.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  w={{ base: "full", lg: "70%" }}
                  h="full"
                  overflowY="scroll"
                  mt={{ base: 2, lg: 0 }}
                >
                  <Heading
                    mb={[1]}
                    as="h2"
                    fontSize={{ base: "xl", lg: "3xl" }}
                    color="dark"
                  >
                    {dataLeadership.name}
                  </Heading>
                  <Heading
                    fontSize={{ base: "md", lg: "xl" }}
                    mb={[5, null, null, 6]}
                    as="h3"
                    color="dark"
                  >
                    {type === "creative"
                      ? isEmpty(dataLeadership.title_creative)
                        ? dataLeadership.title
                        : dataLeadership.title_creative
                      : type === "360"
                      ? isEmpty(dataLeadership.title_360)
                        ? dataLeadership.title
                        : dataLeadership.title_360
                      : type === "hospitality"
                      ? isEmpty(dataLeadership.title_hospitality)
                        ? dataLeadership.title
                        : dataLeadership.title_hospitality
                      : dataLeadership.title}
                  </Heading>
                  <Text
                    fontSize={{ base: "xs", lg: "sm" }}
                    color="dark"
                    opacity={0.7}
                  >
                    {dataLeadership.description}
                  </Text>
                </Box>
              </Box>
            )}

            {children}
          </BoxMotion>
        </BoxMotion>
      )}
    </AnimatePresence>
  );
}
