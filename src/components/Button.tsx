import { Box } from "@chakra-ui/react";
import ArrowDownSm from "../assets/js/ArrowDownSm";
import ArrowLeftSm from "../assets/js/ArrowLeftSm";
import ArrowRightSm from "../assets/js/ArrowRightSm";
import { themeColor } from "../utils/consts";

export default function Button({
  text,
  onClick,
  withIcon = true,
  arrowDown = false,
  arrowLeft = false,
  py,
  px,
  isActive = false,
  style,
  type = "button",
  disable = false,
  isLight = true,
}: {
  text: string;
  onClick?: any;
  withIcon?: boolean;
  arrowDown?: boolean;
  arrowLeft?: boolean;
  py?: any;
  px?: any;
  isActive?: boolean;
  style?: any;
  type?: any;
  disable?: boolean;
  isLight?: boolean;
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
      bg={isActive ? themeColor[+isLight] : "transparent"}
      borderColor={themeColor[+isLight]}
      _active={
        disable
          ? {}
          : {
              bg: themeColor[+isLight],
              transform: "scale(0.98)",
              borderColor: themeColor[+isLight],
            }
      }
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
        isActive ? themeColor[+!isLight] : themeColor[+isLight]
      }
      _hover={
        disable
          ? {}
          : {
              color: themeColor[+!isLight],
              backgroundColor: themeColor[+isLight],
              opacity: isActive ? 0.8 : 1,
            }
      }
      style={style}
      opacity={disable ? 0.5 : 1}
      cursor={disable ? "unset" : "pointer"}
    >
      {text}
      {withIcon &&
        (arrowDown ? (
          <ArrowDownSm />
        ) : arrowLeft ? (
          <ArrowLeftSm />
        ) : (
          <ArrowRightSm />
        ))}
    </Box>
  );
}
