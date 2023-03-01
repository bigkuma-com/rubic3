import { Box } from "@chakra-ui/react";
import { marginXSection } from "../../utils/consts";
import Contacts from "../Contacts";
import Divider from "../Divider";

export default function Section4() {
  return (
    <Box bg="dark" px={marginXSection} pb="35vh">
      <Divider text="Contact" />

      <Box mr={{ base: 0, lg: "25%" }} w="full" zIndex={6}>
        <Contacts hasContactButton />
      </Box>
    </Box>
  );
}
