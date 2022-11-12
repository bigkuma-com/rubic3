import { Box } from "@chakra-ui/react";
import React from "react";
import createScrollSnap from "scroll-snap";

class Landing extends React.Component {
  container = React.createRef<any>();

  bindScrollSnap() {
    const element: any = this.container.current;
    createScrollSnap(
      element,
      {
        snapDestinationY: "100%",
      },
      () => console.log("snapped")
    );
  }

  componentDidMount() {
    this.bindScrollSnap();
  }

  render() {
    return (
      <Box
        h="100vh"
        position="absolute"
        top={0}
        left={0}
        overflow="auto"
        w="full"
        ref={this.container}
      >
        <Box bg="blue.800" h="100vh" className="page first-page"></Box>
        <Box bg="pink.800" h="100vh"></Box>
        <Box bg="purple.800" h="100vh"></Box>
      </Box>
    );
  }
}

export default Landing;
