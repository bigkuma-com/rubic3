import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImage } from "../../utils/api";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Section4({
  partners,
  associates,
}: {
  partners: any;
  associates: any;
}) {
  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
      color="dark"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading
          mb={[2, 3, 4, 6]}
          color="inherit"
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Partners
        </Heading>
        <Text
          w="70%"
          opacity={0.6}
          fontSize="sm"
          mb={[2, 3, 4, 6]}
          color="inherit"
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Aperibus, volorib eaquas quamus. Pa volorpor aperund aeperum simus pro
          exerroratem earciis cimustrum sum qui consendi re, quatiur recullandus
          aut volupti onsecea.
        </Text>

        <BoxMotion
          h="0.5px"
          w="full"
          bg="dark"
          opacity={0.2}
          mb={[2, 3, 4, 6]}
          mt={3}
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        />
        <Text
          fontSize={12}
          fontWeight={500}
          mb={[2, 3, 4, 6]}
          color="inherit"
          as={motion.h5}
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Associated with
        </Text>
        <SimpleGrid columns={[4, null, null, 6]} spacing={[1, null, null, 6]}>
          {associates.map(
            ({ collectionName, id, logo, name, url }: any, i: any) => {
              return (
                <BoxMotion
                  variants={itemBotToTop(0.6 + i * 0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  key={id}
                  position="relative"
                  h={{ base: "70px", lg: "80px" }}
                  w="full"
                  cursor={url ? "pointer" : "unset"}
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
            }
          )}
        </SimpleGrid>

        <BoxMotion
          h="0.5px"
          w="full"
          bg="dark"
          opacity={0.2}
          mb={[2, 3, 4, 6]}
          mt={3}
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        />
        <Text
          fontSize={12}
          fontWeight={500}
          mb={[2, 3, 4, 6]}
          color="inherit"
          as={motion.h5}
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Partnered with
        </Text>
        <SimpleGrid columns={[4, null, null, 6]} spacing={[1, null, null, 6]}>
          {partners.map(
            ({ collectionName, id, logo, name, url }: any, i: any) => {
              return (
                <BoxMotion
                  variants={itemBotToTop(0.6 + i * 0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  key={id}
                  position="relative"
                  h={{ base: "70px", lg: "80px" }}
                  w="full"
                  cursor={url ? "pointer" : "unset"}
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
            }
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
