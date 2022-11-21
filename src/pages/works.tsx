import { Box } from "@chakra-ui/react";
import { useState } from "react";
import BoxMotion from "../components/BoxMotion";

export default function Works() {
  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  function handleMouseMove(ev: { pageX: any; pageY: any }) {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
  }

  console.log(mousePosition);

  function onPan(event: any, info: { point: { x: any; y: any } }) {
    console.log(info.point.x, info.point.y);
    console.log("ha", event.pageX, event.pageY);
  }

  return (
    <Box h="100vh" w="100vw">
      <BoxMotion
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="150vh"
        w="150vw"
        bg="pink.700"
        animate={{
          y: -200,
        }}
        onPan={onPan}
        // onMouseMove={(ev) => {
        //   // console.log(ev.currentTarget.hei)
        //   handleMouseMove(ev);
        // }}
      >
        <Box h="100vh" w="100vw" bg="yellow.500"></Box>
      </BoxMotion>
    </Box>
  );
}
