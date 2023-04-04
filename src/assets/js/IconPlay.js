import { Box } from "@chakra-ui/react";

export default function IconPlay({size = 24 }) {
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
          d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </Box>
  );
}
