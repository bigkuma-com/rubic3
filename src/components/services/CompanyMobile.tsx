import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import IconAccordionMinus from "../../assets/js/IconAccordionMinus";
import IconAccordionPlus from "../../assets/js/IconAccordionPlus";
import { itemBotToTop } from "../../utils/consts";
import BoxMotion from "../BoxMotion";

export default function CompanyMobile({
  contents,
  color = "light",
  type,
}: {
  contents: any;
  color?: string;
  type: "creative" | "360" | "hospitality";
}) {
  return (
    <BoxMotion
      variants={itemBotToTop(0.2)}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false }}
      overflowY="scroll"
    >
      <Accordion allowToggle allowMultiple>
        {contents.map(
          (
            { title, icon, topList, bottomDesc, subtitle, list }: any,
            i: any
          ) => {
            return (
              <AccordionItem
                key={i}
                borderTop="0"
                borderBottom={`1px solid var(--chakra-colors-${color})`}
              >
                {({ isExpanded }) => (
                  <>
                    <Box>
                      <AccordionButton px={0} py={4} _hover={{}}>
                        <Box position="relative" w={10} h={10} mr={4}>
                          <Image
                            src={icon}
                            alt={`icon-${i}`}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </Box>
                        <Text
                          fontSize="xl"
                          fontWeight={300}
                          textTransform="capitalize"
                          as="h3"
                          color={color}
                          flex="1"
                          textAlign="left"
                        >
                          {type === "creative" && `0${i + 1}. `}
                          {title}
                        </Text>
                        {isExpanded ? (
                          <Box color={color} ml={3}>
                            <IconAccordionMinus w={36} h={36} />
                          </Box>
                        ) : (
                          <Box color={color} ml={3}>
                            <IconAccordionPlus w={36} h={36} />
                          </Box>
                        )}
                      </AccordionButton>
                    </Box>
                    <AccordionPanel p={0} mb={6} ml={14}>
                      {type === "creative" && (
                        <BoxMotion
                          variants={itemBotToTop(0.2)}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: false }}
                          fontSize="xs"
                        >
                          <Text mb={1} fontWeight={400}>
                            What we do
                          </Text>
                          <Box
                            as="ul"
                            display="flex"
                            flexDirection="column"
                            mb={5}
                          >
                            {topList.map((item: any, i: any) => {
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
                          <Text mb={6} opacity={0.6}>
                            {bottomDesc}
                          </Text>
                        </BoxMotion>
                      )}

                      {type === "hospitality" && (
                        <BoxMotion
                          variants={itemBotToTop(0.2)}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: false }}
                          fontSize="xs"
                          display="flex"
                          alignItems="center"
                          w="full"
                        >
                          <Box display="flex" flexDirection="column" h="100%">
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
                                }: any,
                                i: any
                              ) => {
                                return (
                                  <Box key={i}>
                                    <Box
                                      display="flex"
                                      fontSize="small"
                                      flexDirection={{
                                        base: "column",
                                        lg: "row",
                                      }}
                                    >
                                      <BoxMotion
                                        variants={itemBotToTop(0.6)}
                                        initial="offscreen"
                                        whileInView="onscreen"
                                        viewport={{ once: false }}
                                        w={["full", null, null, "70%"]}
                                        fontSize="sm"
                                      >
                                        <Text mb={6}>{topDesc}</Text>

                                        <Text as="h5" mb={1} fontWeight={500}>
                                          {subtitle}
                                        </Text>

                                        {isList ? (
                                          <Box
                                            as="ol"
                                            display="flex"
                                            flexDirection="column"
                                            mb={6}
                                            ml={4}
                                            gap={2}
                                          >
                                            {bottomList?.map(
                                              (item: any, i: any) => {
                                                if (isListWithTitle)
                                                  return (
                                                    <Box
                                                      as="li"
                                                      key={i}
                                                      color="light"
                                                      fontWeight={300}
                                                      fontSize="sm"
                                                    >
                                                      <Text
                                                        as="h5"
                                                        opacity={1}
                                                        fontWeight={500}
                                                      >
                                                        {bottomListTitle &&
                                                          bottomListTitle[i]}
                                                        .
                                                      </Text>

                                                      <Text opacity={0.6}>
                                                        {item}
                                                      </Text>
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
                                              }
                                            )}
                                          </Box>
                                        ) : (
                                          <Text opacity={0.6} mb={10}>
                                            {bottomDesc}
                                          </Text>
                                        )}
                                      </BoxMotion>
                                    </Box>
                                  </Box>
                                );
                              }
                            )}
                          </Box>
                        </BoxMotion>
                      )}

                      {type === "360" && (
                        <BoxMotion
                          variants={itemBotToTop(0.2)}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: false }}
                          fontSize="xs"
                          display="flex"
                          alignItems="center"
                          w="80%"
                          color="dark"
                        >
                          <Box key={i} color="dark">
                            <Box
                              display="flex"
                              fontSize="md"
                              flexDirection={{
                                base: "column",
                                lg: "row",
                              }}
                              mb={6}
                            >
                              <BoxMotion
                                variants={itemBotToTop(0.4)}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: false }}
                              >
                                <Text
                                  color="inherit"
                                  fontSize="xs"
                                  mb={6}
                                  fontWeight={400}
                                >
                                  {subtitle}
                                </Text>
                                <Text
                                  mb={2}
                                  fontWeight="black"
                                  fontSize="xs"
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
                                  {list.map((v: any, i: any) => {
                                    return (
                                      <Text
                                        key={v}
                                        as="li"
                                        color="dark"
                                        fontWeight={400}
                                        fontSize="xs"
                                      >
                                        {v}
                                      </Text>
                                    );
                                  })}
                                </Box>
                              </BoxMotion>
                            </Box>
                          </Box>
                        </BoxMotion>
                      )}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            );
          }
        )}
      </Accordion>
    </BoxMotion>
  );
}
