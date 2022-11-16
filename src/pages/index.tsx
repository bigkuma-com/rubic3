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
import { HomeContext } from "../utils/hooks";

export default function Home() {
  const [section, setSection] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const homepageRef = useRef<any>(null);

  // useEffect(() => {
  //   if (homepageRef?.current) {
  //     const element = homepageRef.current;
  //     createScrollSnap(element, {
  //       snapDestinationY: "100vh",
  //       snapStop: true,
  //       threshold: 0.3,
  //       timeout: 600,
  //       duration: 100,
  //       easing: function easeInOutCubic(x: number): number {
  //         return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  //       },
  //     });
  //   }
  // });

  console.log(section);

  return (
    <HomeContext.Provider value={{ section, setSection }}>
      <Header />
      {/* <Box
        h="100vh"
        position="absolute"
        top={0}
        left={0}
        overflow="auto"
        w="full"
        ref={homepageRef}
        onScroll={(e) => {
          setScrollPosition(e.currentTarget.scrollTop);
          setSection(
            Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight)
          );
        }}
      >
        <Section3 />
        <Section2 />
        <Section1 />
        <Box h="100vh" bg="purple.900"></Box>
        <Box h="100vh" bg="pink.900"></Box>
      </Box> */}

      {/* <Section1 />
      <Section2 />
      <Section3 /> */}

      <Box w="full" h="100vh">
        <Swiper
          direction={"vertical"}
          mousewheel={true}
          modules={[Mousewheel]}
          className="mySwiper"
          simulateTouch={false}
          onSlideChange={(swiper) => {
            setSection(swiper.realIndex);
          }}
          // initialSlide={0}
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

      <HomePagination section={section} />

      <Footer isHomepage isShowing={scrollPosition > 400} />
    </HomeContext.Provider>
  );
}
