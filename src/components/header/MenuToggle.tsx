import { motion } from "framer-motion";
import { themeColor } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function MenuToggle({
  isNavOpen,
  isLight = true,
}: {
  isLight?: boolean;
  isNavOpen: boolean;
}) {
  return (
    <BoxMotion
      animate={{
        color: themeColor[isNavOpen ? 0 : +isLight],
        transition: {
          duration: 0.2,
          delay: isNavOpen ? 0.1 : 0.3,
          ease: "easeInOut",
        },
      }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <Path
          variants={{
            closed: {
              d: "M 10 12 L 30 12",
            },
            open: {
              d: "M 5 24 L 24 5",
            },
          }}
        />
        <Path
          variants={{
            closed: {
              d: "M 0 20 L 30 20",
            },
            open: {
              d: "M 5 5 L 24 24",
            },
          }}
        />
      </svg>
    </BoxMotion>
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
