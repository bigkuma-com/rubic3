import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../assets/js/IconArrowLeft";
import IconArrowRight from "../assets/js/IconArrowRight";
import { getImage } from "../utils/api";
import { itemBotToTop } from "../utils/consts";
import { arrayChunk } from "../utils/functions";
import BoxMotion from "./BoxMotion";

export default function WorksShowCase({
  works,
  buttonColor = "light",
  buttonBgColor = "dark",
  buttonBorderColor = "dark",
}: {
  works: any;
  buttonColor?: string;
  buttonBgColor?: string;
  buttonBorderColor?: string;
}) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [section, setSection] = useState(0);
  const [worksEnd, setworksEnd] = useState<any>([]);

  useEffect(() => {
    setworksEnd(arrayChunk(works, isLarge ? 3 : 2));
  }, [isLarge, works]);

  console.log("works", worksEnd, works);

  return (
    <>
      {isLarge ? (
        <BoxMotion
          w="full"
          position="relative"
          variants={itemBotToTop(0.6)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <Box
            position="absolute"
            right={0}
            top="50%"
            transform="translate(50%,-50%)"
            zIndex={10}
            display={section == worksEnd.length - 1 ? "none" : "flex"}
            gap={3}
            alignItems="center"
          >
            <BoxMotion
              ref={nextRefSlides}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              h="40px"
              w="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
              bg={buttonBgColor}
              borderColor={buttonBorderColor}
              color={buttonColor}
            >
              <IconArrowRight size={15} />
            </BoxMotion>
          </Box>
          <Box
            position="absolute"
            left={0}
            top="50%"
            transform="translate(-50%,-50%)"
            zIndex={10}
            display={section == 0 ? "none" : "flex"}
            gap={3}
          >
            <BoxMotion
              ref={prevRefSlides}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              h="40px"
              w="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
              bg={buttonBgColor}
              borderColor={buttonBorderColor}
              color={buttonColor}
            >
              <IconArrowLeft size={15} />
            </BoxMotion>
          </Box>
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            onSlideChange={(swiper) => {
              setSection(swiper.realIndex);
            }}
            onInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRefSlides.current;
              swiper.params.navigation.nextEl = nextRefSlides.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {worksEnd.length > 0 &&
              worksEnd.map((worksChunck: any, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    <Box display="flex" w="full" h="full">
                      {worksChunck.map(
                        (
                          { collectionName, id, name, thumbnail, slug }: any,
                          j: number
                        ) => {
                          return (
                            <WorkCard
                              collectionName={collectionName}
                              key={id}
                              name={name}
                              id={id}
                              thumbnail={thumbnail}
                              slug={slug}
                            />
                          );
                        }
                      )}
                    </Box>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </BoxMotion>
      ) : (
        <BoxMotion
          w="full"
          position="relative"
          variants={itemBotToTop(0.6)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <SimpleGrid columns={1} position="relative" w="full" bg="yellow.200">
            {works.map(({ collectionName, id, name, thumbnail, slug }: any) => {
              console.log("name", name);
              return (
                <WorkCard
                  collectionName={collectionName}
                  key={id}
                  name={name}
                  id={id}
                  thumbnail={thumbnail}
                  slug={slug}
                />
              );
            })}
          </SimpleGrid>
        </BoxMotion>
      )}
    </>
  );
}

function WorkCard({
  collectionName,
  id,
  name,
  thumbnail,
  slug,
}: {
  collectionName: string;
  id: string;
  name: string;
  thumbnail: string;
  slug: string;
}) {
  const { push } = useRouter();
  const [hover, setHover] = useState(false);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box key={id} h="full" w={{ base: "full", lg: 1 / 3 }} overflow="hidden">
      <AspectRatio
        ratio={3 / 2}
        position="relative"
        w="full"
        h="full"
        cursor="pointer"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          push(`/works/${slug}`);
        }}
      >
        <Box position="relative" w="full" h="full">
          <Image
            src={getImage({
              collectionName,
              recordId: id,
              filename: thumbnail,
            })}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
          <AnimatePresence>
            {hover && (
              <Box position="absolute" left={0} top={0} h="full" w="full">
                <BoxMotion
                  h="full"
                  w="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={8}
                  initial={{
                    backgroundColor: "rgba(0,0,0,0.0)",
                  }}
                  animate={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    transition: {
                      ease: "easeInOut",
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    backgroundColor: "rgba(0,0,0,0.0)",

                    transition: {
                      ease: "easeInOut",
                      duration: 0.5,
                    },
                  }}
                >
                  <BoxMotion
                    initial={{
                      y: -20,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        ease: "easeInOut",
                        duration: 0.2,
                      },
                    }}
                    exit={{
                      y: 20,
                      opacity: 0,
                      transition: {
                        ease: "easeInOut",
                        duration: 0.2,
                      },
                    }}
                  >
                    <Heading
                      as="a"
                      fontSize="2xl"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      {name}
                    </Heading>
                  </BoxMotion>
                </BoxMotion>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </AspectRatio>
    </Box>
  );
}
