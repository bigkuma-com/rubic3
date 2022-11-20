import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function MenuToggle({
  setIsNavOpen,
  isNavOpen,
}: {
  setIsNavOpen: any;
  isNavOpen: boolean;
}) {
  return (
    <Box
      onClick={() => {
        setIsNavOpen();
      }}
      cursor="pointer"
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <Path
          variants={{
            closed: {
              d: "M 10 12 L 30 12",
              color: "white",
              transition: {
                color: {
                  duration: 0.2,
                  delay: 0.4,
                  ease: "easeInOut",
                },
              },
            },
            open: {
              d: "M 5 24 L 24 5",
              color: "black",
              transition: {
                color: {
                  duration: 0.2,
                  delay: 0.1,
                  ease: "easeInOut",
                },
              },
            },
          }}
        />
        <Path
          variants={{
            closed: {
              d: "M 0 20 L 30 20",
              color: "white",
              transition: {
                color: {
                  duration: 0.2,
                  delay: 0.4,
                  ease: "easeInOut",
                },
              },
            },
            open: {
              d: "M 5 5 L 24 24",
              color: "black",
              transition: {
                color: {
                  duration: 0.2,
                  delay: 0.1,
                  ease: "easeInOut",
                },
              },
            },
          }}
        />
      </svg>
    </Box>
  );
}

function Path(props: any) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="1.2"
      stroke="currentColor"
      {...props}
    />
  );
}
