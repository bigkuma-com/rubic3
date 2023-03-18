import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import IconAccordionMinus from "../../assets/js/IconAccordionMinus";
import IconAccordionPlus from "../../assets/js/IconAccordionPlus";
import { getImage } from "../../utils/api";
import {
  itemBotToTop,
  marginBottom,
  marginRightContact,
  marginTop,
  sectionMarginLeft,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import Divider from "../Divider";

export default function Section2({
  clients,
  clientTypes,
}: {
  clients: any;
  clientTypes: any;
}) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [maxItem, setMaxItem] = useState(isLarge ? 24 : 20);
  const [section, setSection] = useState(0);

  useEffect(() => {
    setMaxItem(isLarge ? 24 : 21);
  }, [isLarge]);

  if (!isLarge) {
    return (
      <Box
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
        pl={sectionMarginLeft}
        pr={marginRightContact}
        pt={marginTop}
        pb={marginBottom}
        gap={8}
      >
        <Divider text="Our Major Clients" color="dark" mb={0} />
        <SimpleGrid columns={[3, null, null, 6]} spacing={6}>
          {clientTypes
            .find(({ type }: any) => type == "featured")
            .data.slice(0, maxItem)
            .map(({ collectionName, id, logo, name, url }: any, i: any) => {
              return (
                <BoxMotion
                  key={id}
                  position="relative"
                  w="full"
                  variants={itemBotToTop(i * 0.5)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  cursor={url ? "pointer" : "unset"}
                  whileHover={{ scale: url ? 1.1 : 1 }}
                >
                  <AspectRatio ratio={1} position="relative">
                    <Image
                      onClick={() => {
                        url && window.open(url, `_blank`);
                      }}
                      src={getImage({
                        collectionName,
                        recordId: id,
                        filename: logo,
                      })}
                      alt={name}
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "left center",
                      }}
                    />
                  </AspectRatio>
                </BoxMotion>
              );
            })}
        </SimpleGrid>

        <Divider text="Our Major Clients" color="dark" mb={0} />
        <BoxMotion
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          overflowY="scroll"
        >
          <Accordion allowToggle allowMultiple>
            {clientTypes
              .filter(({ type }: any) => type != "featured")
              .map(({ data, type }: any, i: any) => {
                return (
                  <AccordionItem
                    key={type}
                    borderTop="0"
                    borderBottom="1px solid var(--chakra-colors-dark)"
                  >
                    {({ isExpanded }) => (
                      <>
                        <Box>
                          <AccordionButton px={0} py={4}>
                            <Text
                              fontSize="lg"
                              fontWeight={400}
                              textTransform="capitalize"
                              as="h3"
                              color="dark"
                              flex="1"
                              textAlign="left"
                            >
                              {type}
                            </Text>
                            {isExpanded ? (
                              <Box color="dark">
                                <IconAccordionMinus />
                              </Box>
                            ) : (
                              <Box color="dark">
                                <IconAccordionPlus />
                              </Box>
                            )}
                          </AccordionButton>
                        </Box>
                        <AccordionPanel p={0} mb={6}>
                          <SimpleGrid columns={[2]}>
                            {data.map(
                              (
                                {
                                  collectionName,
                                  id,
                                  logo,
                                  name,
                                  url,
                                  type,
                                }: any,
                                i: any
                              ) => {
                                return (
                                  <BoxMotion
                                    key={id}
                                    position="relative"
                                    w="full"
                                    variants={itemBotToTop(i * 0.05)}
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ once: true }}
                                    cursor={url ? "pointer" : "unset"}
                                  >
                                    <Text
                                      opacity={0.7}
                                      color="dark"
                                      _hover={{
                                        opacity: url ? 1 : 0.7,
                                      }}
                                      as={url ? "a" : "span"}
                                      fontSize={{ base: "xs", lg: "md" }}
                                    >
                                      {name}
                                    </Text>
                                  </BoxMotion>
                                );
                              }
                            )}
                          </SimpleGrid>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                );
              })}
          </Accordion>
        </BoxMotion>
      </Box>
    );
  }

  return (
    <>
      {section === 0 && (
        <Box
          w={{ base: "full", lg: "70%" }}
          h="full"
          minH="100vh"
          pl={sectionMarginLeft}
          pr={marginRightContact}
          pt={marginTop}
          pb={marginBottom}
        >
          <Box display="flex" flexDirection="column" w="full">
            <Box
              display={{ base: "none", lg: "flex" }}
              justifyContent="space-between"
            >
              <Heading
                mb={6}
                color="dark"
                as={motion.h2}
                variants={itemBotToTop(0)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
              >
                Our Major Clients
              </Heading>

              <BoxMotion
                variants={itemBotToTop(0)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
              >
                <Button
                  text="Client List"
                  isLight={false}
                  onClick={() => {
                    setSection(1);
                  }}
                />
              </BoxMotion>
            </Box>

            <SimpleGrid columns={[4, null, null, 6]} spacing={5}>
              {clientTypes
                .find(({ type }: any) => type == "featured")
                .data.slice(0, maxItem)
                .map(({ collectionName, id, logo, name, url }: any, i: any) => {
                  return (
                    <BoxMotion
                      key={id}
                      position="relative"
                      h={{ base: "70px", lg: "14vmin" }}
                      w="full"
                      variants={itemBotToTop(i * 0.01)}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: false }}
                      cursor={url ? "pointer" : "unset"}
                      whileHover={{ scale: url ? 1.1 : 1 }}
                    >
                      <Image
                        onClick={() => {
                          url && window.open(url, `_blank`);
                        }}
                        src={getImage({
                          collectionName,
                          recordId: id,
                          filename: logo,
                        })}
                        alt={name}
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "left center",
                        }}
                      />
                    </BoxMotion>
                  );
                })}
            </SimpleGrid>
          </Box>
        </Box>
      )}

      {section === 1 && (
        <Box
          display={{ base: "none", lg: "flex" }}
          w="70%"
          h="100vh"
          alignItems="center"
          pl={sectionMarginLeft}
          pr={marginRightContact}
          pt={{ base: 12, lg: 0 }}
        >
          <Box display="flex" flexDirection="column" w="full" h="100vh">
            <Box display="flex" justifyContent="space-between" mt="15%">
              <Heading
                mb={6}
                color="dark"
                as={motion.h2}
                variants={itemBotToTop(0)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
              >
                Our Client List
              </Heading>

              <BoxMotion
                variants={itemBotToTop(0)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
              >
                <Button
                  text="Client List"
                  isLight={false}
                  onClick={() => {
                    setSection(0);
                  }}
                  arrowLeft
                  iconOnLeft
                />
              </BoxMotion>
            </Box>

            <BoxMotion
              variants={itemBotToTop(0.2)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false }}
              overflowY="scroll"
              pb="20vh"
            >
              <Accordion allowToggle allowMultiple>
                {clientTypes
                  .filter(({ type }: any) => type != "featured")
                  .map(({ data, type }: any, i: any) => {
                    return (
                      <AccordionItem
                        key={type}
                        borderTop="0"
                        borderBottom="1px solid var(--chakra-colors-dark)"
                      >
                        {({ isExpanded }) => (
                          <>
                            <Box>
                              <AccordionButton px={0} py={4} _hover={{fontWeight:500}} fontWeight={400} className="animate-font-weight">
                                <Text
                                  fontSize="xl"
                                  fontWeight={"inherit"}
                                  textTransform="capitalize"
                                  as="h3"
                                  color="dark"
                                  flex="1"
                                  textAlign="left"
                                  // _hover={{fontWeight:600}}
                                >
                                  {type}
                                </Text>
                                {isExpanded ? (
                                  <Box color="dark">
                                    <IconAccordionMinus />
                                  </Box>
                                ) : (
                                  <Box color="dark">
                                    <IconAccordionPlus />
                                  </Box>
                                )}
                              </AccordionButton>
                            </Box>
                            <AccordionPanel p={0} mb={6}>
                              <SimpleGrid
                                columns={[1, null, null, 2]}
                                rowGap={1}
                              >
                                {data.map(
                                  (
                                    {
                                      collectionName,
                                      id,
                                      logo,
                                      name,
                                      url,
                                      type,
                                    }: any,
                                    i: any
                                  ) => {
                                    return (
                                      <BoxMotion
                                        key={id}
                                        position="relative"
                                        w="full"
                                        variants={itemBotToTop(i * 0.05)}
                                        initial="offscreen"
                                        whileInView="onscreen"
                                        viewport={{ once: true }}
                                        cursor={url ? "pointer" : "unset"}
                                      >
                                        <Text
                                          opacity={0.7}
                                          color="dark"
                                          _hover={{
                                            opacity: url ? 1 : 0.7,
                                          }}
                                          as={url ? "a" : "span"}
                                        >
                                          {name}
                                        </Text>
                                      </BoxMotion>
                                    );
                                  }
                                )}
                              </SimpleGrid>
                            </AccordionPanel>
                          </>
                        )}
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </BoxMotion>
          </Box>
        </Box>
      )}
    </>
  );
}
