import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import ArrowRightSm from "../../assets/js/ArrowRightSm";
import IconChevronDown from "../../assets/js/IconChevronDown";
import IconChevronUp from "../../assets/js/IconChevronUp";
import BoxMotion from "../../components/BoxMotion";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getImage, useFetchAll } from "../../utils/api";
import {
  animateBottomToTop,
  animateTopToBottom,
  itemBotToTop,
  marginRightContact,
  marginY,
  showOnLarge,
} from "../../utils/consts";
import { makeBold } from "../../utils/functions";
import { ICoordinate } from "../../utils/types";

const blockSpacing = {
  height: 12,
  width: 15,
  gapX: 3,
  gapY: 1,
  margin: 6.5,
  marginTop: 12,
  marginEven: 17,
};

const seo = {
  url: "https://www.rubic3.com/works",
  title: "Our Works - Rubicube Group",
  description: "Excellent work done for great clients",
};

export default function Works() {
  const { query, replace, push, isReady } = useRouter();
  const wrapperRef = useRef<any>(null);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const [pan, setPan] = useState<null | ICoordinate>(null); //set pan to null to make it center
  const [isCenter, setIsCenter] = useState(true);
  const [windowSize, setWindowSize] = useState<null | ICoordinate>(null);
  const [containerSize, setContainerSize] = useState<null | ICoordinate>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<null | boolean>(null);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const [navIdx, setNavIdx] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  const [numOfBlocks, setNumOfBlocks] = useState(12);

  const { data, isError, isLoading } = useFetchAll(`works`, {
    sort: `order`,
    filter: `filters ~ '${selectedFilter}'`,
  });
  const { data: filters, isLoading: isLoadingFilters } = useFetchAll(
    `filters`,
    {
      sort: "order",
    }
  );

  useEffect(() => {
    if (isReady && !query.show && isLarge) {
      replace("/works?show=featured");
    }
  }, [query, isLarge, isReady]);

  useEffect(() => {
    if (!isReady) return;

    if (query.show !== "all" && isLarge) return;

    if (query.filter == undefined || query.filter === "all") {
      setSelectedFilter("");
    } else if (query.filter && filters) {
      filters.map(({ name, id }) => {
        if (
          name.includes(query.filter) ||
          name.toLowerCase() == query.filter?.toString().toLowerCase()
        ) {
          setSelectedFilter(id);
          return;
        }
      });
    }
  }, [query, filters, isReady]);

  useEffect(() => {
    if (query.show !== "featured") return;
    if (wrapperRef === null) return;

    setContainerSize({
      x: wrapperRef?.current?.offsetWidth,
      y: wrapperRef?.current?.offsetHeight,
    });
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, [wrapperRef, query]);

  useEffect(() => {
    if (query.show === "all") return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    setTimeout(() => {
      setIsCenter(false);
      setDataLoading(false);
    }, 2500);
  }, [query]);

  useEffect(() => {
    if (query.show !== "all" && isLarge) {
      setSelectedFilter("");
      setNumOfBlocks(12);
    } else {
      if (data) {
        setDataLoading(false);
      }
    }
  }, [query, data]);

  const onIdle = () => {
    if (query.show == "all" || !isLarge) return;

    if (
      windowSize !== null &&
      containerSize !== null &&
      isTouchDevice !== null
    ) {
      isTouchDevice
        ? window.scrollTo({
            top: containerSize.y / 2 - windowSize.y / 2,
            left: containerSize.x / 2 - windowSize.x / 2,
            behavior: "smooth",
          })
        : setIsCenter(true);
    }
  };

  const onActive = (event: any) => {
    setIsCenter(false);
  };

  const {} = useIdleTimer({ onIdle, onActive, timeout: 2000 });

  function toCenterNoTouch(a: number, b: number) {
    return (a / 2 - b / 2) * -1;
  }

  const {
    gapX: gx,
    gapY: gy,
    height: h,
    margin: m,
    marginEven: me,
    marginTop: mt,
    width: w,
  } = blockSpacing;

  if (query.show === "all" || !isLarge)
    return (
      <>
        <NextSeo
          title={seo.title}
          description={seo.description}
          canonical={seo.url}
          additionalMetaTags={[
            {
              name: "dc:creator",
              content: "arridhow",
            },
          ]}
          openGraph={{
            url: seo.url,
            title: seo.title,
            description: seo.description,
            images: [
              {
                url: "/logo.png",
                alt: "Logo Image",
                type: "image/jpeg",
              },
              { url: "/logo.png" },
            ],
            site_name: "Rubic3",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
          additionalLinkTags={[
            {
              rel: "icon",
              href: "/fav.svg",
            },
            {
              rel: "apple-touch-icon",
              href: "/fav.svg",
              sizes: "76x76",
            },
          ]}
        />
        <Box
          bg="dark"
          w="full"
          h="full"
          minH="100vh"
          py={{ base: 24, lg: "20vh" }}
          position="relative"
        >
          <Header contactMarginRight={marginRightContact} />

          <Box
            display={showOnLarge}
            position={"fixed"}
            top={marginY}
            left="50%"
            transform="translateX(-50%)"
            zIndex={1001}
            color="light"
            p={4}
            mt={-4}
            cursor="pointer"
            onClick={() => {
              push(`/works?show=featured`);
            }}
          >
            <BoxMotion
              variants={animateTopToBottom}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <IconChevronUp />
            </BoxMotion>
          </Box>

          <Box
            position={{ base: "absolute", lg: "fixed" }}
            zIndex={{ base: 500, lg: 1001 }}
            top={{ base: 24, lg: 6 }}
            transform="translateY(20%)"
            right={{ base: 4, lg: 64 }}
          >
            <AnimatePresence>
              <BoxMotion
                variants={animateTopToBottom}
                initial="initial"
                animate="animate"
                exit="exit"
                position="relative"
              >
                <BoxMotion>
                  <Button
                    text={query?.filter ?? "all"}
                    textTransform="capitalize"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                    }}
                  />
                </BoxMotion>

                <Box
                  position={{ base: "absolute", lg: "absolute" }}
                  zIndex={1001}
                  top={0}
                  transform="translateY(20%)"
                  left={{ base: -4, lg: 0 }}
                >
                  <AnimatePresence>
                    {isFilterOpen && (
                      <BoxMotion
                        mt={6}
                        ml={5}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        variants={containerFilter}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        <Box
                          key="all"
                          _hover={{ opacity: 0.6 }}
                          cursor="pointer"
                          onClick={() => {
                            replace({
                              query: { ...query, filter: "all" },
                            });
                            setSelectedFilter("");
                            setIsFilterOpen(false);
                            setDataLoading(true);
                            setTimeout(() => {
                              setDataLoading(false);
                            }, 100);
                          }}
                        >
                          <Text
                            as={motion.span}
                            variants={itemFilter}
                            fontSize="sm"
                          >
                            All
                          </Text>
                        </Box>
                        {filters?.map(({ name, id }) => {
                          return (
                            <Box
                              key={id}
                              _hover={{ opacity: 0.6 }}
                              cursor="pointer"
                              onClick={() => {
                                setSelectedFilter(id);
                                replace({
                                  query: {
                                    ...query,
                                    filter: name.toLowerCase(),
                                  },
                                });
                                setIsFilterOpen(false);
                                setDataLoading(true);
                                setTimeout(() => {
                                  setDataLoading(false);
                                }, 100);
                              }}
                            >
                              <Text
                                as={motion.span}
                                variants={itemFilter}
                                fontSize="sm"
                              >
                                {name}
                              </Text>
                            </Box>
                          );
                        })}
                      </BoxMotion>
                    )}
                  </AnimatePresence>
                </Box>
              </BoxMotion>
            </AnimatePresence>
          </Box>

          <AnimatePresence>
            {isFilterOpen && (
              <BoxMotion
                w="100vw"
                h="100vh"
                position="fixed"
                top={0}
                left={0}
                zIndex={400}
                bg="black"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.7,
                  transition: { ease: "easeInOut", duration: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  transition: { ease: "easeInOut", duration: 0.5 },
                }}
              />
            )}
          </AnimatePresence>

          <Heading
            as={motion.h1}
            variants={itemBotToTop(0.2)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            mb={{ base: 12, lg: 20 }}
            ml={[5, 6, 10, 0]}
            textAlign={{ base: "left", lg: "center" }}
          >
            Our Works
          </Heading>

          {isLoading || dataLoading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              h="20vh"
              mb={20}
            >
              <Spinner color="light" size="xl" />
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, lg: 3 }} mb={20}>
              {data?.slice(0, numOfBlocks).map((item, i) => {
                return <ImageWrapperAll data={item} idx={i % 12} key={i} />;
              })}
            </SimpleGrid>
          )}

          {data && numOfBlocks < data?.length && (
            <BoxMotion
              variants={itemBotToTop(0.2)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              display="flex"
              justifyContent="center"
            >
              <Button
                text="Load More"
                withIcon={false}
                onClick={() => {
                  setNumOfBlocks(numOfBlocks + 12);
                }}
              />
            </BoxMotion>
          )}

          <Footer />
        </Box>
      </>
    );

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        additionalMetaTags={[
          {
            name: "dc:creator",
            content: "arridhow",
          },
        ]}
        openGraph={{
          url: seo.url,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: "/logo.png",
              alt: "Logo Image",
              type: "image/jpeg",
            },
            { url: "/logo.png" },
          ],
          site_name: "Rubic3",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/fav.svg",
          },
          {
            rel: "apple-touch-icon",
            href: "/fav.svg",
            sizes: "76x76",
          },
        ]}
      />

      <Box
        h="100vh"
        w="100vw"
        overflow={isTouchDevice ? "visible" : "hidden"}
        onMouseMove={(e) => {
          const mouseX = e.clientX,
            mouseY = e.clientY;

          const xDecimal = mouseX / window.innerWidth,
            yDecimal = mouseY / window.innerHeight;

          const maxX = wrapperRef.current.offsetWidth - window.innerWidth,
            maxY = wrapperRef.current.offsetHeight - window.innerHeight;

          const panX = maxX * xDecimal * -1,
            panY = maxY * yDecimal * -1;

          setPan({ x: panX, y: panY });
        }}
      >
        <Header
          contactMarginRight={marginRightContact}
          isTransparent
          bg="transparent"
        />

        <Box
          position="fixed"
          bottom={marginY}
          left="50%"
          transform="translateX(-50%)"
          zIndex={500}
          color="light"
          p={4}
          mb={-4}
          cursor="pointer"
          onClick={() => {
            push(`/works?show=all`);
          }}
        >
          <BoxMotion
            variants={animateBottomToTop}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <IconChevronDown />
          </BoxMotion>
        </Box>

        <Box
          bg="dark"
          w="160vmax"
          h="160vmax"
          position="relative"
          ref={wrapperRef}
        >
          {windowSize &&
            containerSize &&
            isTouchDevice !== null &&
            (isLoading || dataLoading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100vw"
                h="100vh"
              >
                <Spinner color="light" size="xl" />
              </Box>
            ) : data ? (
              <BoxMotion
                w="full"
                h="full"
                initial={
                  isTouchDevice
                    ? {}
                    : {
                        x: toCenterNoTouch(containerSize.x, windowSize.x),
                        y: toCenterNoTouch(containerSize.y, windowSize.y),
                        opacity: 0,
                      }
                }
                animate={
                  isTouchDevice
                    ? {}
                    : {
                        x:
                          pan && !isCenter
                            ? pan.x
                            : toCenterNoTouch(containerSize.x, windowSize.x),
                        y:
                          pan && !isCenter
                            ? pan.y
                            : toCenterNoTouch(containerSize.y, windowSize.y),
                        opacity: 1,
                        scale: 1,
                        transition: {
                          ease: "easeOut",
                          duration: 3,
                        },
                      }
                }
              >
                <Box className="row-1">
                  {[7, 8, 9].map((x, i) => {
                    const top = `${m + mt}%`;
                    const left = `${m + w * (i + 1) + gx * (i + 1)}%`;
                    return (
                      <ImageWrapperFeatured
                        key={i}
                        top={top}
                        left={left}
                        className="block-8"
                        data={data[x + navIdx * 18]}
                        idx={x}
                      />
                    );
                  })}
                </Box>

                <Box className="row-2">
                  {[6, 0, 1, 10].map((x, i) => {
                    const top = `${m + h + gy + mt}%`;
                    const left = `${me + gx * i + w * i}%`;
                    return (
                      <ImageWrapperFeatured
                        key={i}
                        top={top}
                        left={left}
                        className="block-8"
                        data={data[x + navIdx * 18]}
                        idx={x}
                      />
                    );
                  })}
                </Box>

                <Box className="row-3">
                  {[17, 5, null, 2, 11].map((x, i) => {
                    const top = `${m + h * 2 + gy * 2 + mt}%`;
                    const left = `${m + w * i + gx * i}%`;

                    if (x === null)
                      return (
                        <Box
                          key="main-block"
                          w="15%"
                          h="10%"
                          position="absolute"
                          top={`${m + h * 2 + gy * 2 + mt}%`}
                          left={`${m + w * 2 + gx * 2}%`}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Heading
                            mb={[1, null, null, 2]}
                            as={motion.h1}
                            variants={itemBotToTop(0.2)}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true }}
                          >
                            Featured Works
                          </Heading>
                          <BoxMotion
                            mb={[3, 3, 4, 6]}
                            variants={itemBotToTop(0.4)}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true }}
                          >
                            <Text
                              opacity={0.6}
                              textAlign="center"
                              fontSize={{ base: "small", lg: "unset" }}
                            >
                              Excellent work done for great clients
                            </Text>
                          </BoxMotion>
                          <BoxMotion
                            variants={itemBotToTop(0.6)}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true }}
                          >
                            <Button
                              onClick={() => {
                                push(`/works?show=all`);
                                setIsCenter(true);
                              }}
                              text="View All Works"
                            />
                          </BoxMotion>
                        </Box>
                      );

                    return (
                      <ImageWrapperFeatured
                        key={i}
                        top={top}
                        left={left}
                        className="block-8"
                        data={data[x + navIdx * 18]}
                        idx={x}
                      />
                    );
                  })}
                </Box>

                <Box className="row-4">
                  {[16, 4, 3, 12].map((x, i) => {
                    const top = `${m + h * 3 + gy * 3 + mt}%`;
                    const left = `${me + gx * i + w * i}%`;
                    return (
                      <ImageWrapperFeatured
                        key={i}
                        top={top}
                        left={left}
                        className="block-8"
                        data={data[x + navIdx * 18]}
                        idx={x}
                      />
                    );
                  })}
                </Box>

                <Box className="row-5">
                  {[15, 14, 13].map((x, i) => {
                    const top = `${m + h * 4 + gy * 4 + mt}%`;
                    const left = `${m + w * (i + 1) + gx * (i + 1)}%`;
                    return (
                      <ImageWrapperFeatured
                        key={i}
                        top={top}
                        left={left}
                        className="block-8"
                        data={data[x + navIdx * 18]}
                        idx={x}
                      />
                    );
                  })}
                </Box>
              </BoxMotion>
            ) : (
              <></>
            ))}
        </Box>

        <Footer position="fixed" />
      </Box>
    </>
  );
}

