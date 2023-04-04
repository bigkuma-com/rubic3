import { Box } from "@chakra-ui/react";

export default function IconPause({ size = 24 }) {
  return (
    <Box width={size + "px"} height={size + "px"}>
      <svg
        strokeWidth="1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="currentColor"
      >
        <path
          d="M6 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6zM14 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6z"
          stroke="currentColor"
          strokeWidth="1"
        ></path>
      </svg>
    </Box>
  );
}
