import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import BackToHome from "../components/BackToHome";
import BoxMotion from "../components/BoxMotion";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/header";
import NavLef from "../components/NavLeft";
import Section1 from "../components/services/Section1";
import Section2 from "../components/services/Section2";
import Section3 from "../components/services/Section3";
import { getFullList } from "../utils/api";
import {
  animateTopToBottom,
  containerFilter,
  itemFilter,
  marginRightContact,
  marginX,
  showOnLarge,
  sidebarServices,
  themeColor,
} from "../utils/consts";
import { categoirzeTeam, categoirzeWorks } from "../utils/functions";

const seo = {
  url: "https://rubic3.com/our-company",
  title: "Our Company - Rubicube Group",
  description: "What we do.",
};

export default function OurCompany({
  team,
  works,
  teamHospitality,
  teamCreative,
  team360,
}: {
  team: any;
  works: any;
  teamHospitality: any;
  teamCreative: any;
  team360: any;
}) {
  const { push, query, replace } = useRouter();

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const prevRefSlides = useRef(null);
  const nextRefSlides = useRef(null);

  const [section, setSection] = useState(0);
  const [isShowFilter, setIsShowFilter] = useState(false);

  useEffect(() => {
    const i = sidebarServices.findIndex(
      (item) => item.query === query?.selected
    );

    if (i > -1) {
      setSection(i);
    }
  }, [query]);

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        additionalMetaTags={[
          {
            name: "dc:creator",
            content: "arridhow",
          },
        ]}
        openGraph={{
          url: seo.url,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: "/logo.png",
              alt: "Logo Image",
              type: "image/jpeg",
            },
            { url: "/logo.png" },
          ],
          site_name: "Rubic3",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/fav.svg",
          },
          {
            rel: "apple-touch-icon",
            href: "/fav.svg",
            sizes: "76x76",
          },
        ]}
      />
      <BoxMotion
        position="relative"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        h="full"
        w="full"
        initial={{ backgroundColor: sidebarServices[section].color }}
        animate={{
          backgroundColor: sidebarServices[section].color,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Header
          isLight={section != 2}
          contactMarginRight={marginRightContact}
          bg={sidebarServices[section].color}
          logo={sidebarServices[section].logo}
          isTransparent={false}
        />

        <BackToHome color={themeColor[+(section < 2)]} />

        {isLarge ? (
          <>
            <NavLef
              color={themeColor[+(section < 2)]}
              contents={sidebarServices}
              section={section}
              setSection={(section: number) => setSection(section)}
            />
            <Box display={showOnLarge} w="30%" />
          </>
        ) : (
          <LayoutGroup>
            <BoxMotion
              layout
              variants={animateTopToBottom}
              initial="initial"
              animate="animate"
              exit="exit"
              pl={marginX}
              position="fixed"
              pt={6}
              pb={2}
              bg={sidebarServices[section].color}
              left={0}
              top={20}
              zIndex={999}
              w="full"
              h={isShowFilter ? "full" : "unset"}
            >
              <BoxMotion layout>
                <Button
                  style={{ fontSize: "var(--chakra-fontSizes-xs)" }}
                  isLight={section < 2}
                  text={sidebarServices[section].name}
                  onClick={() => {
                    setIsShowFilter(!isShowFilter);
                  }}
                  arrowDown
                />
              </BoxMotion>
              <AnimatePresence>
                {isShowFilter && (
                  <BoxMotion
                    layout
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    variants={containerFilter}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    mt={3}
                    ml={5}
                    zIndex={1001}
                  >
                    {sidebarServices.map((item, i) => {
                      return (
                        <Box
                          key={i}
                          _hover={{ opacity: 0.6 }}
                          cursor="pointer"
                          onClick={() => {
                            setSection(i);
                            replace({
                              query: {
                                ...query,
                                selected: sidebarServices[i].query,
                              },
                            });
                            setIsShowFilter(false);
                          }}
                        >
                          <Text
                            as={motion.span}
                            variants={itemFilter}
                            fontSize="xs"
                            color={themeColor[+(section < 2)]}
                          >
                            {item.name}
                          </Text>
                        </Box>
                      );
                    })}
                  </BoxMotion>
                )}
              </AnimatePresence>
            </BoxMotion>
          </LayoutGroup>
        )}

        <AnimatePresence>
          {isShowFilter && (
            <BoxMotion
              w="100vw"
              h="100vh"
              position="fixed"
              top={0}
              left={0}
              zIndex={500}
              bg="dark"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.7,
                transition: { ease: "easeInOut", duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { ease: "easeInOut", duration: 0.5 },
              }}
            />
          )}
        </AnimatePresence>

        {section == 0 && (
          <Section1
            team={teamCreative["Creative"].filter(
              (leader: any) => leader.title_creative !== ""
            )}
            work={works["Creative"]}
          />
        )}

        {section == 1 && (
          <Section2
            team={teamHospitality["Hospitality"].filter(
              (leader: any) => leader.title_hospitality !== ""
            )}
            work={works["Hospitality"]}
          />
        )}

        {section == 2 && (
          <Section3
            team={team360["360 Digital"].filter(
              (leader: any) => leader.title_360 !== ""
            )}
            work={works["360 Digital"]}
          />
        )}

        <Footer
          isLight={section != 2}
          position={isLarge ? undefined : "relative"}
          backgroundColor={sidebarServices[section].color}
          hasBackground={isLarge}
        />
      </BoxMotion>
    </>
  );
}

export async function getStaticProps() {
  const resultLeaders = await getFullList({
    collection: "team",
    params: { sort: "order", expand: "filter" },
  });
  const resultWorks = await getFullList({
    collection: "works",
    params: { sort: "order", expand: "filters" },
  });

  const resHospitality = await getFullList({
    collection: "team",
    params: { sort: "order_hospitality", expand: "filter" },
  });
  const res360 = await getFullList({
    collection: "team",
    params: { sort: "order_360", expand: "filter" },
  });
  const resCreative = await getFullList({
    collection: "team",
    params: { sort: "order_creative", expand: "filter" },
  });

  const categorizedTeam = categoirzeTeam(resultLeaders);
  const categorizedWorks = categoirzeWorks(resultWorks);

  const categorizedHospitality = categoirzeTeam(resHospitality);
  const categorized360 = categoirzeTeam(res360);
  const categorizedCreative = categoirzeTeam(resCreative);

  return {
    props: {
      team: JSON.parse(JSON.stringify(categorizedTeam)),
      works: JSON.parse(JSON.stringify(categorizedWorks)),
      teamHospitality: JSON.parse(JSON.stringify(categorizedHospitality)),
      team360: JSON.parse(JSON.stringify(categorized360)),
      teamCreative: JSON.parse(JSON.stringify(categorizedCreative)),
    },
    revalidate: 2,
  };
}
