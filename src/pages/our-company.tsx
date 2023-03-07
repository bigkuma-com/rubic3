import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import LogoRubicGroup from "../assets/js/LogoRubicGroup";
import LogoRubicubeConnoisseur from "../assets/js/LogoRubicubeConnoisseur";
import LogoRubicubeHospitality from "../assets/js/LogoRubicubeHospitality";
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
import { arrayChunk } from "../utils/functions";

const seo = {
  url: "https://rubic3.com/our-company",
  title: "Our Company - Rubicube Group",
  description: "What we do.",
};

export default function OurCompany({
  clients,
  partners,
  associates,
  leaders,
  careers,
}: {
  clients: any;
  partners: any;
  associates: any;
  leaders: any;
  careers: any;
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
          <BoxMotion
            variants={animateTopToBottom}
            initial="initial"
            animate="animate"
            exit="exit"
            pl={marginX}
            position="absolute"
            left={0}
            top={24}
            zIndex={999}
          >
            <BoxMotion>
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
              bg="black"
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

        {section == 1 && <Section2 />}

        {section == 2 && <Section3 />}

        <Footer
          isLight={section != 2}
          position={isLarge ? undefined : "relative"}
        />
      </BoxMotion>
    </>
  );
}

const serviceLogos = [
  <LogoRubicGroup key={1} />,
  <LogoRubicubeHospitality key={2} />,
  <LogoRubicubeConnoisseur key={3} />,
  <LogoRubicGroup key={4} />,
];

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

  const partners = resultsClients.filter((client) => client.type === "partner");
  const associates = resultsClients.filter(
    (client) => client.type === "associate"
  );
  const clients = resultsClients.filter((client) => client.type === "client");

  const leaders = arrayChunk(resultLeaders, 4);
  const careers = arrayChunk(resultCareers, 3);

  return {
    props: {
      partners: JSON.parse(JSON.stringify(partners)),
      clients: JSON.parse(JSON.stringify(clients)),
      associates: JSON.parse(JSON.stringify(associates)),
      leaders: JSON.parse(JSON.stringify(leaders)),
      careers: JSON.parse(JSON.stringify(careers)),
    },
    revalidate: 2,
  };
}
