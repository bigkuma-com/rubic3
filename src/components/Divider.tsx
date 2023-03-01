import { Box, Heading } from "@chakra-ui/react";
import { itemBotToTop } from "../utils/consts";
import BoxMotion from "./BoxMotion";

export default function Divider({
  text,
  mb,
  lineOpacity = 1,
  color="light"
}: {
  text?: string;
  mb?: number;
  lineOpacity?: number;
  color?: string;
}) {
  return (
    <BoxMotion
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      mb={mb ?? 14}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false }}
      variants={itemBotToTop(0)}
    >
      {text && (
        <Heading as="h3" fontSize="lg" mr={5} color={color}>
          {text}
        </Heading>
      )}
      <Box h="1px" bg={color} flexGrow={1} opacity={lineOpacity} mb={1} />
    </BoxMotion>
  );
}
