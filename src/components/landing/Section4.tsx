import { Box } from "@chakra-ui/react";
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
