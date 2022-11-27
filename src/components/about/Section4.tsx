import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { getImage } from "../../utils/api";
import { sectionMarginLeft, sectionMarginRight } from "../../utils/consts";

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
      h="full"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
      color="dark"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading mb={6} color="inherit">
          Partners
        </Heading>
        <Text w="70%" opacity={0.6} fontSize="sm" mb={6} color="inherit">
          Aperibus, volorib eaquas quamus. Pa volorpor aperund aeperum simus pro
          exerroratem earciis cimustrum sum qui consendi re, quatiur recullandus
          aut volupti onsecea.
        </Text>

        <Box h="0.5px" w="full" bg="dark" opacity={0.2} mb={6} mt={3} />
        <Text as="h5" fontSize={12} fontWeight={500} mb={6} color="inherit">
          Associated with
        </Text>
        <SimpleGrid columns={6} spacing={5}>
          {associates.map(({ collectionName, id, logo, name, order }: any) => {
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

        <Box h="0.5px" w="full" bg="dark" opacity={0.2} mb={6} mt={3} />
        <Text as="h5" fontSize={12} fontWeight={500} mb={6} color="inherit">
          Partnered with
        </Text>
        <SimpleGrid columns={6} spacing={5}>
          {partners.map(({ collectionName, id, logo, name, order }: any) => {
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
