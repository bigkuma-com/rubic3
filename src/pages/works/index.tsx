import { Box, Heading, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import BoxMotion from "../../components/BoxMotion";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getImage, useFetchAll } from "../../utils/api";
import { itemBotToTop, marginX } from "../../utils/consts";
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

export default function Works() {
  const { query, replace } = useRouter();
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
  }, [query, filters]);

  useEffect(() => {
    if (wrapperRef === null) return;

    setContainerSize({
      x: wrapperRef?.current?.offsetWidth,
      y: wrapperRef?.current?.offsetHeight,
    });
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, [wrapperRef]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouchDevice(isTouch);

    setTimeout(() => {
      setIsCenter(false);
    }, 2500);
  }, []);

  const onIdle = () => {
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

  return (
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
      <Header />

      <Box
        position="fixed"
        zIndex={1001}
        {...(isLarge
          ? {
              top: 14,
              right: 32,
            }
          : {
              top: [24],
              left: marginX,
            })}
        onMouseOver={() => {
          setIsCenter(true);
        }}
        onMouseLeave={() => {
          setIsCenter(false);
        }}
      >
        <BoxMotion
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <Button
            text={isLarge ? "Filter by Industry" : "Filter"}
            arrowDown
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
            }}
          />
        </BoxMotion>
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
                }}
              >
                <Text as={motion.span} variants={itemFilter} fontSize="sm">
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
                        query: { ...query, filter: name.toLowerCase() },
                      });
                      setIsFilterOpen(false);
                    }}
                  >
                    <Text as={motion.span} variants={itemFilter} fontSize="sm">
                      {name}
                    </Text>
                  </Box>
                );
              })}
            </BoxMotion>
          )}
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
            zIndex={1000}
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
          (isLoading ? (
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
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={data[x]}
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
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={data[x]}
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
                          Our Works
                        </Heading>
                        <Text
                          mb={[3, 3, 4, 6]}
                          opacity={0.6}
                          as={motion.h2}
                          variants={itemBotToTop(0.4)}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: true }}
                          textAlign="center"
                          fontSize={{ sm: "small", lg: "unset" }}
                        >
                          Excellent work done for great clients
                        </Text>
                        <BoxMotion
                          variants={itemBotToTop(0.6)}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: true }}
                        >
                          <Button text="Watch Our Reel" />
                        </BoxMotion>
                      </Box>
                    );

                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={data[x]}
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
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={data[x]}
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
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={data[x]}
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

      <Footer />
    </Box>
  );
}

function ImageWrapper({
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
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.2 + idx * 0.2,
            ease: "easeInOut",
            duration: 1,
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
          <BoxMotion
            w="90%"
            position="absolute"
            left="0"
            bottom="-15%"
            initial={{
              x: 0,
              opacity: 0,
            }}
            animate={{
              x: "20%",
              opacity: 1,
              transition: {
                ease: "easeInOut",
                duration: 0.2,
              },
            }}
            exit={{
              x: "5%",
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
                onClick={() => {
                  push(`/works/${data.slug}`);
                }}
              >
                {data.name}
              </Text>
            )}
          </BoxMotion>
        )}
      </AnimatePresence>
    </Box>
  );
}

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
