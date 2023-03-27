import { Box, useMediaQuery } from "@chakra-ui/react";
import { marginXSection } from "../../utils/consts";
import Contacts from "../Contacts";
import Divider from "../Divider";

export default function Section4() {
  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box bg="dark" px={marginXSection} pb={20}>
      <Divider text="Contact" />

      <Box mr={{ base: 0, lg: "25%" }} w="full" zIndex={6}>
        <Contacts hasContactButton={isLarge} />
      </Box>
    </Box>
  );
}
