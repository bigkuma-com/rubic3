import { Box } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export default function Works() {
  const boxRef = useRef(null);
  const wrapperRef = useRef(null);
  const windowRef = useRef(null);

  const boxDimensions = useSize(boxRef);
  const wrapperDimensions = useSize(wrapperRef);

  const [wrapperPosition, setWrapperPosition] = useState({
    left: 0,
    top: 0,
  });

  const [windowPosition, setWindowPosition] = useState({
    left: 0,
    top: 0,
  });

  const [scrollPosition, setScrollPosition] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setScrollPosition({ left: e.pageX, top: e.pageY });
    });
  }, []);

  console.log("knontol", scrollPosition);

  function handleMouseMove(ev: any) {
    setWrapperPosition({ left: ev.pageX, top: ev.pageY });
  }

  function onPan(event: any, info: { point: { x: any; y: any } }) {
    console.log(info.point.x, info.point.y);
    console.log("ha", event.pageX, event.pageY);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will be called every 2 seconds");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onIdle = () => {
    console.log("idle");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const onActive = (event: any) => {
    console.log("active");
  };

  const idleTimer = useIdleTimer({ onIdle, onActive, timeout: 2000 });

  console.log("wrapper", wrapperPosition);
  console.log("window", windowPosition);

  useEffect(() => {
    const { left, top } = wrapperPosition;
    if (left <= 5 && top <= 5) {
      window.scrollTo({
        top: 2000,
        left: 2000,
        behavior: "smooth",
      });
    }
  }, [wrapperPosition]);

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="green.600"
      ref={wrapperRef}
      position="relative"
      margin={0}
      onMouseMove={(ev) => {
        setWindowPosition({ left: ev.clientX, top: ev.clientY });
      }}
    >
      <Box
        w="2000px"
        h="140vh"
        bg="pink.700"
        display="flex"
        gap={5}
        alignItems="center"
        justifyContent="center"
        ref={wrapperRef}
        position="absolute"
        top={0}
        left={0}
        onMouseMove={(ev) => {
          setWrapperPosition({ left: ev.pageX, top: ev.pageY });
        }}
      >
        <Box h="200px" w="200px" bg="yellow.500"></Box>
        <Box h="200px" w="200px" bg="yellow.500"></Box>
      </Box>
    </Box>
  );
}
