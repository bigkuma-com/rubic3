import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
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
import Divider from "../Divider";

export default function Section2({
  partnersAssociations,
}: {
  partnersAssociations: any;
}) {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [maxItem, setMaxItem] = useState(isLarge ? 25 : 20);

  useEffect(() => {
    setMaxItem(isLarge ? 25 : 20);
  }, [isLarge]);

  console.log(partnersAssociations);

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
          Partners & Associations
        </Heading>

        {[
          "Our Partners",
          "Property.Place & Hospitality",
          "Food & Beverage",
          "Retail & Lifestyle",
          "Products & Services",
          "Associations",
        ].map((title, i) => {
          if (!partnersAssociations[title]) return null;
          return (
            <Box key={i} display="flex" flexDirection="column">
              <Divider text={title.replace(/\./g, ", ")} color="dark" mb={6} />
              {title == "Products & Services" ? (
                <SimpleGrid columns={[2]} mt={2}>
                  {partnersAssociations[title].map(
                    ({
                      id,
                      link,
                      logo,
                      name,
                      collectionName,
                      is_text_only,
                    }: any) => {
                      return (
                        <BoxMotion
                          key={id}
                          variants={itemBotToTop(i * 0.1)}
                          initial="offscreen"
                          whileInView="onscreen"
                          cursor={link ? "pointer" : "unset"}
                        >
                          <Text
                            as={link ? "a" : "p"}
                            color="dark"
                            fontSize="sm"
                            opacity={0.8}
                            _hover={
                              link ? { opacity: 1, cursor: "pointer" } : {}
                            }
                            onClick={() => {
                              link && window.open(link, `_blank`);
                            }}
                          >
                            {name}
                          </Text>
                        </BoxMotion>
                      );
                    }
                  )}
                </SimpleGrid>
              ) : (
                <SimpleGrid columns={[4, null, null, 6]} spacing={6} mb={6}>
                  {partnersAssociations[title].map(
                    ({
                      id,
                      link,
                      logo,
                      name,
                      collectionName,
                      is_text_only,
                    }: any) => {
                      return (
                        <BoxMotion
                          key={id}
                          position="relative"
                          h={{ base: "70px", lg: "14vmin" }}
                          w="full"
                          variants={itemBotToTop(i * 0.1)}
                          initial="offscreen"
                          whileInView="onscreen"
                          cursor={link ? "pointer" : "unset"}
                          whileHover={{ scale: link ? 1.05 : 1 }}
                        >
                          {is_text_only ? (
                            <Text color="dark">{name}</Text>
                          ) : (
                            <Image
                              onClick={() => {
                                link && window.open(link, `_blank`);
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
                          )}
                        </BoxMotion>
                      );
                    }
                  )}
                </SimpleGrid>
              )}
            </Box>
          );
        })}
        <Divider text="" />

        {/* <SimpleGrid columns={[4, null, null, 6]} spacing={6}>
          {partnersAssociations
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
                  h={{ base: "70px", lg: "14vmin" }}
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
        </SimpleGrid> */}
      </Box>
    </Box>
  );
}
