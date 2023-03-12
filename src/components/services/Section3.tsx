import { AspectRatio, Box, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Image360 from "../../assets/images/RC Digital Service Wheel.webp";
import D3601 from "../../assets/svg/D3601.svg";
import D3602 from "../../assets/svg/D3602.svg";
import D3603 from "../../assets/svg/D3603.svg";
import D3604 from "../../assets/svg/D3604.svg";
import {
  itemBotToTop,
  marginRightContact,
  marginRightContact2,
  marginTop,
  sectionMarginLeft,
  sectionMarginLeft2,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Button from "../Button";
import Divider from "../Divider";
import TeamShowCase from "../TeamShowCase";
import WorksShowCase from "../WorksShowCase";
import CompanyMobile from "./CompanyMobile";

export default function Section3({ team, work }: { team: any; work: any }) {
  const { replace, query, push } = useRouter();

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      pt={marginTop}
      pb={{ base: 12, lg: 24 }}
      h="full"
    >
      {isLarge ? (
        <Box
          display="flex"
          alignItems="center"
          w="full"
          flexDirection="column"
          pl={sectionMarginLeft}
          pr={marginRightContact}
        >
          <AspectRatio w="full" h="full" ratio={1} position="relative">
            <Image
              src={Image360}
              alt="360 digital"
              fill
              style={{ objectFit: "contain", objectPosition: "center center" }}
            />
          </AspectRatio>

          <Box w="full" mt={12}>
            <Divider text="Our Services" color="dark" mb={10} />
          </Box>

          <Box display="flex" flexDirection="column" h="100%" w="full" gap={10}>
            {contents.map(
              ({ title, icon, list, listContent, subtitle }, i: any) => {
                return (
                  <Box key={i} color="dark">
                    <Box
                      display="flex"
                      fontSize="md"
                      flexDirection={{ base: "column", lg: "row" }}
                      mb={6}
                    >
                      <BoxMotion
                        variants={itemBotToTop(0.2)}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: false }}
                        display="flex"
                        gap={4}
                        w={["full", null, null, "30%"]}
                        mb={[6, null, null, 0]}
                        mr={"5%"}
                      >
                        <Box
                          h={{ base: 12, lg: 16 }}
                          w={{ base: 12, lg: 16 }}
                          position="relative"
                        >
                          <Image
                            src={icon}
                            fill
                            alt={title}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Text
                          fontSize="xl"
                          as="h4"
                          fontWeight={500}
                          alignSelf={{ lg: "unset", base: "flex-end" }}
                          m={0}
                          color="inherit"
                        >
                          {title}
                        </Text>
                      </BoxMotion>
                      <BoxMotion
                        variants={itemBotToTop(0.4)}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: false }}
                        w={["full", null, null, "70%"]}
                      >
                        <Text
                          color="inherit"
                          fontSize="sm"
                          mb={6}
                          fontWeight={400}
                        >
                          {subtitle}
                        </Text>
                        <Text
                          mb={2}
                          fontWeight="black"
                          fontSize="sm"
                          color="inherit"
                        >
                          What we do
                        </Text>

                        <Box
                          as="ul"
                          listStyleType="none"
                          display="flex"
                          flexDirection="column"
                          gap={1}
                        >
                          {list.map((v, i) => {
                            return (
                              <Text
                                key={v}
                                as="li"
                                color="dark"
                                fontWeight={500}
                              >
                                {v}
                              </Text>
                            );
                          })}
                        </Box>
                      </BoxMotion>
                    </Box>
                    {i < contents.length - 1 && (
                      <Box
                        h="1.5px"
                        w="full"
                        position="relative"
                        opacity={0.2}
                        bg="dark"
                      />
                    )}
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      ) : (
        <Box pl={sectionMarginLeft} pr={marginRightContact} mb={16}>
          <CompanyMobile contents={contents} type="360" color="dark" />
        </Box>
      )}

      <Box>
        <Box pl={sectionMarginLeft} pr={marginRightContact} mt={10}>
          <Divider
            text="360 Digital Division Team"
            lineOpacity={0.2}
            mb={10}
            color="dark"
          />
        </Box>

        <Box pl={sectionMarginLeft2} pr={marginRightContact2}>
          <TeamShowCase
            leaders={team}
            buttonBorderColor="dark"
            buttonColor="dark"
            buttonBgColor="#FFC925"
            type="360"
          />
        </Box>

        <Box pl={sectionMarginLeft} pr={marginRightContact} mt={10}>
          <Divider text="Related Work" lineOpacity={0.2} mb={10} color="dark" />
        </Box>
        <Box pl={sectionMarginLeft2} pr={marginRightContact2}>
          <WorksShowCase
            works={work}
            buttonBorderColor="dark"
            buttonColor="dark"
            buttonBgColor="#FFC925"
          />
        </Box>

        <Box ml={sectionMarginLeft} mt={{ base: 6, lg: 10 }}>
          <Button
            text="View Digital Works"
            isLight={false}
            onClick={() => {
              push(`/works?show=all&filter=360`);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const contents = [
  {
    title: "Creative Content",
    icon: D3601,
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
    icon: D3602,
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
    icon: D3603,
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
    icon: D3604,
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
