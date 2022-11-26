import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import ImagePoint from "../../assets/images/Point.webp";

export default function Section1() {
  return (
    <Box w="full" h="full" display="flex" alignItems="center" pl="7%" pr="16%">
      <Box display="flex" flexDirection="column">
        <Heading w="80%" mb={6}>
          HeArt-Work beats talent when talent doesn’t work with a heart
        </Heading>
        <Text w="70%" opacity={0.6} mb={14} fontSize="sm">
          With a track record of 14 years, Our deep understanding of and
          research into the forces of digital disruption, coupled with the new
          thinking required to unlock growth provides excellence, long-lasting
          results.
        </Text>
        <Box position="relative" w="90%" h="300px">
          <Image
            src={ImagePoint}
            fill
            alt="point"
            style={{
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
