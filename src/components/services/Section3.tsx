import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Image360 from "../../assets/images/RC Digital Service Wheel.webp";
import {
  itemBotToTop,
  marginRightContact,
  sectionMarginLeft,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Divider from "../Divider";
import TeamShowCase from "../TeamShowCase";

export default function Section3({ team }: { team: any }) {
  const { replace, query, push } = useRouter();
  const [menuSelected, setMenuSelected] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  console.log("30", team);

  return (
    <LayoutGroup>
      <Box
        w={{ base: "full", lg: "70%" }}
        h="full"
        display="flex"
        pl={sectionMarginLeft}
        pr={marginRightContact}
        py={{ base: "25vmax", lg: "15vh" }}
        flexDirection="column"
      >
        <BoxMotion
          layout
          variants={itemBotToTop(0.2)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <BoxMotion layout w="full" position="relative">
            <Image
              src={Image360}
              alt="360 digital"
              height={isLarge ? 700 : 400}
              style={{ objectFit: "contain", objectPosition: "center center" }}
            />
          </BoxMotion>

          <BoxMotion layout mt={16} mb={5}>
            <Text as="h2" color="dark">
              Our Services
            </Text>
          </BoxMotion>

          <BoxMotion
            layout
            display="flex"
            flexDir="column"
            gap={3}
            w="full"
            mr="25%"
            zIndex={5}
            h="full"
            color="dark"
          >
            {contents.map(({ title, subtitle, list, listContent }, i) => {
              return (
                <BoxMotion layout key={i} opacity={1} className="animate-fade">
                  <Box display="flex" flexDir="column" gap={2}>
                    <BoxMotion layout>
                      {i === 0 && <Box h="0.5px" w="full" bg="dark" mb={1} />}
                    </BoxMotion>

                    <BoxMotion
                      layout
                      display="flex"
                      w="full"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text
                        as="h4"
                        fontSize={{ base: "xl", lg: "3xl" }}
                        fontWeight={300}
                        cursor="pointer"
                        color="dark"
                        onClick={() => {
                          setMenuSelected(menuSelected === i ? -1 : i);
                        }}
                      >
                        <span>0{i + 1}.</span> {title}
                      </Text>
                    </BoxMotion>

                    <BoxMotion layout>
                      <AnimatePresence>
                        {menuSelected === i && (
                          <BoxMotion
                            pb={4}
                            display="flex"
                            flexDirection="column"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            }}
                            exit={{
                              opacity: 0,
                              transition: {
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            }}
                          >
                            <Text
                              fontWeight={400}
                              letterSpacing="wider"
                              fontSize="xs"
                              my={5}
                              color="dark"
                            >
                              {subtitle}
                            </Text>
                            <Box
                              as="ul"
                              listStyleType="none"
                              display="flex"
                              flexDirection="column"
                              gap={4}
                            >
                              {list.map((v, i) => {
                                return (
                                  <Box key={v}>
                                    <Text
                                      key={v}
                                      as="li"
                                      color="dark"
                                      fontWeight={400}
                                    >
                                      {v}
                                    </Text>
                                    <Text
                                      mt={1}
                                      opacity={0.6}
                                      fontSize="xs"
                                      color="dark"
                                    >
                                      {listContent[i]}
                                    </Text>
                                  </Box>
                                );
                              })}
                            </Box>
                          </BoxMotion>
                        )}
                      </AnimatePresence>
                    </BoxMotion>

                    <BoxMotion layout>
                      <Box h="0.5px" w="full" bg="dark" opacity={0.6} />
                    </BoxMotion>
                  </Box>
                </BoxMotion>
              );
            })}
          </BoxMotion>
        </BoxMotion>

        <Box w="full" h="full" position="relative" mt={16}>
          <Divider text="Division" color="dark" />
          <TeamShowCase leaders={team} />
        </Box>
      </Box>
    </LayoutGroup>
  );
}

const contents = [
  {
    title: "Creative Content",
    subtitle:
      "Content marketing is the key to reach your target audience and the foundation of a successful digital marketing strategy.",
    list: ["Copywriting", "Photography", "Video Production", "Motion Graphic"],
    listContent: [
      "We plan and produce written content for your website with consistent style and message.",
      "We provide professional photography for various purposes from commercial, corporate, industrial, lifestyle, and many more.",
      "We offer one-stop video production services, starting from concept to post-production, for various purposes from advertising, company profile, digital campaign, etc.",
      "We animate your story to live through infographic, 2D/3D animation, video bumper, special effects, etc.",
    ],
  },
  {
    title: "Digital Marketing",
    subtitle:
      "Our one-stop digital marketing service is tailored to establish your online presence and drive maximum results.",
    list: [
      "Digital Marketing Strategy",
      "Media Planning",
      "SEM Media Buying",
      "SEO Search Engine Optimization",
    ],
    listContent: [
      "We utilize various channels and platforms based on the formulated digital marketing strategy to achieve your marketing goals.",
      "We develop media planning based on your marketing strategy to deliver the right content on the right channel to create an efficient campaign.",
      "Based on identification, we make ad placements on PPC Google Ads, Social Media Paid ADs for Facebook, Instagram, and Youtube.",
      "We strategize to increase your website visibility on Google search to create a stronger digital presence.",
    ],
  },
  {
    title: "Social Media Marketing",
    subtitle:
      "In this social media driven society, we utilize popular social media platforms as a creative channel to boost your brand image and engage with your target market.",
    list: [
      "Social Media Strategy",
      "Digital Campaign Activation",
      "Social Media Management",
      "KOL & Influencer",
    ],
    listContent: [
      "We streamline various social media platforms to strategize and execute your digital campaign through marketing funnels.",
      "In order to drive consumer action and sales, we create brand interaction and experience to engage deeper with your customers.",
      "We manage your social media channels and produce engaging content based on the specified target market to increase brand awareness. Traffic Distribution: Facebook, Instagram, LinkedIn, and YouTube",
      "We connect you to KOL or influencers that best represent your brand to increase customer trust and drive sales.",
    ],
  },
  {
    title: "Hosting & Security",
    subtitle:
      "With our cloud-based servers and full maintenance services, you can rest assured that your business’ hosting needs are covered.",
    list: ["Hosting", "Web Security", "Maintenance", "Email Hosting"],
    listContent: [
      "Our cloud-based servers guarantee security, faster performance and better accessibility.",
      "Our web security service offers double security measures through secure servers and secure coding, and SSL certificate.",
      "Our regular maintenance services include server maintenance, routine backups, bug patch, and system updates, with the support of our web admin.",
      "Our email hosting service allows you to manage your email professionally.",
    ],
  },
];
