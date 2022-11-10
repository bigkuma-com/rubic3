import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import { HomeContext } from "../utils/hooks";

export default function Home() {
  const [section, setSection] = useState(0);

  // useEffect(() => {
  //   document.body.style.scrollSnapType = "y mandatory";
  //   const root = document.getElementsByTagName("html")[0];
  //   root.style.scrollSnapType = "y mandatory";

  //   return () => {};
  // });

  return (
    <HomeContext.Provider value={{ section, setSection }}>
      <Header />
      <Box className="homepage">
        <Section1 />
        <Box bg="yellow.100" h="100vh" scrollSnapAlign="start"></Box>
        <Box bg="pink.100" h="100vh" scrollSnapAlign="start"></Box>
        <Box bg="purple.100" h="100vh" scrollSnapAlign="start"></Box>

        <Section2 />
      </Box>
      <Footer isHomepage />
    </HomeContext.Provider>
  );
}
