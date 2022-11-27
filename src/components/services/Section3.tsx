import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LogoRubicubeHospitality from "../../assets/js/LogoRubicubeHospitality";
import { sectionMarginLeft, sectionMarginRight } from "../../utils/consts";
import HomePagination from "../landing/HomePagination";

export default function Section3() {
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
        <LogoRubicubeHospitality />

        <HomePagination
          section={2}
          maxSection={4}
          enableNavigation={true}
          prevSlide={() => {
            replace({
              query: { ...query, selected: "hospitality" },
            });
          }}
          nextSlide={() => {
            replace({
              query: { ...query, selected: "360" },
            });
          }}
        />
      </Box>

      <Text opacity={0.7} fontSize="sm" mb={12} w="75%">
        For now the content is in the stage of refinement. Will be released
        soon.
      </Text>
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
