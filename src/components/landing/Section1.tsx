import { Box, Spinner, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Autoplay, EffectFade, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import IconPause from "../../assets/js/IconPause";
import IconPlay from "../../assets/js/IconPlay";
import { getImage } from "../../utils/api";
import {
  animateBottomToTop,
  animateOpacity,
  marginX,
  marginY,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Section1({ sliders }: { sliders: any }) {
  const { push } = useRouter();

  const [swiper, setSwiper] = useState<any>(null);
  const [section, setSection] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const slideTo = (index: any) => swiper.slideTo(index);

  const onIdle = () => {
    setShowControl(false);
  };

  const onActive = () => {
    setShowControl(true);
  };

  const {} = useIdleTimer({ onIdle, onActive, timeout: 1500 });

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
      {sliders?.length > 1 && (
        <Box
          as="ul"
          position="absolute"
          left="50%"
          bottom={marginY}
          transform="translateX(-50%)"
          zIndex={500}
          display="flex"
          gap={3}
          listStyleType="none"
        >
          {sliders.map(({}, i: any) => {
            return (
              <Box
                as="li"
                cursor="pointer"
                key={i}
                py={2}
                _hover={{
                  opacity: 1,
                }}
                opacity={i == section ? 1 : 0.3}
                transition="opacity 0.2s ease-in-out"
                onClick={() => {
                  slideTo(i + 1);
                }}
              >
                <Box h="2px" w="30px" bg="light" borderRadius="md" />
              </Box>
            );
          })}
        </Box>
      )}

      <Swiper
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        loop={false}
        lazy={true}
        modules={[Autoplay, EffectFade, Lazy]}
        onSlideChange={(swiper) => {
          setSection(swiper.realIndex);
          setPlaying(false);
        }}
        onSwiper={setSwiper}
      >
        {sliders.map(
          (
            {
              title,
              description,
              expand,
              collectionName,
              id,
              is_video,
              file,
              thumbnail,
              duration,
            }: any,
            i: any
          ) => {
            return (
              <SwiperSlide
                key={i}
                data-swiper-autoplay={duration <= 0 ? 5000 : duration}
              >
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
                  // h={{ base: "35vmax", md: "100vh" }}
                  position="relative"
                  bg="dark"
                  className={`slide-container`}
                >
                  {is_video ? (
                    <>
                      {showThumbnail && (
                        <Box
                          position="fixed"
                          h="full"
                          w="full"
                          top={0}
                          left={0}
                        >
                          <Image
                            fill
                            src={getImage({
                              collectionName: collectionName,
                              recordId: id,
                              filename: thumbnail,
                            })}
                            alt={title + " Thumbnail"}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      )}
                      <ReactPlayer
                        style={{ objectFit: "cover" }}
                        url={getImage({
                          collectionName: collectionName,
                          recordId: id,
                          filename: file,
                        })}
                        width="100%"
                        height="100%"
                        playing={playing && i == section}
                        onPlay={() => {
                          setShowLoading(false);
                        }}
                        onBuffer={() => {
                          setShowLoading(true);
                        }}
                        onStart={() => {
                          setShowLoading(false);
                          setShowThumbnail(false);
                        }}
                        onReady={() => {
                          setShowLoading(false);
                        }}
                        pip={false}
                        stopOnUnmount
                      />
                      <AnimatePresence>
                        {showControl && (
                          <BoxMotion
                            layout
                            position="unset"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                          >
                            <Box
                              position="fixed"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              color="light"
                              cursor={showLoading ? "progress" : "pointer"}
                              onClick={() => {
                                !showLoading && setPlaying(!playing);
                              }}
                              bg="dark"
                              p={2}
                              borderRadius="full"
                            >
                              {showLoading ? (
                                <Spinner size="xl" />
                              ) : playing ? (
                                <IconPause size={50} />
                              ) : (
                                <IconPlay size={50} />
                              )}
                            </Box>
                          </BoxMotion>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Image
                      src={getImage({
                        collectionName: collectionName,
                        recordId: id,
                        filename: file,
                      })}
                      alt={file}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                        backgroundColor: "var(--chakra-colors-dark)",
                      }}
                    />
                  )}
                </Box>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </BoxMotion>
  );
}
