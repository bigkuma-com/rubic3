import { Box, Heading, Text, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import IconClose from "../../assets/js/IconClose";
import { getImage } from "../../utils/api";
import { animateOpacity, animateScaling } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function PopUpLayout({
  children,
  display = false,
  setDisplay,
  dataLeadership,
  isLeadership = false,
}: {
  children?: any;
  display: boolean;
  setDisplay: any;
  dataLeadership?: any;
  isLeadership?: boolean;
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
            w="80%"
            h="80%"
            bg="light"
            position="relative"
            p={[8, null, null, 20]}
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
                <Box position="relative" h="full" w="30%">
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
                  w="70%"
                  h="full"
                  overflowY="scroll"
                >
                  <Heading mb={[1]} as="h2" color="dark">
                    {dataLeadership.name}
                  </Heading>
                  <Heading fontSize="xl" mb={[2, 4, 6]} as="h3" color="dark">
                    {dataLeadership.title}
                  </Heading>
                  <Text fontSize="sm" color="dark" opacity={0.7}>
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
