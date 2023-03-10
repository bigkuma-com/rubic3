import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import IconDiscovery from "../../assets/svg/IconDiscovery.svg";
import IconEnvision from "../../assets/svg/IconEnvision.svg";
import IconProduction from "../../assets/svg/IconProduction.svg";
import IconRealization from "../../assets/svg/IconRealization.svg";
import {
  itemBotToTop,
  marginRightContact,
  sectionMarginLeft,
} from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Divider from "../Divider";
import TeamShowCase from "../TeamShowCase";

export default function Section1({ team }: { team: any }) {
  const { replace, query } = useRouter();

  return (
    <Box
      w={{ base: "full", lg: "70%" }}
      h="full"
      display="flex"
      alignItems="center"
      pl={sectionMarginLeft}
      pr={marginRightContact}
      py={{ base: "10vh", lg: "15vh" }}
    >
      <Box display="flex" alignItems="center" w="full">
        <Box display="flex" flexDirection="column" h="100%" w="full" gap={10}>
          {contents.map(({ bottomDesc, title, topList, icon }, i: any) => {
            return (
              <Box key={i}>
                <Box
                  display="flex"
                  fontSize="small"
                  flexDirection={{ base: "column", lg: "row" }}
                >
                  <BoxMotion
                    variants={itemBotToTop(0.2)}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false }}
                    display="flex"
                    gap={4}
                    w={["full", null, null, "40%"]}
                    mb={[6, null, null, 0]}
                    mr={4}
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
                      fontSize="2xl"
                      as="h4"
                      alignSelf={{ lg: "unset", base: "flex-end" }}
                      m={0}
                    >
                      0{i + 1}. {title}
                    </Text>
                  </BoxMotion>
                  <BoxMotion
                    variants={itemBotToTop(0.4)}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: false }}
                    w={["full", null, null, "60%"]}
                  >
                    <Text mb={1} fontWeight={500}>
                      What we do
                    </Text>
                    <Box as="ul" display="flex" flexDirection="column" mb={5}>
                      {topList.map((item, i: any) => {
                        return (
                          <Box
                            key={i}
                            as="li"
                            opacity={0.6}
                            color="light"
                            ml={{ base: 4, lg: 0 }}
                          >
                            {item}
                          </Box>
                        );
                      })}
                    </Box>
                    <Text as="h5" mb={1} fontWeight={500}>
                      Key Deliverables
                    </Text>
                    <Text mb={10} opacity={0.6}>
                      {bottomDesc}
                    </Text>
                  </BoxMotion>
                </Box>
                {i < contents.length - 1 && (
                  <Box
                    h="1.5px"
                    w="full"
                    bg="light"
                    position="relative"
                    opacity={0.2}
                    _before={{
                      content: '""',
                      display: "inline-block",
                      height: "17px",
                      width: "17px",
                      position: "absolute",
                      left: "50%",
                      top: "-8px",
                      backgroundColor: "var(--chakra-colors-dark)",
                      transform: "rotate(45deg)",
                    }}
                    _after={{
                      borderStyle: "solid",
                      borderWidth: "2px 2px 0 0",
                      content: '""',
                      display: "inline-block",
                      height: "18px",
                      position: "absolute",
                      left: "50%",
                      verticalAlign: "top",
                      width: "18px",
                      top: "-8px",
                      transform: "rotate(135deg)",
                    }}
                  />
                )}
              </Box>
            );
          })}

          <Box w="full" h="full" position="relative" mb={12}>
            <Divider text="Creative Division Team" lineOpacity={0.2} mb={10} />
            <TeamShowCase leaders={team} type="creative" />
          </Box>

          <Box w="full" h="full" position="relative">
            <Divider text="Creative Division Team" lineOpacity={0.2} mb={10} />
            <TeamShowCase leaders={team} type="creative" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const contents = [
  {
    title: "Discovery",
    icon: IconDiscovery,
    topList: [
      "Clarify the corporate vision, strategies, goals, and values",
      "Research stakeholder needs and perceptions",
      "Conduct marketing, competitive, technological, legal, and language audits",
      "Interview key members management team",
      "Evaluate existing brands and brand architecture",
    ],
    bottomDesc:
      "Brand audit, such as competitive advantage, vision & mission, value proposition, attributes, target market, key products & services, key competitors, key stakeholders",
  },
  {
    title: "Envision",
    icon: IconEnvision,
    topList: [
      "Synthesize the research into actionable data",
      "Clarify the brand strategy",
      "Develop a brand positioning platform",
      "Co-create the brand attributes",
      "Provide a brand brief for review and approval",
      "Creation of a naming strategy",
      "Development key branding message",
    ],
    bottomDesc:
      "Brand Story/Narrative, Marketing Campaign & Strategy, Content Development & Management, Concept + Ideation, Naming Development, Brand Strategy, Brand Vision/Mission, Brand Purpose, Brand Personality, Tone of Voice, Brand Architecture, Brand Experience, Brand Management, Brand Playbook, Visual Language",
  },
  {
    title: "Realization",
    icon: IconRealization,
    topList: [
      "Design brand identity",
      "Explore brand applications",
      "Finalize brand architecture",
      "Presentation of the final branding visual strategy",
    ],
    bottomDesc:
      "Graphic Design, Advertising, Identity design, Packaging & Label Design, Company profile, Investor & Proposal Presentation, Marketing Collaterals {Online and Printed: Brochure, Catalogue, Flyers, Poster, etc}, Website Design Stationery, Uniform & Attributes Design, Identity Guideline, Signage & Wayfinding, Motion Graphic, Illustration",
  },
  {
    title: "Production",
    icon: IconProduction,
    topList: [
      "Finalize identity design",
      "Initiate trademark protection",
      "Prioritize and design applications",
      "Delivery of final branded print materials",
    ],
    bottomDesc:
      "Digital Printing, Offset Printing, Special Effect Printing, Customise Packaging, Uniforms, Merchandising Good, Promotional Items",
  },
];
