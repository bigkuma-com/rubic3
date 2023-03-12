import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImage } from "../../utils/api";
import {
  itemBotToTop,
  marginBottom,
  marginRightContact,
  marginTop,
  sectionMarginLeft,
  showOnLarge,
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

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      pl={sectionMarginLeft}
      pr={marginRightContact}
      pt={marginTop}
      pb={marginBottom}
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading
          display={showOnLarge}
          mb={6}
          color="dark"
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
        >
          Partners & Associations
        </Heading>

        <Box>
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
                <Divider
                  text={title.replace(/\./g, ", ")}
                  color="dark"
                  mb={6}
                />
                {title == "Products & Services" ? (
                  <SimpleGrid columns={[2]} mt={2} mb={8} columnGap={4}>
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
                              fontSize={{ base: "xs", lg: "sm" }}
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
                  <SimpleGrid columns={[3, null, null, 6]} spacing={6} mb={6}>
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
                              <AspectRatio position="relative" ratio={1}>
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
                              </AspectRatio>
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
        </Box>
      </Box>
    </Box>
  );
}
