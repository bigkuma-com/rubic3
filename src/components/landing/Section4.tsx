import { Box } from "@chakra-ui/react";
import Contacts from "../Contacts";
import RunningText from "./Runningtext";

export default function Section4() {
  return (
    <Box
      h="100vh"
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px="8%"
      position="relative"
    >
      <Box mr="25%" w="full" zIndex={6}>
        <Contacts hasContactButton />
      </Box>

      <RunningText
        text={
          <span>
            Add<span style={{ color: "white" }}>r</span>ess
          </span>
        }
      />
    </Box>
  );
}
