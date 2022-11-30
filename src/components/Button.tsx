import { Box } from "@chakra-ui/react";
import ArrowRightSm from "../assets/js/ArrowRightSm";

export default function Button({
  text,
  onClick,
  withIcon = true,
  py,
  px,
  isActive = false,
  style,
  type = "button",
}: {
  text: string;
  onClick?: any;
  withIcon?: boolean;
  py?: any;
  px?: any;
  isActive?: boolean;
  style?: any;
  type?: any;
}) {
  return (
    <Box
      m={0}
      onClick={onClick ?? null}
      as="button"
      type={type}
      height="24px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      bg={isActive ? "light" : "transparent"}
      borderColor="var(--chakra-colors-light)"
      _active={{
        bg: "var(--chakra-colors-light)",
        transform: "scale(0.98)",
        borderColor: "var(--chakra-colors-light)",
      }}
      _focus={{}}
      fontWeight={300}
      letterSpacing="wider"
      borderRadius={32}
      fontSize="sm"
      px={px ?? 5}
      py={py ?? 4}
      display="flex"
      alignItems="center"
      gap={3}
      color={
        isActive ? "var(--chakra-colors-dark)" : "var(--chakra-colors-light)"
      }
      _hover={{
        color: "var(--chakra-colors-dark)",
        backgroundColor: "var(--chakra-colors-light)",
        opacity: isActive ? 0.8 : 1,
      }}
      style={style}
    >
      {text}
      {withIcon && <ArrowRightSm />}
    </Box>
  );
}
