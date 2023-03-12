import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import {
  itemBotToTop,
  marginBottom,
  marginRightContact,
  marginTop,
  sectionMarginLeft,
} from "../../utils/consts";
import { arrayChunk } from "../../utils/functions";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import HomePagination from "../landing/HomePagination";
import PopUpLayout from "../Layout/PopUpLayout";

export default function Section5({ careers }: { careers: any }) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [section, setSection] = useState(0);
  const [careersEnd, setCareersEnd] = useState<any>([]);
  const [selectedCareer, setSelectedCareer] = useState(-1);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    setCareersEnd(arrayChunk(careers, isLarge ? 4 : 5));
  }, [isLarge, careers]);

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      h="full"
      minH="100vh"
      pl={sectionMarginLeft}
      pr={marginRightContact}
      pt={isLarge ? 0 : marginTop}
      pb={marginBottom}
      position="relative"
      display="flex"
      alignItems={{ base: "unset", lg: "center" }}
    >
      <Box>
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
          fontSize="sm"
          mb={{base: 12, lg: 8}}
          as={motion.p}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="span" opacity={0.6}>
            We work best with like-minded partners who are creatively and
            culturally ambitious— open to pushing the limits and possibilities
            of design. Let’s make something great together.
          </Text>
        </Text>

        <BoxMotion
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          zIndex={10}
          color="light"
          display={{ base: "none", lg: "flex" }}
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

        {isLarge ? (
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
                      gap={7}
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
                                      setIsCardOpen(true);
                                      setSelectedCareer(
                                        i * (isLarge ? 3 : 2) + j
                                      );
                                    }}
                                  >
                                    {title}
                                  </Heading>
                                </Box>
                                <Box>
                                  <Button
                                    text="Read More"
                                    onClick={() => {
                                      setIsCardOpen(true);
                                      setSelectedCareer(
                                        i * (isLarge ? 3 : 2) + j
                                      );
                                    }}
                                  />
                                </Box>
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
        ) : (
          <Box display="flex" flexDirection="column" gap={4}>
            {careers.map(({ title, description, url, id }: any, i: number) => {
              return (
                <Box key={id} color="light">
                  <Heading
                    mb={4}
                    as="h4"
                    fontSize="lg"
                    fontWeight="thin"
                    opacity={0.6}
                    cursor="pointer"
                    _hover={{ opacity: 1 }}
                    onClick={() => {
                      setIsCardOpen(true);
                      setSelectedCareer(i);
                    }}
                  >
                    {title}
                  </Heading>

                  <Box w="full" h="1px" bg="light" opacity={0.2} />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      <PopUpLayout
        display={isCardOpen && selectedCareer > -1}
        setDisplay={(isCardOpen: boolean | ((prevState: boolean) => boolean)) =>
          setIsCardOpen(isCardOpen)
        }
      >
        <Box
          display="flex"
          flexDirection="column"
          w="full"
          h="full"
          overflowY="scroll"
        >
          <Heading
            mb={[2, 4, 6]}
            as="h3"
            color="dark"
            fontSize={{ base: "xl", lg: "3xl" }}
          >
            {careers[selectedCareer]?.title}
          </Heading>
          <Text
            color="dark"
            whiteSpace="pre-line"
            fontSize={{ base: "xs", lg: "sm" }}
          >
            {careers[selectedCareer]?.description}
          </Text>

          <Box mt={12}>
            <Button
              isLight={false}
              text="Apply Now"
              onClick={() => {
                window.open(careers[selectedCareer]?.url, "_blank");
              }}
            />
          </Box>
        </Box>
      </PopUpLayout>
    </Box>
  );
}
