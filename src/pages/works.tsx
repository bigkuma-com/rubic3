import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BoxMotion from "../components/BoxMotion";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/header";
import { getImage, useFetchAll } from "../utils/api";
import { ICoordinate } from "../utils/types";

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
  const { data, isError, isLoading } = useFetchAll(`works`);

  const wrapperRef = useRef<any>(null);

  const [pan, setPan] = useState<null | ICoordinate>(null);
  const [windowSize, setWindowSize] = useState<null | ICoordinate>(null);
  const [containerSize, setContainerSize] = useState<null | ICoordinate>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<null | boolean>(null);

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
                      transition: {
                        ease: "easeOut",
                        duration: 3,
                      },
                    }
              }
            >
              <Box className="row-1">
                <ImageWrapper
                  top={`${m + mt}%`}
                  left={`${m + w + gx}%`}
                  className="block-8"
                  data={data[7]}
                />
                <ImageWrapper
                  top={`${m + mt}%`}
                  left={`${m + w * 2 + gx * 2}%`}
                  className="block-9"
                  data={data[8]}
                />
                <ImageWrapper
                  top={`${m + mt}%`}
                  left={`${m + w * 3 + gx * 3}%`}
                  className="block-10"
                  data={data[9]}
                />
              </Box>

              <Box className="row-2">
                <ImageWrapper
                  top={`${m + h + gy + mt}%`}
                  left={`${me}%`}
                  className="block-7"
                  data={data[6]}
                />
                <ImageWrapper
                  top={`${m + h + gy + mt}%`}
                  left={`${me + gx + w}%`}
                  className="block-1"
                  data={data[0]}
                />
                <ImageWrapper
                  top={`${m + h + gy + mt}%`}
                  left={`${me + gx * 2 + w * 2}%`}
                  className="block-2"
                  data={data[1]}
                />
                <ImageWrapper
                  top={`${m + h + gy + mt}%`}
                  left={`${me + gx * 3 + w * 3}%`}
                  className="block-11"
                  data={data[10]}
                />
              </Box>

              <Box className="row-3">
                <ImageWrapper
                  top={`${m + h * 2 + gy * 2 + mt}%`}
                  left={`${m}%`}
                  className="block-18"
                  data={data[17]}
                />
                <ImageWrapper
                  top={`${m + h * 2 + gy * 2 + mt}%`}
                  left={`${m + w + gx}%`}
                  className="block-6"
                  data={data[5]}
                />

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

                <ImageWrapper
                  top={`${m + h * 2 + gy * 2 + mt}%`}
                  left={`${m + w * 3 + gx * 3}%`}
                  className="block-3"
                  data={data[2]}
                />
                <ImageWrapper
                  top={`${m + h * 2 + gy * 2 + mt}%`}
                  left={`${m + w * 4 + gx * 4}%`}
                  className="block-12"
                  data={data[11]}
                />
              </Box>

              <Box className="row-4">
                <ImageWrapper
                  top={`${m + h * 3 + gy * 3 + mt}%`}
                  left={`${me}%`}
                  className="block-17"
                  data={data[16]}
                />
                <ImageWrapper
                  top={`${m + h * 3 + gy * 3 + mt}%`}
                  left={`${me + gx + w}%`}
                  className="block-5"
                  data={data[4]}
                />
                <ImageWrapper
                  top={`${m + h * 3 + gy * 3 + mt}%`}
                  left={`${me + gx * 2 + w * 2}%`}
                  className="block-4"
                  data={data[3]}
                />
                <ImageWrapper
                  top={`${m + h * 3 + gy * 3 + mt}%`}
                  left={`${me + gx * 3 + w * 3}%`}
                  className="block-13"
                  data={data[12]}
                />
              </Box>

              <Box className="row-5">
                <ImageWrapper
                  top={`${m + h * 4 + gy * 4 + mt}%`}
                  left={`${m + w + gx}%`}
                  className="block-8"
                  data={data[7]}
                />
                <ImageWrapper
                  top={`${m + h * 4 + gy * 4 + mt}%`}
                  left={`${m + w * 2 + gx * 2}%`}
                  className="block-9"
                  data={data[8]}
                />
                <ImageWrapper
                  top={`${m + h * 4 + gy * 4 + mt}%`}
                  left={`${m + w * 3 + gx * 3}%`}
                  className="block-10"
                  data={data[9]}
                />
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
  return (
    <Box
      w="15%"
      h="10%"
      position="absolute"
      top={top}
      left={left}
      className={className}
    >
      {data && (
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
          }}
        />
      )}
    </Box>
  );
}
