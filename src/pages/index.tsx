import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Header from "../components/header";
import Page1 from "../components/landing/Page1";

export default function Home() {
  return (
    <Box>
      <Header />
      <Page1 />
      <Footer />
    </Box>
  );
}
