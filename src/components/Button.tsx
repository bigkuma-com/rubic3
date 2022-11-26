import { Box } from "@chakra-ui/react";
import ArrowRightSm from "../assets/js/ArrowRightSm";

export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: any;
}) {
  return (
    <Box
      onClick={onClick ?? null}
      as="button"
      height="24px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      bg="transparent"
      borderColor="#ffffff"
      _active={{
        bg: "#fffff",
        transform: "scale(0.98)",
        borderColor: "#ffffff",
      }}
      _focus={{}}
      fontWeight={300}
      letterSpacing="wider"
      borderRadius={32}
      fontSize="sm"
      px={5}
      py={4}
      display="flex"
      alignItems="center"
      gap={3}
      color="#ffffff"
      _hover={{
        color: "dark",
        backgroundColor: "#ffffff",
      }}
    >
      {text}
      <ArrowRightSm />
    </Box>
  );
}