const ImageWrapperFeatured = memo(function ImageWrapperFeatured({
  top,
  left,
  className,
  data,
  idx = 20,
}: {
  top: string;
  left: string;
  className?: any;
  data?: any;
  idx?: number;
}) {
  const { push } = useRouter();
  const [hover, setHover] = useState(false);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  if (!data) return null;

  return (
    <>
      <Box
        w="15%"
        h="10%"
        position="absolute"
        top={top}
        left={left}
        className={className}
        cursor="pointer"
        onMouseEnter={() => {
          isLarge && setHover(true);
        }}
        onMouseLeave={() => {
          isLarge && setHover(false);
        }}
        onClick={() => {
          isLarge ? push(`/works/${data.slug}`) : setHover(!hover);
        }}
      >
        <BoxMotion
          position="relative"
          w="full"
          h="full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.3 + idx * 0.3,
              ease: "easeInOut",
              duration: 1.5,
            },
          }}
        >
          <BoxMotion
            position="relative"
            w="full"
            h="full"
            animate={{
              opacity: hover ? 0.2 : 1,
              transition: {
                ease: "easeInOut",
                duration: 0.2,
              },
            }}
          >
            <Image
              src={getImage({
                collectionName: data.collectionName,
                recordId: data.id,
                filename: data.thumbnail,
              })}
              alt={data.thumbnail}
              fill
              sizes="30vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          </BoxMotion>
        </BoxMotion>

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
                  backgroundColor: "rgba(0,0,0,0.6)",
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
                    y: isLarge ? 0 : 20,
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
                  {isLarge ? (
                    <Text
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: makeBold(data.description_short, [data.name]),
                      }}
                    />
                  ) : (
                    <Text
                      as="a"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      onClick={() => {
                        push(`/works/${data.slug}`);
                      }}
                    >
                      {data.name}
                      <ArrowRightSm />
                    </Text>
                  )}
                </BoxMotion>
              </BoxMotion>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
});

