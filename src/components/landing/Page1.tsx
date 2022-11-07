import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Autoplay, EffectFade, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import LandingImage1 from "../../assets/images/Homepage Background 1.webp";
import LandingImage2 from "../../assets/images/Monkey-Express_Portfolio-Website-scaled.webp";
import LandingImage3 from "../../assets/images/Pegadaian-Web-template-thumbnail-scaled.webp";
import BoxMotion from "../BoxMotion";

export default function Page1() {
  return (
    <Box bg="black">
      <BoxMotion
        h="100vh"
        position="relative"
        w="full"
        className="page1"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Swiper
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          loop={true}
          lazy={true}
          modules={[Autoplay, EffectFade, Lazy]}
        >
          {landingImages.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  src={image}
                  alt={`landing image ${i + 1}`}
                  fill
                  placeholder="blur"
                  style={{ objectFit: "cover", userSelect: "none" }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </BoxMotion>
    </Box>
  );
}

const landingImages = [LandingImage1, LandingImage2, LandingImage3];

const variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
