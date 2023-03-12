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

export default function OurCompany({ team, works }: { team: any; works: any }) {
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

  console.log("works", works);

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
              py={2}
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
          <Section1 team={team["Creative"]} work={works["Creative"]} />
        )}

        {section == 1 && (
          <Section2 team={team["Hospitality"]} work={works["Hospitality"]} />
        )}

        {section == 2 && (
          <Section3 team={team["360 Digital"]} work={works["360 Digital"]} />
        )}

        <Footer
          isLight={section != 2}
          position={isLarge ? undefined : "relative"}
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

  console.log("resultWorks", resultWorks);

  const categorizedTeam = categoirzeTeam(resultLeaders);
  const categorizedWorks = categoirzeWorks(resultWorks);

  return {
    props: {
      team: JSON.parse(JSON.stringify(categorizedTeam)),
      works: JSON.parse(JSON.stringify(categorizedWorks)),
    },
    revalidate: 2,
  };
}
