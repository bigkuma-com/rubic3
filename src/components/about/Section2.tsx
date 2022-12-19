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

export default function Section2({ clients }: { clients: any }) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [maxItem, setMaxItem] = useState(isLarge ? 24 : 15);

  useEffect(() => {
    setMaxItem(isLarge ? 24 : 15);
  }, [isLarge]);

  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
    >
      <Box display="flex" flexDirection="column" w="full">
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

        <SimpleGrid columns={[4, null, null, 6]} spacing={6}>
          {clients
            .filter(function ({}, i: any) {
              if (i > maxItem) {
                return false;
              }
              return true;
            })
            .map(({ collectionName, id, logo, name, url }: any, i: any) => {
              return (
                <BoxMotion
                  key={id}
                  position="relative"
                  h={{ base: "70px", lg: "95px" }}
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
