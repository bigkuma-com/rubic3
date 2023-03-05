import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import LogoRubicubeHospitality from "../../assets/js/LogoRubicubeHospitality";
import {
  itemBotToTop,
  sectionMarginLeft,
  sectionMarginRight,
  showOnLarge,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import HomePagination from "../landing/HomePagination";

export default function Section1() {
  const { replace, query } = useRouter();

  return (
    <Box
      w="full"
      pt={28}
      pb={36}
      pr={sectionMarginRight}
      pl={sectionMarginLeft}
      display="flex"
      flexDirection="column"
    >
      <Box
        pb={12}
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="full"
      >
        <BoxMotion
          variants={itemBotToTop(0)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false }}
        >
          <LogoRubicubeHospitality />
        </BoxMotion>

      </Box>

      <BoxMotion
        w={["full", null, null, "75%"]}
        variants={itemBotToTop(0.2)}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
      >
        <Text opacity={0.7} fontSize="sm" mb={12}>
          Our team of hotel advisors have extensive international experience in
          the hotel industry, covering a wide range of areas and services to
          help you achieve sound financial results and returns with your hotel
          investment.
        </Text>
      </BoxMotion>

      <Box display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" h="100%" gap={10}>
          {contents.map(
            (
              { bottomDesc, isList, subtitle, title, topDesc, bottomList },
              i: any
            ) => {
              return (
                <Box key={i}>
                  <Box
                    display="flex"
                    fontSize="small"
                    gap="5%"
                    flexDirection={{ base: "column", lg: "row" }}
                  >
                    <Text
                      w={["full", null, null, "35%"]}
                      fontSize="2xl"
                      wordBreak="break-word"
                      mb={[6, null, null, 0]}
                      as={motion.h4}
                      variants={itemBotToTop(0.4)}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: false }}
                    >
                      <span style={{ opacity: 0.6 }}>0{i + 1}.</span> {title}
                    </Text>
                    <BoxMotion
                      variants={itemBotToTop(0.6)}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: false }}
                      w={["full", null, null, "60%"]}
                    >
                      <Text mb={[6, null, null, 10]} opacity={0.6}>
                        {topDesc}
                      </Text>

                      <Text as="h5" mb={1} fontWeight={500}>
                        {subtitle}
                      </Text>

                      {isList ? (
                        <Box
                          as="ol"
                          display="flex"
                          flexDirection="column"
                          mb={10}
                        >
                          {bottomList?.map((item: any, i: any) => {
                            return (
                              <Box
                                ml={{ base: 4, lg: 0 }}
                                key={i}
                                as="li"
                                opacity={0.6}
                                color="light"
                              >
                                {item}
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

    </Box>
  );
}

const contents = [
  {
    title: "Hotel/Resort Management",
    subtitle: "What we do",
    topDesc: (
      <>
        Delivery of high-quality personal service leveraging the unique
        character of each hotel/ resort, creating superior guest experiences,
        extraordinary guest satisfaction, and high online reputation scores.
        Using creative strategies and best practices, the objective is to
        outperform the competition and become local market leader
      </>
    ),
    isList: false,
    bottomDesc: (
      <>
        Sales & Marketing, Engineering, Human resources & Talent development,
        Safety & security, Financial services, Food & beverage management, Rooms
        management, Other operating & departments.
      </>
    ),
  },
  {
    title: "Owners Advisor",
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
    bottomList: [
      "Advise on concept design and operational functionality of the hotel infrastructural designs at every stage of development.",
      "Selection of most suitable management for the property and continuous liaison between owner,management, and other third party specialists/consultants during all phases: pre-opening conversion, fully operational, initial and ongoing operations.",
      "Advisory services concerning Re-branding.",
      "Maintain complete control and coordination between the Owner and the operating party and also ensure all service level agreements are in compliance.",
      "Preparation of a preliminary Annual Business plan with a detailed focus on revenue forecasting.",
    ],
  },
  {
    title: "Asset Management",
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
    bottomList: [
      "Revenue Generation",
      "Financial Returns",
      "Marketing Positioning",
      "Guest Experiences & Human Resources",
    ],
  },
  {
    title: "Feasibility Study",
    topDesc: (
      <>
        A comprehensive feasibility study will provide important market analysis
        and financial evaluation of the project facilities and operations
        perspectives.
        <br />
        <br />A feasibility study and hotel business plan forms the cornerstone
        of your preparations for the new or remodeled hotel. It shows the
        investors return of investment (ROI). This forms an important and
        crucial step in the initial planning process.
      </>
    ),
    subtitle: "Our Process",
    isList: true,
    bottomList: [
      "Location Analysis",
      "Total Costs Calculation",
      "Room Rates and Year-round Occupancy Levels",
      "Local Hotel Supply and Demand Investigation",
      "Establishing and Projecting Hotel Revenue Sources",
      "Hotel Feasibility Study Projected ROI",
    ],
  },
  {
    title: "Change Management",
    topDesc: (
      <>
        To develop a customized strategy plan and reposition the property more
        efficiently amongst its competitive market set. Hotel management
        specialists will identify and focus on the unique selling points (USP)
        of the property to increase financial performance of all levels.
      </>
    ),
    subtitle: "Our Process",
    isList: false,
    bottomDesc: (
      <>
        Business & Marketing Plan
        <br />
        Revenue Generation
        <br />
        Cost Management
        <br />
        Policy & Procedure
        <br />
        Guest Experience
        <br />
        HR & Talent Development
        <br />
        Financial & Risk Management
        <br />
        Reputation Management
        <br />
        Health & Safety and Security
      </>
    ),
  },
  {
    title: "Other Creative Services",
    topDesc: (
      <>
        Rubicube Creative specializes in developing a holistic hotel brand
        positioning and identity design that incorporates brand research and
        business strategy.
      </>
    ),
    subtitle: "What we do",
    isList: true,
    bottomList: [
      "Hotel Website Development",
      "CRM Loyalty Program",
      "Mystery Audit Program",
      "Brand Development",
      "Social & Digital Marketing",
    ],
  },
];
