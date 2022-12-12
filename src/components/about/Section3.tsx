import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import { getImage } from "../../utils/api";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import { arrayChunk } from "../../utils/functions";
import BoxMotion from "../BoxMotion";
import HomePagination from "../landing/HomePagination";

export default function Section3({ leaders }: { leaders: any }) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [section, setSection] = useState(0);
  const [leadersEnd, setLeadersEnd] = useState<any>([]);

  useEffect(() => {
    setLeadersEnd(arrayChunk(leaders, isLarge ? 4 : 2));
  }, [isLarge, leaders]);

  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading
          w="70%"
          mb={[2, 3, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Nextgen Leaders
        </Heading>
        <Text
          w="70%"
          opacity={0.6}
          fontSize="sm"
          mb={[8, 10, 12, 14]}
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          We invest in our people’s future, create inclusive working
          environments, and build cultures based on the values of openness,
          optimism, and a commitment to extraordinary work.
        </Text>
        <Box w="full" className="section-leaders" position="relative">
          <BoxMotion
            position="absolute"
            right={0}
            top={0}
            transform="translateY(-50%)"
            zIndex={10}
            color="light"
            display="flex"
            gap={3}
            alignItems="center"
            variants={itemBotToTop(0.4)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false }}
          >
            <HomePagination section={section} maxSection={leadersEnd.length} />
            <Box
              ref={prevRefSlides}
              opacity={section === 0 ? 0.6 : 1}
              cursor="pointer"
            >
              <IconArrowLeft />
            </Box>
            <Box
              ref={nextRefSlides}
              opacity={section === leadersEnd.length - 1 ? 0.6 : 1}
              cursor="pointer"
            >
              <IconArrowRight />
            </Box>
          </BoxMotion>

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
            {leadersEnd.length > 0 &&
              leadersEnd.map((leadersChunck: any, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    <BoxMotion
                      display="flex"
                      w="full"
                      variants={itemBotToTop(0.6)}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: false }}
                    >
                      {leadersChunck.map(
                        (
                          { collectionName, id, name, picture, title }: any,
                          j: number
                        ) => {
                          return (
                            <Box
                              w={!isLarge ? "50%" : "25%"}
                              key={id}
                              mt={j % 2 === 0 ? 0 : "50px"}
                              display="flex"
                              flexDirection="column"
                            >
                              <Box
                                position="relative"
                                w="full"
                                h={[140, null, null, 280]}
                                mb={2}
                              >
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
                    </BoxMotion>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
