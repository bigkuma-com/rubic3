import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import { getImage } from "../../utils/api";
import { sectionMarginLeft, sectionMarginRight } from "../../utils/consts";
import HomePagination from "../landing/HomePagination";

export default function Section3({ leaders }: { leaders: any }) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [section, setSection] = useState(0);

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading w="70%" mb={6}>
          Nextgen Leaders
        </Heading>
        <Text w="70%" opacity={0.6} fontSize="sm" mb={14}>
          We invest in our people’s future, create inclusive working
          environments, and build cultures based on the values of openness,
          optimism, and a commitment to extraordinary work.
        </Text>
        <Box w="full" className="section-leaders" position="relative">
          <Box
            position="absolute"
            right={0}
            top={0}
            transform="translateY(-50%)"
            zIndex={10}
            color="light"
            display="flex"
            gap={3}
            alignItems="center"
          >
            <HomePagination section={section} maxSection={leaders.length} />
            <Box
              ref={prevRefSlides}
              opacity={section === 0 ? 0.6 : 1}
              cursor="pointer"
            >
              <IconArrowLeft />
            </Box>
            <Box
              ref={nextRefSlides}
              opacity={section === leaders.length - 1 ? 0.6 : 1}
              cursor="pointer"
            >
              <IconArrowRight />
            </Box>
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
            {leaders.map((leadersChunck: any, i: number) => {
              return (
                <SwiperSlide key={i}>
                  <Box display="flex" w="full">
                    {leadersChunck.map(
                      (
                        { collectionName, id, name, picture, title }: any,
                        j: number
                      ) => {
                        return (
                          <Box
                            w="25%"
                            key={id}
                            mt={j % 2 === 0 ? 0 : "50px"}
                            display="flex"
                            flexDirection="column"
                          >
                            <Box position="relative" w="full" h={280} mb={2}>
                              <Image
                                src={getImage({
                                  collectionName,
                                  recordId: id,
                                  filename: picture,
                                })}
                                alt={name}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Text pl={3} fontWeight={500}>
                              {name}
                            </Text>
                            <Text pl={3} fontSize="small" opacity={0.5}>
                              {title}
                            </Text>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
