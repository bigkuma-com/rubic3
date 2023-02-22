import { Box, Heading } from "@chakra-ui/react";
import { marginXSection } from "../../utils/consts";
import Contacts from "../Contacts";

export default function Section4() {
  return (
    <Box bg="dark" px={marginXSection} pb="35vh">
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        mb={14}
      >
        <Heading as="h3" fontSize="lg" mr={5}>
          Contact
        </Heading>
        <Box h="1px" bg="light" flexGrow={1} opacity={0.5} mb={1} />
      </Box>

      <Box mr={{ base: 0, lg: "25%" }} w="full" zIndex={6}>
        <Contacts hasContactButton />
      </Box>
    </Box>
  );
}
