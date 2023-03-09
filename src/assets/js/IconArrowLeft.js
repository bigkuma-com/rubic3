import { Box } from "@chakra-ui/react";

export default function IconArrowLeft({ size=20 }) {
  return (
    <Box width={`${size + 5}px`} height={`${size}px`}>
      <svg
        viewBox="0 0 25 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.8399 9.62988H0.439941"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M9.92993 0.569824L0.439941 9.62982L9.92993 18.6798"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
}
