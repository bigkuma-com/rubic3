import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Rubic360 from "../../assets/images/FA Rubicube 360 Digital logo2.png";
import RubicCreative from "../../assets/images/FA Rubicube Creativity Logo2.png";
import RubicHospitality from "../../assets/images/FA Rubicube Hospitality Logo2.png";
import {
  itemBotToTop,
  marginBottom,
  marginRightContact,
  marginTop,
  sectionMarginLeft,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function Section1() {
  const { push } = useRouter();

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      pl={sectionMarginLeft}
      pr={marginRightContact}
      pt={marginTop}
      pb={marginBottom}
    >
      <Box display="flex" flexDirection="column">
        <Heading
          w={{ base: "full", lg: "70%" }}
          fontSize={{ base: "xl", lg: "3xl" }}
          mb={[4, 4, 4, 6]}
          as={motion.h2}
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          HeArt-Work beats talent when talent doesn’t work with a heart
        </Heading>
        <BoxMotion
          w={{ base: "full", lg: "80%" }}
          mb={[6, 8]}
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <Text as="p" fontSize="sm">
            <Text as="span" opacity={0.6}>
              {`Rubicube Group is a dynamic and innovative branding and management advisory firm that has been making waves in the industry since 2008. Our team of experts excels in a wide range of services, including brand strategy, identity development, hotel management, F&B management, digital marketing, and communication, among others.`}
              <br />
              <br />
              {`Our unique approach to branding and management is rooted in our commitment to a holistic, 360-degree perspective. We believe that every aspect of a business, from its brand identity to its digital presence, must work together seamlessly to achieve success. That's why we take a comprehensive approach to every project, ensuring that every detail is carefully considered and executed to perfection.`}
              <br />
              <br />
              {`With a presence in Singapore, Indonesia, and Malaysia, Rubicube Group has worked with a diverse range of clients, from independent startups to international brands. Our client-centric approach has earned us a reputation for excellence and innovation, and we are proud to have helped many businesses achieve their goals and realize their full potential.`}
              <br />
              <br />
              {`Today, we are thrilled to announce that Rubicube Group has joined the Adhya Group, allowing us to expand our company divisions and services even further. With Adhya Group's extensive resources and expertise, we are excited to continue providing exceptional, holistic solutions to businesses across the region.`}
              <br />
              <br />
            </Text>

            <b>
              Today, we are proud to announce that we have joined the Adhya
              Group and have extended our company divisions and services.
            </b>
          </Text>
        </BoxMotion>
        <BoxMotion
          variants={itemBotToTop(0.4)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
          display="flex"
          gap={{ base: 4, lg: 10 }}
          alignItems={{ base: "flex-start", lg: "center" }}
          flexDir={{ base: "column", lg: "row" }}
          mb={{ base: 6, lg: 20 }}
        >
          {rubicServices.map(({ image, link, title }, i) => {
            return (
              <Fragment key={i}>
                <Box
                  onClick={() => {
                    push(link);
                  }}
                  position="relative"
                >
                  <BoxMotion
                    position="relative"
                    w={{ base: "120px", xl: "180px" }}
                    h={{ base: "80px", xl: "120px" }}
                    cursor="pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={image}
                      fill
                      alt={title}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </BoxMotion>
                </Box>

                {i < 2 && (
                  <Box
                    h={{ base: "1px", lg: "80px" }}
                    w={{ base: "full", lg: "1px" }}
                    bg="light"
                  />
                )}
              </Fragment>
            );
          })}
        </BoxMotion>
      </Box>
    </Box>
  );
}

const rubicServices = [
  {
    image: RubicCreative,
    title: "Rubicube Creativity",
    link: "/our-company?selected=creative",
  },
  {
    image: Rubic360,
    title: "Rubicube 360 Digital",
    link: "/our-company?selected=360",
  },
  {
    image: RubicHospitality,
    title: "Rubicube Hospitality",
    link: "/our-company?selected=hospitality",
  },
];
