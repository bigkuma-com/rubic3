import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { getImage } from "../../utils/api";
import { sectionMarginLeft, sectionMarginRight } from "../../utils/consts";

export default function Section2({ clients }: { clients: any }) {
  const [maxItem, setMaxItem] = useState(24);

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading mb={6} color="dark">
          Our Major Clients
        </Heading>

        <SimpleGrid columns={6} spacing={5}>
          {clients
            .filter(function ({}, i: any) {
              if (i > maxItem) {
                return false;
              }
              return true;
            })
            .map(({ collectionName, id, logo, name, order }: any) => {
              return (
                <Box key={id} position="relative" h="100" w="full">
                  <Image
                    src={getImage({
                      collectionName,
                      recordId: id,
                      filename: logo,
                    })}
                    alt={name}
                    fill
                    style={{
                      objectFit: "contain",
                      objectPosition: "center center",
                    }}
                  />
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