const ImageWrapperAll = memo(function ImageWrapperAll({
  data,
  idx,
}: {
  data: any;
  idx: number;
}) {
  const { push } = useRouter();
  const [hover, setHover] = useState(false);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  if (!data) return null;

  return (
    <BoxMotion
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delay: 0.2 + idx * 0.2,
          ease: "easeInOut",
          duration: 1,
        },
      }}
      position="relative"
    >
      <Box
        onMouseEnter={() => {
          isLarge && setHover(true);
        }}
        onMouseLeave={() => {
          isLarge && setHover(false);
        }}
        onClick={() => {
          isLarge ? push(`/works/${data.slug}`) : setHover(!hover);
        }}
        position="relative"
        cursor="pointer"
      >
        <AspectRatio ratio={3 / 2} position="relative">
          <Image
            src={getImage({
              collectionName: data.collectionName,
              recordId: data.id,
              filename: data.thumbnail,
            })}
            alt={data.thumbnail}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </AspectRatio>

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
                  {isLarge ? (
                    <Text
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: makeBold(data.description_short, [data.name]),
                      }}
                    />
                  ) : (
                    <Text
                      as="a"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      onClick={() => {
                        push(`/works/${data.slug}`);
                      }}
                    >
                      {data.name}
                      <ArrowRightSm />
                    </Text>
                  )}
                </BoxMotion>
              </BoxMotion>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </BoxMotion>
  );
});

const containerFilter = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ease: "easeInOut",
    },
  },
};

const itemFilter = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
