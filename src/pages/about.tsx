import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "swiper/css";
import Section1 from "../components/about/Section1";
import Section2 from "../components/about/Section2";
import Section3 from "../components/about/Section3";
import Section4 from "../components/about/Section4";
import Section5 from "../components/about/Section5";
import BackToHome from "../components/BackToHome";
import BoxMotion from "../components/BoxMotion";
import Button from "../components/Button";
import Footer from "../components/footer";
import Header from "../components/header";
import NavLef from "../components/NavLeft";
import { getFullList } from "../utils/api";
import {
  animateTopToBottom,
  containerFilter,
  itemFilter,
  marginRightContact,
  marginX,
  showOnLarge,
  sidebarAbout,
  themeColor,
} from "../utils/consts";

const itemBotToTop = (delay = 0) => ({
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const seo = {
  url: "https://rubic3.com/about",
  title: "About - Rubicube Group",
  description:
    "With a track record of 14 years, Our deep understanding of and research into the forces of digital disruption, coupled with the new thinking required to unlock growth provides excellence, long-lasting results.",
};

export default function About({
  clients,
  partners,
  associates,
  leaders,
  careers,
  partnersAssociations,
  clientTypes,
}: {
  clients: any;
  partners: any;
  associates: any;
  leaders: any;
  careers: any;
  partnersAssociations: any;
  clientTypes: any;
}) {
  const { push, query, replace } = useRouter();
  const [section, setSection] = useState(0);
  const [isEven, setIsEven] = useState(true);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    setIsEven(!!(section % 2));
  }, [section]);

  useEffect(() => {
    const i = sidebarAbout.findIndex((item) => item.query == query?.selected);

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
        minH="100vh"
        w="full"
        initial={{ backgroundColor: themeColor[0] }}
        animate={{
          backgroundColor: themeColor[+isEven],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Header
          isLight={!isEven}
          contactMarginRight={marginRightContact}
          isTransparent={false}
          bg={themeColor[+isEven]}
        />

        <BackToHome color={themeColor[+!isEven]} />

        {isLarge ? (
          <>
            <NavLef
              color={themeColor[+!isEven]}
              contents={sidebarAbout}
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
              bg={themeColor[+isEven]}
              left={0}
              top={16}
              zIndex={999}
              w="full"
              h={isShowFilter ? "full" : "unset"}
            >
              <BoxMotion layout>
                <Button
                  style={{ fontSize: "var(--chakra-fontSizes-xs)" }}
                  isLight={!isEven}
                  text={sidebarAbout[section].name}
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
                    {sidebarAbout.map((item, i) => {
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
                                selected: sidebarAbout[i].query,
                              },
                            });
                            setIsShowFilter(false);
                          }}
                        >
                          <Text
                            as={motion.span}
                            layout
                            variants={itemFilter}
                            fontSize="xs"
                            color={themeColor[+!isEven]}
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

        {section == 0 && <Section1 />}

        {section == 1 && (
          <Section2 partnersAssociations={partnersAssociations} />
        )}

        {section == 2 && <Section3 leaders={leaders} />}

        {section == 3 && (
          <Section4 clients={clients} clientTypes={clientTypes} />
        )}

        {section == 4 && <Section5 careers={careers} />}

        <Footer
          isLight={!isEven}
          position={isLarge || section === 4 ? undefined : "relative"}
        />
      </BoxMotion>
    </>
  );
}

export async function getStaticProps() {
  const resultsClients = await getFullList({
    collection: "clients_partners",
    params: { sort: "order" },
  });
  const resultLeaders = await getFullList({
    collection: "team",
    params: { sort: "order" },
  });
  const resultCareers = await getFullList({
    collection: "careers",
    params: { sort: "-created" },
  });
  const resultsPartnersAssociations = await getFullList({
    collection: "partners_associations",
    params: { sort: "order" },
  });

  const partners = resultsClients.filter((client) => client.type === "partner");
  const associates = resultsClients.filter(
    (client) => client.type === "associate"
  );
  const clients = resultsClients;
  const leaders = resultLeaders.filter((leader) => leader.title !== "");
  const careers = resultCareers;
  const partnersAssociations = resultsPartnersAssociations.reduce(
    (acc: any, curr: any) => {
      const { tag, ...rest } = curr;
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(rest);
      return acc;
    },
    {}
  );
  const clientTypes = resultsClients.map(({ type }: any) => type);

  const result = resultsClients.reduce((acc: any, obj: any) => {
    const type = obj.type;
    if (!acc[type]) {
      acc[type] = { type, data: [] };
    }
    acc[type].data.push(obj);
    return acc;
  }, {});

  const finalResult = Object.values(result);

  return {
    props: {
      partners: JSON.parse(JSON.stringify(partners)),
      clients: JSON.parse(JSON.stringify(clients)),
      clientTypes: JSON.parse(JSON.stringify(finalResult)),
      associates: JSON.parse(JSON.stringify(associates)),
      leaders: JSON.parse(JSON.stringify(leaders)),
      careers: JSON.parse(JSON.stringify(careers)),
      partnersAssociations: JSON.parse(JSON.stringify(partnersAssociations)),
    },
    revalidate: 2,
  };
}

const dataResult = [
  { tag: "", data: {} },
  { tag: "", data: {} },
  //...
];

const data = [
  {
    id: "eqgzov05pb6iorb",
    name: "Adhya Group",
    tag: "Our Partners",
  },
  {
    id: "o3lo42k5sacnva8",
    name: "Ria",
    tag: "Food & Beverage",
  },
  {
    id: "wh4xoed6p0zpptd",
    name: "Dextonindo Persada",
    tag: "Products & Services",
  },
  {
    id: "zr8q4ehza7x1blf",
    name: "Adhya Indo Jaya",
    tag: "Products & Services",
  },
];
