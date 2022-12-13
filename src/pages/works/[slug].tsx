import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftSm from "../../assets/js/ArrowLeftSm";
import ArrowRightSm from "../../assets/js/ArrowRightSm";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { findOne, getFullList, getImage } from "../../utils/api";
import { marginX, showOnLarge } from "../../utils/consts";

export default function Work({ work }: any) {
  const { push } = useRouter();

  const [isLarge] = useMediaQuery("(min-width: 991px)", {
    ssr: true,
    fallback: false,
  });

  const { name, description_long, services, expand } = work;
  const { next_work, other_works } = expand;

  return (
    <Box bg="dark" w="full" h={{ base: "full", lg: "100vh" }}>
      <Header />
      <Box
        display={showOnLarge}
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
        position={{ base: "relative", lg: "fixed" }}
        left={0}
        top={0}
        w={{ base: "full", lg: "33%" }}
        h={{ base: "full", lg: "100vh" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pl={[5, 6, 10, "10%"]}
        pr={[5, 6, 10, "5%"]}
        pt={{ base: 28, lg: 0 }}
        color="light"
      >
        <Heading as="h1" mb={[2, 3, 4, 6]}>
          {name}
        </Heading>
        <Box maxH={{ base: "full", lg: "40%" }} overflowY="scroll" mb={[6]}>
          <Text fontSize="small" opacity={0.6} whiteSpace="pre-line">
            {description_long}
          </Text>
        </Box>
        <Text as="h5" fontSize="small" fontWeight={500}>
          Services
        </Text>
        <Text fontSize="small" opacity={0.6} mb={{ base: 8, lg: 0 }}>
          {services.join(", ")}
        </Text>

        <Box
          display={{ base: "none", lg: "flex" }}
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

      {isLarge ? (
        <Box display="flex">
          <Box w="33%" display={showOnLarge} />
          <Box
            w={{ base: "full", lg: "67%" }}
            h={{ base: "full", lg: "100vh" }}
            position="relative"
          >
            <Swiper
              slidesPerView={"auto"}
              mousewheel={true}
              modules={[Mousewheel, Pagination]}
            >
              {work.showcases.map((showcase: string, i: any) => {
                return (
                  <SwiperSlide
                    key={i}
                    style={{ width: isLarge ? "85%" : "100%" }}
                  >
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
                  <Text mb={[2, 3, 4, 6]}>Other Works</Text>
                  <Box display="flex" flexDirection="column" gap={7}>
                    {other_works.map((other: any, i: any) => {
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
                      onClick={() => push(`/works/${next_work.slug}`)}
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
      ) : (
        <Box display="flex" flexDirection="column">
          {work.showcases.map((showcase: string, i: any) => {
            return (
              <Box
                key={i}
                position="relative"
                w="100vw"
                h="100vw"
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
            );
          })}
          <Box
            h="full"
            w="full"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pl={[5, 6, 10, 16]}
            pr={[5, 6, 10, 0]}
            mt={[6, 6, 6, 0]}
            mb={[14, 14, 14, 0]}
          >
            <Text mb={[2, 3, 4, 6]}>Other Works</Text>
            <Box
              display="flex"
              flexDirection={{ base: "row", lg: "column" }}
              gap={7}
            >
              {other_works.map((other: any, i: any) => {
                return (
                  <Box
                    w={{ base: "full", lg: "unset" }}
                    key={i}
                    cursor="pointer"
                    onClick={() => {
                      push(`/works/${other.slug}`);
                    }}
                  >
                    <Box
                      position="relative"
                      w={{ base: "full", lg: "60%" }}
                      h={{ base: "20vh", lg: "25vmin" }}
                      mb={2}
                    >
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
                display={{ base: "none", lg: "flex" }}
                flexDirection="column"
                alignItems="center"
                gap={2}
                cursor="pointer"
                color="inherit"
                onClick={() => push(`/works/${next_work.slug}`)}
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
        </Box>
      )}
      <Footer />
    </Box>
  );
}

export async function getStaticProps({ params }: any) {
  const work = await findOne({
    collection: "works",
    keyword: `slug="${params.slug}"`,
    params: { expand: "other_works, next_work" },
  });

  return {
    props: {
      work: JSON.parse(JSON.stringify(work)),
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
