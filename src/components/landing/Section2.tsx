import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { HomeContext } from "../../utils/hooks";

export default function Section2() {
  const { section } = useContext(HomeContext);

  return <Box h="100vh" bg="black" scrollSnapAlign="start"></Box>;
}
