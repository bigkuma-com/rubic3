import { Box, Heading } from "@chakra-ui/react";
import { itemBotToTop } from "../utils/consts";
import BoxMotion from "./BoxMotion";

export default function Divider({
  text,
  mb,
  lineOpacity = 1,
  color = "light",
}: {
  text?: string;
  mb?: any;
  lineOpacity?: number;
  color?: string;
}) {
  return (
    <BoxMotion
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={mb ?? { base: 5, lg: 14 }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false }}
      variants={itemBotToTop(0)}
    >
      {text && (
        <Heading
          as="h3"
          fontSize={{ base: "md", lg: "lg" }}
          mr={5}
          mb={2}
          color={color}
        >
          {text}
        </Heading>
      )}
      <Box h="1px" bg={color} flexGrow={1} opacity={lineOpacity} mb={1} />
    </BoxMotion>
  );
}
