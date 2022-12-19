import { Box } from "@chakra-ui/react";
import { marginXSection } from "../../utils/consts";
import Contacts from "../Contacts";
import RunningText from "./Runningtext";

export default function Section4() {
  return (
    <Box
      h={{ base: "full", lg: "100vh" }}
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px={marginXSection}
      pt={{ base: "15%", lg: 0 }}
      pb={{ base: "25%", lg: 0 }}
      position="relative"
    >
      <Box mr={{ base: 0, lg: "25%" }} w="full" zIndex={6}>
        <Contacts hasContactButton />
      </Box>

      <RunningText
        text="Address"
      />
    </Box>
  );
}
