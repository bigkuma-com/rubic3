import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function MenuToggle({ setIsNavOpen }: { setIsNavOpen: any }) {
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
            closed: { d: "M 10 12 L 30 12" },
            open: { d: "M 5 24 L 24 5" },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 0 20 L 30 20" },
            open: { d: "M 5 5 L 24 24" },
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
      stroke="white"
      {...props}
    />
  );
}
