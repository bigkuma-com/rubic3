import { Box, Heading, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "swiper/css";
import IconClose from "../assets/js/IconClose";
import Section1 from "../components/about/Section1";
import Section2 from "../components/about/Section2";
import Section3 from "../components/about/Section3";
import Section4 from "../components/about/Section4";
import Section5 from "../components/about/Section5";
import BackToHome from "../components/BackToHome";
import BoxMotion from "../components/BoxMotion";
import Footer from "../components/footer";
import Header from "../components/header";
import NavLef from "../components/NavLeft";
import { getFullList } from "../utils/api";
import {
  animateOpacity,
  animateScaling,
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
}: {
  clients: any;
  partners: any;
  associates: any;
  leaders: any;
  careers: any;
  partnersAssociations: any;
}) {
  const { push, query, replace } = useRouter();
  const [section, setSection] = useState(0);
  const [isEven, setIsEven] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(-1);

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    setIsEven(!!(section % 2));
    section !== 4 && setSelectedCareer(-1);
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
        h="full"
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
        <Header isLight={!isEven} />

        <BackToHome color={themeColor[+!isEven]} />

        <NavLef
          color={themeColor[+!isEven]}
          contents={sidebarAbout}
          section={section}
          setSection={(section: number) => setSection(section)}
        />
        <Box w="30%" />

        {section == 0 && <Section1 />}

        {section == 1 && (
          <Section2 partnersAssociations={partnersAssociations} />
        )}

        {section == 2 && <Section3 leaders={leaders} />}

        {section == 3 && (
          <Section4 clients={clients} />
        )}

        {section == 4 && (
          <Section5
            careers={careers}
            setSelectedCareer={(selectedCareer: number) =>
              setSelectedCareer(selectedCareer)
            }
          />
        )}

        <AnimatePresence>
          {selectedCareer > -1 && (
            <BoxMotion
              variants={animateOpacity}
              initial="initial"
              animate="animate"
              exit="exit"
              position="fixed"
              top={0}
              left={0}
              w="100vw"
              h="100vh"
              bg="blackAlpha.900"
              zIndex={1500}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <BoxMotion
                variants={animateScaling}
                initial="initial"
                animate="animate"
                exit="exit"
                w="80%"
                h="80%"
                bg="light"
                position="relative"
                p={[8, null, null, 12]}
              >
                <Box
                  position="absolute"
                  top={6}
                  right={6}
                  cursor="pointer"
                  onClick={() => {
                    setSelectedCareer(-1);
                  }}
                >
                  <IconClose />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  w="full"
                  h="full"
                  overflowY="scroll"
                >
                  <Heading w="70%" mb={[2, 4, 6]} as="h2" color="dark">
                    Careers
                  </Heading>
                  <Text w={{ base: "full", lg: "70%" }} fontSize="sm">
                    <Text as="span" color="dark">
                      We work best with like-minded partners who are creatively
                      and culturally ambitious— open to pushing the limits and
                      possibilities of design. Let’s make something great
                      together. Send your resume and portfolio (not bigger than
                      5 MB) to{" "}
                    </Text>
                    <Link
                      as="span"
                      className="opacity-100"
                      cursor="pointer"
                      color="dark"
                      onClick={() =>
                        window.open("mailto:career@rubic3.com", "_blank")
                      }
                    >
                      career@rubic3.com
                    </Link>
                  </Text>

                  <Box>
                    <Box my={8} opacity={0.2} bg="dark" w="full" h="1px" />
                  </Box>

                  <Heading mb={[2, 4, 6]} as="h3" color="dark">
                    {careers[selectedCareer].title}
                  </Heading>
                  <Text color="dark" whiteSpace="pre-line">
                    {careers[selectedCareer].description}
                  </Text>

                  <Box>
                    <Box my={8} opacity={0.2} bg="dark" w="full" h="1px" />
                  </Box>
                </Box>
              </BoxMotion>
            </BoxMotion>
          )}
        </AnimatePresence>

        <Footer isLight={!isEven} />
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
    collection: "leaderships",
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
  const leaders = resultLeaders;
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

  return {
    props: {
      partners: JSON.parse(JSON.stringify(partners)),
      clients: JSON.parse(JSON.stringify(clients)),
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
