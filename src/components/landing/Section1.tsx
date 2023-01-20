import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Autoplay, EffectFade, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImage } from "../../utils/api";
import {
  animateBottomToTop,
  animateOpacity,
  marginX,
  marginY,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Section1({ sliders }: { sliders: any }) {
  const { push } = useRouter();

  return (
    <BoxMotion
      bg="dark"
      position="relative"
      w="full"
      h="full"
      className="page1"
      variants={animateOpacity}
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
        {sliders.map(
          (
            { image, title, description, expand, collectionName, id }: any,
            i: any
          ) => {
            return (
              <SwiperSlide key={i}>
                <BoxMotion
                  position="fixed"
                  bottom={marginY}
                  left={marginX}
                  zIndex={1000}
                  color="white"
                  variants={animateBottomToTop}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  display="none"
                >
                  <Text
                    fontSize={{ base: "xs", lg: "unset" }}
                    textDecoration="underline"
                    className="swiper-no-swiping text-shadow"
                    cursor={expand.work ? "pointer" : "unset"}
                    w="fit-content"
                    onClick={() => {
                      expand.work && push(`/works/${expand.work.slug}`);
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    display={{ base: "none", lg: "block" }}
                    fontSize="small"
                    color="whiteAlpha.700"
                    className="swiper-no-swiping text-shadow"
                  >
                    {description}
                  </Text>
                </BoxMotion>
                <Box
                  h={{ base: "35vmax", md: "100vh" }}
                  position="relative"
                  bg="dark"
                >
                  <Image
                    src={getImage({
                      collectionName: collectionName,
                      recordId: id,
                      filename: image,
                    })}
                    alt={image}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                      backgroundColor: "var(--chakra-colors-dark)",
                    }}
                  />
                </Box>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </BoxMotion>
  );
}
