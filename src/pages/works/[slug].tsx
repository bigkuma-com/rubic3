import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../../assets/js/ArrowLeftSm";
import ArrowRightSm from "../../assets/js/ArrowRightSm";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { findOne, getFullList, getImage, getList } from "../../utils/api";
import { marginX } from "../../utils/consts";

export default function Work({ work, others }: any) {
  const { push } = useRouter();

  const { name, description_long, services } = work;

  console.log(others);

  return (
    <Box bg="dark" w="full" h="100vh">
      <Header />
      <Box
        position="fixed"
        top="50%"
        left="5%"
        transform="translate(-50%, -50%)"
        zIndex={50}
        color="light"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          cursor="pointer"
          color="inherit"
          onClick={() => push("/works")}
        >
          <Text
            color="inherit"
            as="span"
            style={{
              writingMode: "vertical-lr",
              transform: "rotate(-180deg)",
            }}
            fontSize="small"
            letterSpacing="wider"
            fontWeight={400}
          >
            Back to Works
          </Text>
          <ArrowLeftSm />
        </Box>
      </Box>

      <Box
        position="fixed"
        left={0}
        top={0}
        w="33%"
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pl="10%"
        pr="5%"
        color="light"
      >
        <Heading as="h1" mb={6}>
          {name}
        </Heading>
        <Box maxH="40%" overflowY="scroll" mb={6}>
          <Text fontSize="small" opacity={0.6} whiteSpace="pre-line">
            {description_long}
          </Text>
        </Box>
        <Text as="h5" fontSize="small" fontWeight={500}>
          Services
        </Text>
        <Text fontSize="small" opacity={0.6}>
          {services.join(", ")}
        </Text>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          cursor="pointer"
          color="inherit"
          onClick={() => push("/works")}
          position="absolute"
          bottom={"15%"}
        >
          <Text
            color="inherit"
            as="span"
            fontSize="small"
            letterSpacing="wider"
          >
            Scroll to discover
          </Text>
          <ArrowRightSm />
        </Box>
      </Box>

      <Box display="flex">
        <Box w="33%" />
        <Box w="67%" h="100vh" position="relative">
          <Swiper
            slidesPerView={"auto"}
            mousewheel={true}
            modules={[Mousewheel, Pagination]}
          >
            {work.showcases.map((showcase: string, i: any) => {
              return (
                <SwiperSlide key={i} style={{ width: "85%" }}>
                  <Box
                    position="relative"
                    w="100%"
                    h="100vh"
                    display="inline-block"
                  >
                    <Image
                      src={getImage({
                        collectionName: work.collectionName,
                        recordId: work.id,
                        filename: showcase,
                      })}
                      alt={showcase}
                      fill
                      placeholder="blur"
                      blurDataURL={`/_next/image?url=${getImage({
                        collectionName: work.collectionName,
                        recordId: work.id,
                        filename: showcase,
                      })}&w=16&q=1`}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
            <SwiperSlide style={{ width: "50%" }}>
              <Box
                h="full"
                w="full"
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pl={16}
              >
                <Text mb={6}>Other Works</Text>
                <Box display="flex" flexDirection="column" gap={7}>
                  {others.map((other: any, i: any) => {
                    console.log(
                      getImage({
                        collectionName: other.collectionName,
                        recordId: other.id,
                        filename: other.showcase,
                      })
                    );
                    return (
                      <Box
                        key={i}
                        cursor="pointer"
                        onClick={() => {
                          push(`/works/${other.slug}`);
                        }}
                      >
                        <Box position="relative" w="60%" h="25vmin" mb={2}>
                          <Image
                            src={getImage({
                              collectionName: other.collectionName,
                              recordId: other.id,
                              filename: other.thumbnail,
                            })}
                            alt={other.name}
                            fill
                            placeholder="blur"
                            blurDataURL={`/_next/image?url=${getImage({
                              collectionName: other.collectionName,
                              recordId: other.id,
                              filename: other.thumbnail,
                            })}&w=16&q=1`}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                            }}
                          />
                        </Box>
                        <Text opacity={0.7} fontSize="sm">
                          {other.name}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  position="absolute"
                  top="50%"
                  right={marginX}
                  transform="translate(-50%, -50%)"
                  zIndex={50}
                  color="light"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    cursor="pointer"
                    color="inherit"
                    onClick={() => push(`/works/${others[0].slug}`)}
                  >
                    <Text
                      color="inherit"
                      as="span"
                      style={{
                        writingMode: "vertical-lr",
                        transform: "rotate(0deg)",
                      }}
                      fontSize="small"
                      letterSpacing="wider"
                      fontWeight={400}
                    >
                      Next Works
                    </Text>
                    <ArrowRightSm />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export async function getStaticProps({ params }: any) {
  const work = await findOne({
    collection: "works",
    keyword: `slug="${params.slug}"`,
  });

  const others = await getList({
    collection: "works",
    perPage: 2,
    params: { filter: `(id != '${work.id}')` },
  });

  return {
    props: {
      work: JSON.parse(JSON.stringify(work)),
      others: JSON.parse(JSON.stringify(others)).items,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await getFullList({
    collection: "works",
  });

  const paths = res.map(({ slug, id }: any) => {
    return { params: { slug, id } };
  });

  return { paths, fallback: "blocking" };
}
