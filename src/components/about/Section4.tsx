import { Box, Heading, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImage } from "../../utils/api";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";

export default function Section2({ clients }: { clients: any }) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [maxItem, setMaxItem] = useState(isLarge ? 24 : 20);

  useEffect(() => {
    setMaxItem(isLarge ? 24 : 20);
  }, [isLarge]);

  return (
    <Box
      w="70%"
      h="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      pt={{ base: 12, lg: 0 }}
    >
      <Box display="flex" flexDirection="column" w="full">
        <Box display="flex" justifyContent="space-between">
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

          <Button text="Client List" isLight={false}/>
        </Box>

        <SimpleGrid columns={[4, null, null, 6]} spacing={5}>
          {clients
            .filter(function ({}, i: any) {
              if (i >= maxItem) {
                return false;
              }
              return true;
            })
            .map(({ collectionName, id, logo, name, url }: any, i: any) => {
              return (
                <BoxMotion
                  key={id}
                  position="relative"
                  h={{ base: "70px", lg: "12vmin" }}
                  w="full"
                  variants={itemBotToTop(i * 0.1)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
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
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
