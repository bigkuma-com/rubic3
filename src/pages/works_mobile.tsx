import { Box, Heading } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { useEffect, useRef, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import BoxMotion from "../components/BoxMotion";
import { ICoordinate } from "../utils/types";

export default function Works() {
  const boxRef = useRef(null);
  const wrapperRef = useRef<any>(null);
  const windowRef = useRef(null);

  const boxDimensions = useSize(boxRef);
  const wrapperDimensions = useSize(wrapperRef);

  const [pan, setPan] = useState<null | ICoordinate>(null);
  const [windowSize, setWindowSize] = useState<null | ICoordinate>(null);
  const [containerSize, setContainerSize] = useState<null | ICoordinate>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<null | boolean>(null);

  // console.log(pan, windowSize, containerSize);

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

    console.log("hai", isTouch, wrapperRef);

    setIsTouchDevice(isTouch);
  }, [wrapperRef]);

  useEffect(() => {
    if (
      isTouchDevice &&
      wrapperRef !== null &&
      containerSize !== null &&
      windowSize !== null
    ) {
      window.scrollTo({
        top: containerSize.x / 2 - windowSize.x / 2,
        left: containerSize.y / 2 - windowSize.y / 2,
        behavior: "smooth",
      });
    }
  }, [wrapperRef, isTouchDevice, containerSize, windowSize]);

  return (
    <Box
      h="100vh"
      bg="yellow.100"
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
      <Box h="140vmax" w="2000px" ref={wrapperRef} position="relative">
        {windowSize &&
          containerSize &&
          (isTouchDevice ? (
            <BoxMotion
              id="gallery"
              w="full"
              h="full"
              bg="pink.100"
              position="absolute"
              top={0}
            >
              <Heading
                color="dark"
                position="absolute"
                fontSize="3rem"
                top="50%"
                left="50%"
                zIndex={999}
              >
                {isMobile ? "hai " : "halo "}
                <BrowserView>broser</BrowserView>
                <MobileView>mobile</MobileView>
              </Heading>

              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1520338258525-606b90f95b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBibHVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1521127474489-d524412fd439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
            </BoxMotion>
          ) : (
            <BoxMotion
              id="gallery"
              w="full"
              h="full"
              initial={{
                x: (containerSize.x / 2 - windowSize.x / 2) * -1,
                y: (containerSize.y / 2 - windowSize.y / 2) * -1,
                opacity: 0,
              }}
              animate={{
                x: pan?.x ?? (containerSize.x / 2 - windowSize.x / 2) * -1,
                y: pan?.y ?? (containerSize.y / 2 - windowSize.y / 2) * -1,
                opacity: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.5,
                },
              }}
            >
              <Heading
                color="dark"
                position="absolute"
                fontSize="3rem"
                top="50%"
                left="50%"
                zIndex={999}
              >
                {isMobile ? "hai " : "halo "}
                <BrowserView>broser</BrowserView>
                <MobileView>mobile</MobileView>
              </Heading>

              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1520338258525-606b90f95b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBibHVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1521127474489-d524412fd439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70" />
              </Box>
              <Box className="tile">
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70" />
              </Box>
            </BoxMotion>
          ))}
      </Box>
    </Box>
  );
}
