import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BoxMotion from "../../components/BoxMotion";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getImage, useFetchAll } from "../../utils/api";
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
  const wrapperRef = useRef<any>(null);

  const [pan, setPan] = useState<null | ICoordinate>(null);
  const [windowSize, setWindowSize] = useState<null | ICoordinate>(null);
  const [containerSize, setContainerSize] = useState<null | ICoordinate>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<null | boolean>(null);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const { data, isError, isLoading } = useFetchAll(`works`, {
    sort: `order`,
    filter: `filters ~ '${selectedFilter}'`,
  });
  const { data: filters, isLoading: isLoadingFilters } = useFetchAll(`filters`);

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
  }, []);

  const {
    gapX: gx,
    gapY: gy,
    height: h,
    margin: m,
    marginEven: me,
    marginTop: mt,
    width: w,
  } = blockSpacing;

  console.log(data);
  console.log("filters", filters);

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

      <Box position="fixed" zIndex={1001} top={14} right={32}>
        <Button
          text="Filter by Industry"
          arrowDown
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
          }}
        />
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
              {filters?.map(({ name, id }) => {
                return (
                  <Box
                    key={id}
                    _hover={{ opacity: 0.6 }}
                    cursor="pointer"
                    onClick={() => {
                      setSelectedFilter(id);
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
                      x: (containerSize.x / 2 - windowSize.x / 2) * -1,
                      y: (containerSize.y / 2 - windowSize.y / 2) * -1,
                      opacity: 0,
                    }
              }
              animate={
                isTouchDevice
                  ? {}
                  : {
                      x:
                        pan?.x ?? (containerSize.x / 2 - windowSize.x / 2) * -1,
                      y:
                        pan?.y ?? (containerSize.y / 2 - windowSize.y / 2) * -1,
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
                {[data[7], data[8], data[9]].map((x, i) => {
                  const top = `${m + mt}%`;
                  const left = `${m + w * (i + 1) + gx * (i + 1)}%`;
                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={x}
                    />
                  );
                })}
              </Box>

              <Box className="row-2">
                {[data[6], data[0], data[1], data[10]].map((x, i) => {
                  const top = `${m + h + gy + mt}%`;
                  const left = `${me + gx * i + w * i}%`;
                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={x}
                    />
                  );
                })}
              </Box>

              <Box className="row-3">
                {[data[17], data[5], null, data[2], data[11]].map((x, i) => {
                  const top = `${m + h * 2 + gy * 2 + mt}%`;
                  const left = `${m + w * i + gx * i}%`;

                  if (i === 2)
                    return (
                      <Box
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
                        <Heading mb={2}>Our Works</Heading>
                        <Text mb={6} opacity={0.6}>
                          Excellent work done for great clients
                        </Text>
                        <Button text="Watch Our Reel" />
                      </Box>
                    );

                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={x}
                    />
                  );
                })}
              </Box>

              <Box className="row-4">
                {[data[16], data[4], data[3], data[12]].map((x, i) => {
                  const top = `${m + h * 3 + gy * 3 + mt}%`;
                  const left = `${me + gx * i + w * i}%`;
                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={x}
                    />
                  );
                })}
              </Box>

              <Box className="row-5">
                {[data[7], data[8], data[9]].map((x, i) => {
                  const top = `${m + h * 4 + gy * 4 + mt}%`;
                  const left = `${m + w * (i + 1) + gx * (i + 1)}%`;
                  return (
                    <ImageWrapper
                      key={i}
                      top={top}
                      left={left}
                      className="block-8"
                      data={x}
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
}: {
  top: string;
  left: string;
  className?: any;
  data?: any;
}) {
  const { push } = useRouter();
  const [hover, setHover] = useState(false);

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
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        push(`/works/${data.slug}`);
      }}
    >
      <BoxMotion
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
          placeholder="blur"
          blurDataURL={`/_next/image?url=${getImage({
            collectionName: data.collectionName,
            recordId: data.id,
            filename: data.thumbnail,
          })}&w=16&q=1`}
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
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
            <Text
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: makeBold(data.description_short, [data.name]),
              }}
            />
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
