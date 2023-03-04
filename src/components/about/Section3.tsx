import {
  Box,
  Heading,
  Text,
  useMediaQuery,
  useOutsideClick,
} from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../../assets/js/IconArrowLeft";
import IconArrowRight from "../../assets/js/IconArrowRight";
import IconClose from "../../assets/js/IconClose";
import IconPlus from "../../assets/js/IconPlus";
import { getImage } from "../../utils/api";
import {
  animateOpacity,
  animateScaling,
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
} from "../../utils/consts";
import { arrayChunk } from "../../utils/functions";
import BoxMotion from "../BoxMotion";
import PopUpLayout from "../Layout/PopupLayout";

export default function Section3({ leaders }: { leaders: any }) {
  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [section, setSection] = useState(0);
  const [selectedCard, setSelectedCard] = useState(-1);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [leadersEnd, setLeadersEnd] = useState<any>([]);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  useEffect(() => {
    setLeadersEnd(arrayChunk(leaders, isLarge ? 4 : 2));
  }, [isLarge, leaders]);

  useEffect(() => {
    selectedCard > -1 && setSelectedLeader(leaders[selectedCard]);
  }, [leaders, selectedCard]);

  console.log("leaders: ", leadersEnd, selectedCard, selectedLeader);

  return (
    <Box
      position="relative"
      w="70%"
      h="100vh"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={sectionMarginRight}
      pt={{ base: 12, lg: 0 }}
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
          Our Leadership
        </Heading>
        <BoxMotion
          w="80%"
          mb={[4, 6, 8, 10]}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text opacity={0.6} fontSize="sm" whiteSpace="pre-line">
            {`We invest in our people’s future, create inclusive working environments, and build cultures based on the values of openness, optimism, and a commitment to extraordinary work.`}
          </Text>
        </BoxMotion>
        <BoxMotion
          w="full"
          h={[140, null, null, "45vmin"]}
          className="section-leaders"
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
            color="light"
            display="flex"
            gap={3}
            alignItems="center"
          >
            <BoxMotion
              ref={nextRefSlides}
              animate={{ opacity: section === leadersEnd.length - 1 ? 0 : 0.6 }}
              whileHover={{
                opacity: section === leadersEnd.length - 1 ? 0 : 1,
              }}
              cursor={section === leadersEnd.length - 1 ? "unset" : "pointer"}
              bg="dark"
              h="45px"
              w="45px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
            >
              <IconArrowRight />
            </BoxMotion>
          </Box>
          <Box
            position="absolute"
            left={0}
            top="50%"
            transform="translate(-50%,-50%)"
            zIndex={10}
            color="light"
            display="flex"
            gap={3}
          >
            <BoxMotion
              ref={prevRefSlides}
              cursor={section === 0 ? "unset" : "pointer"}
              animate={{ opacity: section === 0 ? 0 : 0.6 }}
              whileHover={{ opacity: section === 0 ? 0 : 1 }}
              bg="dark"
              h="45px"
              w="45px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
            >
              <IconArrowLeft />
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
            {leadersEnd.length > 0 &&
              leadersEnd.map((leadersChunck: any, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    <Box
                      display="flex"
                      w="full"
                      h="full"
                      onMouseLeave={() => {
                        setSelectedCard(-1);
                      }}
                    >
                      {leadersChunck.map(
                        (
                          { collectionName, id, name, picture, title }: any,
                          j: number
                        ) => {
                          return (
                            <Box key={id} w={!isLarge ? "50%" : "25%"}>
                              <Box
                                position="relative"
                                h="full"
                                cursor="pointer"
                                onMouseEnter={() => {
                                  console.log(i, j);
                                  setSelectedCard(i * (isLarge ? 4 : 2) + j);
                                }}
                                onClick={() => {
                                  setIsCardOpen(true);
                                }}
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
                                <LayoutGroup key={id}>
                                  <BoxMotion
                                    layout
                                    key={id}
                                    position="absolute"
                                    bottom={0}
                                    left={0}
                                    w="full"
                                    p={3}
                                    bg="linear-gradient(180deg, rgba(0,0,0,0) 5%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.9) 100%)"
                                  >
                                    <Text
                                      as={motion.h5}
                                      layout
                                      fontWeight={500}
                                    >
                                      {name}
                                    </Text>
                                    <Text
                                      as={motion.p}
                                      layout
                                      fontSize="small"
                                      opacity={0.5}
                                    >
                                      {title}
                                    </Text>
                                    <AnimatePresence>
                                      {selectedCard ===
                                        i * leadersChunck.length + j && (
                                        <BoxMotion layout key={`vml-${id}`}>
                                          <Text
                                            as={motion.span}
                                            layout
                                            fontSize="x-small"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            mt={{ base: 5, lg: 3 }}
                                            onClick={() => {}}
                                          >
                                            View more <IconPlus />
                                          </Text>
                                        </BoxMotion>
                                      )}
                                    </AnimatePresence>
                                  </BoxMotion>
                                </LayoutGroup>
                              </Box>
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </BoxMotion>
      </Box>

      <PopUpLayout
        isLeadership
        dataLeadership={selectedLeader}
        display={isCardOpen}
        setDisplay={(isCardOpen: boolean | ((prevState: boolean) => boolean)) =>
          setIsCardOpen(isCardOpen)
        }
      />
    </Box>
  );
}

