import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Copyright from "./Copyright";
import SocialButtons from "./SocialButtons";

export default function Footer({
  isHomepage = false,
  isShowing = true,
}: {
  isHomepage?: boolean;
  isShowing?: boolean;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("scroll pos : ", scrollPosition);

  return (
    <>
      <AnimatePresence>
        {(scrollPosition > 400 || !isHomepage || isShowing) && (
          <Copyright key="copyright" />
        )}
      </AnimatePresence>
      <SocialButtons />
    </>
  );
}
