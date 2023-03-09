import { Box } from "@chakra-ui/react";

export default function IconArrowRight({ size=20 }) {
  return (
    <Box width={`${size + 5}px`} height={`${size}px`}>
      <svg viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.439941 9.98975H23.8399"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M14.3599 19.0399L23.8399 9.98994L14.3599 0.939941"
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
