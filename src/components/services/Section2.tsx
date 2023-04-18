import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import Hospitality1 from "../../assets/svg/Hospitality1.svg";
import Hospitality2 from "../../assets/svg/Hospitality2.svg";
import Hospitality3 from "../../assets/svg/Hospitality3.svg";
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
import Contacts from "./Contact";

export default function Section1({ team, work }: { team: any; work: any }) {
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
    >
      <BoxMotion
        w="full"
        variants={itemBotToTop(0.2)}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        pl={sectionMarginLeft}
        pr={marginRightContact}
      >
        <Text fontSize={{ base: "sm", lg: "md" }} mb={{ base: 6, lg: 12 }}>
          The founding philosophy behind Rubicube Hospitality is in advancing
          hospitality success through great collaborations with hotel/resort/
          villa property owners and investors. We translate fresh ideas and
          astute talent of Rubicube Hospitality into innovative and refreshing
          guest experiences, thereby ensuring the growth and success of our
          property operations.
        </Text>
      </BoxMotion>

      {isLarge ? (
        <Box
          display="flex"
          alignItems="center"
          w="full"
          pl={sectionMarginLeft}
          pr={marginRightContact}
        >
          <Box display="flex" flexDirection="column" h="100%" gap={10}>
            {contents.map(
              (
                {
                  bottomDesc,
                  isList,
                  subtitle,
                  title,
                  topDesc,
                  bottomList,
                  icon,
                  isListWithTitle,
                  bottomListTitle,
                },
                i: any
              ) => {
                return (
                  <Box key={i}>
                    <Box
                      display="flex"
                      fontSize="small"
                      flexDirection={{ base: "column", lg: "row" }}
                    >
                      <Box
                        h={{ base: 12, lg: 16 }}
                        w={{ base: 12, lg: 16 }}
                        position="relative"
                        mr={8}
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
                        w={["full", null, null, "25%"]}
                        fontSize="1.4rem"
                        wordBreak="keep-all"
                        mb={[6, null, null, 0]}
                        as={motion.h4}
                        variants={itemBotToTop(0.4)}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: false }}
                        mr="5%"
                      >
                        {/* 0{i + 1}.  */}
                        {title}
                      </Text>
                      <BoxMotion
                        variants={itemBotToTop(0.6)}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: false }}
                        w={["full", null, null, "70%"]}
                        fontSize="sm"
                      >
                        <Text mb={[6, null, null, 10]}>{topDesc}</Text>

                        <Text as="h5" mb={1} fontWeight={500}>
                          {subtitle}
                        </Text>

                        {isList ? (
                          <Box
                            as="ol"
                            display="flex"
                            flexDirection="column"
                            mb={10}
                            ml={4}
                            gap={2}
                          >
                            {bottomList?.map((item: any, i: any) => {
                              if (isListWithTitle)
                                return (
                                  <Box
                                    as="li"
                                    key={i}
                                    color="light"
                                    fontWeight={300}
                                    fontSize="sm"
                                  >
                                    <Text as="h5" opacity={1} fontWeight={500}>
                                      {bottomListTitle && bottomListTitle[i]}.
                                    </Text>

                                    <Text opacity={0.6}>{item}</Text>
                                  </Box>
                                );
                              return (
                                <Box
                                  as="li"
                                  key={i}
                                  color="light"
                                  fontWeight={300}
                                  fontSize="sm"
                                  opacity={0.6}
                                >
                                  <Text>{item}</Text>
                                </Box>
                              );
                            })}
                          </Box>
                        ) : (
                          <Text opacity={0.6} mb={10}>
                            {bottomDesc}
                          </Text>
                        )}
                      </BoxMotion>
                    </Box>
                    {i < contents.length - 1 && (
                      <Box
                        h="1.5px"
                        w="full"
                        bg="light"
                        position="relative"
                        opacity={0.2}
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
          <CompanyMobile contents={contents} type="hospitality" />
        </Box>
      )}

      <Box pl={sectionMarginLeft} pr={marginRightContact} mt={10}>
        <Divider text="Hospitality Division Team" lineOpacity={0.2} mb={10} />
      </Box>

      <Box pl={sectionMarginLeft2} pr={marginRightContact2}>
        <TeamShowCase
          leaders={team}
          type="hospitality"
          buttonBorderColor="light"
          buttonColor="light"
          buttonBgColor="#325D92"
        />
      </Box>

      <Box pl={sectionMarginLeft} pr={marginRightContact} mt={10}>
        <Divider text="Related Work" lineOpacity={0.2} mb={10} />
      </Box>
      <Box pl={sectionMarginLeft2} pr={marginRightContact2}>
        <WorksShowCase
          works={work}
          buttonBorderColor="light"
          buttonColor="light"
          buttonBgColor="#325D92"
        />
      </Box>

      <Box ml={sectionMarginLeft} mt={{ base: 6, lg: 10 }}>
        <Button
          text="View Hospitality Works"
          onClick={() => {
            push(`/works?show=all&filter=hospitality`);
          }}
        />
      </Box>

      <Box pl={sectionMarginLeft2} pr={marginRightContact2} mt={10}>
        <Contacts contacts={contacts}  />
      </Box>
    </Box>
  );
}

const contacts = [
  {
    location: "Singapore",
    whatsapp: { name: "+65.8498.1278", url: "https://wa.me/6584981278" },
    email: "info.sg@rubic3.com",
    instagram: {
      name: "rubicube.hospitality",
      url: "https://www.instagram.com/rubicube.hospitality/",
    },
    facebook: {
      name: "rubicube hospitality sg",
      url: "https://facebook.com/rubicubehospitalitysg/",
    },
    address: (
      <>
        60 Paya Lebar Road #11-26
        <br />
        Paya Lebar Square
        <br />
        Singapore 409051
      </>
    ),
  },
];

const contents = [
  {
    title: "Hotel/Resort Management",
    icon: Hospitality1,
    subtitle: "What we do",
    topDesc: (
      <>
        Delivery of high-quality personal service leveraging the unique
        character of each hotel/resort, creating superior guest experiences,
        extraordinary guest satisfaction, and high online reputation scores.
        <br />
        <br />
        Using creative strategies and best practices, the objective is to
        outperform the competition and become local market leader.
      </>
    ),
    isList: false,
    isListWithTitle: false,
    bottomDesc: (
      <>
        Sales & Marketing, Engineering, Human resources & Talent development,
        Safety & security, Financial services, Food & beverage management, Rooms
        management, Other operating & departments.
      </>
    ),
  },
  {
    title: "Owner’s Representative",
    icon: Hospitality2,
    subtitle: "What we do",
    topDesc: (
      <>
        To provide customized management strategies to maximize cash flow,
        value, and business continuation. To also provide continuous business
        improvement recommendations whilst evaluating all internal processes
        against the industry standards.
        <br />
        <br />
        The aim is to ensure property performance is ahead of its competitors.
      </>
    ),
    isList: true,
    isListWithTitle: true,
    bottomListTitle: [
      "Market Research & Concept",
      "Brand Development",
      "Design & Build",
      "Hospitality Management",
      "Marketing & Sustainability",
    ],
    bottomList: [
      "3Cs Research (Company/Core, Competitors, Customer/Client/Consumer), Research Data, such as Competitive advantage, Vision & Mission, Value Proposition, Attributes, Target Market, Competitions, Products/Services, Key Stakeholders.",
      "Naming Development, Brand Strategy, Brand Platform, Brand Personality, Brand Architecture, Brand Experience, Brand Narrative, Identity Development, Brand Management, Brand Playbook.",
      "Planning, Project Managing & Construction",
      "Hotel/Resort Management, Owner’s Representative, Asset Management",
      "Creative Content, Hotel Website Development, Social & Digital Marketing, CRM Loyalty Program",
    ],
  },
  {
    title: "Asset Management",
    icon: Hospitality3,
    topDesc: (
      <>
        Rubicube Hospitality provides collective hospitality expertise gained
        from years of experience practiced and adopted by international hotel
        brands in the world.
        <br />
        <br />
        Given the volatility in the global tourism industry, hotel owners can
        vastly benefit by having an Asset Management service to practice
        efficient check and balances on the operator to maximize owner’s
        returns.
      </>
    ),
    subtitle: "Our Process with 4 key focus areas",
    isList: true,
    isListWithTitle: false,
    bottomList: [
      "Revenue Generation",
      "Financial Returns",
      "Marketing Positioning",
      "Guest Experiences & Human Resources",
    ],
  },
];
