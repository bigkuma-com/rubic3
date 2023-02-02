import { Box, Heading, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import IconPlus from "../../assets/js/IconPlus";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import { arrayChunk } from "../../utils/functions";
import BoxMotion from "../BoxMotion";
import HomePagination from "../landing/HomePagination";

export default function Section5({
  careers,
  setSelectedCareer,
}: {
  careers: any;
  setSelectedCareer: any;
}) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [isLarge] = useMediaQuery("(min-width: 1500px)", {
    ssr: true,
    fallback: false,
  });

  const [section, setSection] = useState(0);
  const [careersEnd, setCareersEnd] = useState<any>([]);

  useEffect(() => {
    setCareersEnd(arrayChunk(careers, isLarge ? 3 : 2));
  }, [isLarge, careers]);

  return (
    <Box
      w="full"
      h="100vh"
      overflowY="scroll"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      py="10%"
      position="relative"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading
          w="70%"
          mb={[2, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          Careers
        </Heading>
        <Text
          w={{ base: "full", lg: "80%" }}
          fontSize="sm"
          mb={[4, 4, 6, 8]}
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="span" opacity={0.6}>
            We work best with like-minded partners who are creatively and
            culturally ambitious—open to pushing the limits and possibilities of
            design. Let’s make something great together. Send your resume and
            portfolio (not bigger than 5 MB) to{" "}
          </Text>
          <Link
            as="span"
            className="opacity-100"
            cursor="pointer"
            onClick={() => window.open("mailto:info@rubic3.com", "_blank")}
          >
            info@rubic3.com
          </Link>
        </Text>

        <BoxMotion
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          zIndex={10}
          color="light"
          display="flex"
          gap={3}
          justifyContent="flex-end"
          alignItems="center"
          mb={[4, 4, 6, 8]}
        >
          <HomePagination section={section} maxSection={careersEnd.length} />
          <Box
            ref={prevRefSlides}
            opacity={section === 0 ? 0.6 : 1}
            cursor="pointer"
          >
            <IconArrowLeft />
          </Box>
          <Box
            ref={nextRefSlides}
            opacity={section === careersEnd.length - 1 ? 0.6 : 1}
            cursor="pointer"
          >
            <IconArrowRight />
          </Box>
        </BoxMotion>
        <Box w="full" className="section-leaders" position="relative">
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
            {careersEnd?.map((careersChunck: any, i: number) => {
              return (
                <SwiperSlide key={i}>
                  <BoxMotion
                    variants={itemBotToTop(0.6 + i * 0.2)}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false }}
                    display="flex"
                    flexDirection="column"
                    w="full"
                    gap={5}
                  >
                    {careersChunck.map(
                      ({ title, description, url, id }: any, j: number) => {
                        return (
                          <Box key={id} color="light">
                            <Box
                              display="flex"
                              flexDirection={{ base: "column", lg: "row" }}
                              justifyContent="space-between"
                              alignItems={{
                                base: "flex-start",
                                lg: "flex-end",
                              }}
                              gap={[2, null, null, 0]}
                              mb={4}
                            >
                              <Box w={{ base: "full", lg: "80%" }}>
                                <Heading
                                  as="h4"
                                  fontSize="lg"
                                  fontWeight="thin"
                                  mb={2}
                                  opacity={0.6}
                                  cursor="pointer"
                                  _hover={{ opacity: 1 }}
                                  onClick={() => {
                                    setSelectedCareer(
                                      i * (isLarge ? 3 : 2) + j
                                    );
                                  }}
                                >
                                  {title}
                                </Heading>
                                <Text
                                  opacity={0.6}
                                  fontSize="small"
                                  noOfLines={[3, null, null, null, 4, 5]}
                                  overflow="hidden"
                                  whiteSpace="pre-line"
                                >
                                  {description}
                                </Text>
                              </Box>
                              <Text
                                wordBreak="keep-all"
                                flexWrap="nowrap"
                                fontSize="small"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                cursor="pointer"
                                onClick={() => {
                                  setSelectedCareer(i * (isLarge ? 3 : 2) + j);
                                }}
                              >
                                Read more <IconPlus />
                              </Text>
                            </Box>
                            <Box
                              w="full"
                              h="1px"
                              bg="light"
                              opacity={0.2}
                            ></Box>
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
