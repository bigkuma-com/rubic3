import { Box } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { useRef, useState } from "react";
import BoxMotion from "../components/BoxMotion";

export default function Works() {
  const boxRef = useRef(null);
  const wrapperRef = useRef(null);
  const boxDimensions = useSize(boxRef);
  const wrapperDimensions = useSize(wrapperRef);

  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  function handleMouseMove(ev: { pageX: any; pageY: any }) {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
  }

  console.log("kontol", wrapperDimensions, boxDimensions);
  console.log(mousePosition);

  function onPan(event: any, info: { point: { x: any; y: any } }) {
    console.log(info.point.x, info.point.y);
    console.log("ha", event.pageX, event.pageY);
  }

  // window.onmousemove = (e) => {
  //   const mouseX = e.clientX,
  //     mouseY = e.clientY;

  //   const xDecimal = mouseX / window.innerWidth,
  //     yDecimal = mouseY / window.innerHeight;

  //   const maxX = gallery.offsetWidth - window.innerWidth,
  //     maxY = gallery.offsetHeight - window.innerHeight;

  //   const panX = maxX * xDecimal * -1,
  //     panY = maxY * yDecimal * -1;

  //   gallery.animate(
  //     {
  //       transform: `translate(${panX}px, ${panY}px)`,
  //     },
  //     {
  //       duration: 4000,
  //       fill: "forwards",
  //       easing: "ease",
  //     }
  //   );
  // };

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="green.600"
      // overflow="hidden"
      position="relative"
      margin={0}
    >
      <Box
        w="full"
        h="full"
        ref={wrapperRef}
        onMouseMove={(ev) => {
          handleMouseMove(ev);
        }}
      >
        <BoxMotion
          position="absolute"
          // top={0}
          // left={0}
          ref={boxRef}
          w="140vw"
          h="140vh"
          display="flex"
          gap={5}
          alignItems="center"
          justifyContent="center"
          bg="pink.700"
          initial={
            {
              // top: "50%",
              // y: "-50%",
              // x: "-50%",
              // transform: "translate(-50%, -50%)",
            }
          }
        >
          <Box h="200px" w="200px" bg="yellow.500"></Box>
          <Box h="200px" w="200px" bg="yellow.500"></Box>
        </BoxMotion>
      </Box>
    </Box>
  );
}
