import { Box, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArrowLeft from "../assets/js/IconArrowLeft";
import IconArrowRight from "../assets/js/IconArrowRight";
import IconPlus from "../assets/js/IconPlus";
import { getImage } from "../utils/api";
import { itemBotToTop } from "../utils/consts";
import { arrayChunk } from "../utils/functions";
import BoxMotion from "./BoxMotion";
import PopUpLayout from "./Layout/PopUpLayout";

export default function TeamShowCase({ leaders }: { leaders: any }) {
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

  return (
    <>
      {isLarge ? (
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
            display={section == leadersEnd.length - 1 ? "none" : "flex"}
            gap={3}
            alignItems="center"
          >
            <BoxMotion
              ref={nextRefSlides}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              bg="dark"
              h="40px"
              w="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
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
            color="light"
            display={section == 0 ? "none" : "flex"}
            gap={3}
          >
            <BoxMotion
              ref={prevRefSlides}
              whileHover={{ scale: 1.1 }}
              cursor="pointer"
              bg="dark"
              h="40px"
              w="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              border="1px"
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
                          console.log(
                            selectedCard,
                            i,
                            j,
                            i * leadersChunck.length + j,
                            i * (isLarge ? 4 : 2) + j
                          );
                          return (
                            <Box
                              key={id}
                              w={!isLarge ? "50%" : "25%"}
                              overflow="hidden"
                            >
                              <Box
                                position="relative"
                                h="full"
                                cursor="pointer"
                                onMouseEnter={() => {
                                  console.log(
                                    "hoow",
                                    i,
                                    j,
                                    i * (isLarge ? 4 : 2) + j
                                  );
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

                                    <AnimatePresence>
                                      {selectedCard ===
                                        i * (isLarge ? 4 : 2) + j && (
                                        <>
                                          <Text
                                            as={motion.p}
                                            layout
                                            fontSize="small"
                                            opacity={0.5}
                                          >
                                            {title}
                                          </Text>
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
                                        </>
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
      ) : (
        <SimpleGrid columns={2} mt={4} position="relative">
          {leaders.map(
            ({ collectionName, id, name, picture, title }: any, i: number) => {
              return (
                <Box
                  key={id}
                  h="45vmax"
                  w="full"
                  position="relative"
                  onClick={() => {
                    if (selectedCard == i) {
                      setIsCardOpen(true);
                      setSelectedCard(-1);
                    } else {
                      setSelectedCard(i);
                    }
                  }}
                >
                  <BoxMotion
                    variants={itemBotToTop(0.6 + i * 0.1)}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true }}
                    position="relative"
                    h="full"
                    w="full"
                  >
                    <Box position="relative" h="full" w="full" cursor="pointer">
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
                          <Text as={motion.h5} layout fontWeight={500}>
                            {name}
                          </Text>

                          <AnimatePresence>
                            {selectedCard == i && (
                              <>
                                <Text
                                  as={motion.p}
                                  layout
                                  fontSize="small"
                                  opacity={0.5}
                                >
                                  {title}
                                </Text>
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
                              </>
                            )}
                          </AnimatePresence>
                        </BoxMotion>
                      </LayoutGroup>
                    </Box>
                  </BoxMotion>
                </Box>
              );
            }
          )}
        </SimpleGrid>
      )}

      <PopUpLayout
        isLeadership
        dataLeadership={selectedLeader}
        display={isCardOpen}
        setDisplay={(isCardOpen: boolean | ((prevState: boolean) => boolean)) =>
          setIsCardOpen(isCardOpen)
        }
      />
    </>
  );
}
