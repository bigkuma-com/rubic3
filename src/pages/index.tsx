import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/footer";
import Header from "../components/header";
import HomePagination from "../components/landing/HomePagination";
import Section1 from "../components/landing/Section1";
import Section2 from "../components/landing/Section2";
import Section3 from "../components/landing/Section3";
import Section4 from "../components/landing/Section4";
import { marginX } from "../utils/consts";
import { HomeContext } from "../utils/hooks";

export default function Home() {
  const [section, setSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const homepageRef = useRef<any>(null);

  return (
    <HomeContext.Provider value={{ section, setSection }}>
      <Header />

      <Box w="full" h="100vh">
        <Swiper
          direction={"vertical"}
          mousewheel={true}
          modules={[Mousewheel]}
          simulateTouch={false}
          onSlideChange={(swiper) => {
            setSection(swiper.realIndex);
          }}
        >
          <SwiperSlide>
            <Section1 />
          </SwiperSlide>
          <SwiperSlide>
            <Section2 />
          </SwiperSlide>
          <SwiperSlide>
            <Section3 />
          </SwiperSlide>
          <SwiperSlide>
            <Section4 />
          </SwiperSlide>
        </Swiper>
      </Box>

      <Box
        position="fixed"
        zIndex={50}
        right={marginX}
        top="50%"
        transform="translateY(-50%)"
      >
        <HomePagination section={section} maxSection={4} />
      </Box>

      <Footer isHomepage isShowing={section > 0} />
    </HomeContext.Provider>
  );
}
