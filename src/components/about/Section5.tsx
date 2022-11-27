import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import IconPlus from "../../assets/js/IconPlus";
import { sectionMarginLeft, sectionMarginRight } from "../../utils/consts";
import HomePagination from "../landing/HomePagination";

export default function Section5({ careers }: { careers: any }) {
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
          Careers
        </Heading>
        <Text w="70%" fontSize="sm" mb={8}>
          <Text as="span" opacity={0.6}>
            We work best with like-minded partners who are creatively and
            culturally ambitious— open to pushing the limits and possibilities
            of design. Let’s make something great together. Send your resume and
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

        <Box
          zIndex={10}
          color="light"
          display="flex"
          gap={3}
          justifyContent="flex-end"
          alignItems="center"
          mb={8}
        >
          <HomePagination section={section} maxSection={careers.length} />
          <Box
            ref={prevRefSlides}
            opacity={section === 0 ? 0.6 : 1}
            cursor="pointer"
          >
            <IconArrowLeft />
          </Box>
          <Box
            ref={nextRefSlides}
            opacity={section === careers.length - 1 ? 0.6 : 1}
            cursor="pointer"
          >
            <IconArrowRight />
          </Box>
        </Box>
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
            {careers.map((careersChunck: any, i: number) => {
              return (
                <SwiperSlide key={i}>
                  <Box display="flex" flexDirection="column" w="full" gap={5}>
                    {careersChunck.map(
                      ({ title, description, url, id }: any, j: number) => {
                        return (
                          <Box key={id} color="light">
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-end"
                              mb={4}
                            >
                              <Box>
                                <Heading
                                  as="h4"
                                  fontSize="lg"
                                  fontWeight="thin"
                                  mb={2}
                                  opacity={0.6}
                                  cursor="pointer"
                                  _hover={{ opacity: 1 }}
                                  onClick={() => window.open(url, "_blank")}
                                >
                                  {title}
                                </Heading>
                                <Text opacity={0.6} fontSize="small">
                                  {description}
                                </Text>
                              </Box>
                              <Text
                                fontSize="small"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                cursor="pointer"
                                onClick={() => window.open(url, "_blank")}
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
