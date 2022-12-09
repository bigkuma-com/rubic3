import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import ArrowLeftSm from "../../assets/js/ArrowLeftSm";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { findOne, getFullList, getImage } from "../../utils/api";

export default function Work({ work }: any) {
  const { push } = useRouter();

  const { name, description_long } = work;

  console.log(work);

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
        w="35%"
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pl="10%"
        pr="5%"
        color="light"
      >
        <Heading mb={5}>{name}</Heading>
        <Text fontSize="small" opacity={0.6}>
          {description_long}
        </Text>
      </Box>

      <Box display="flex">
        <Box w="35%" />
        <Box
          w="75%"
          h="full"
          whiteSpace="nowrap"
          overflowX="scroll"
          overflowY="hidden"
        >
          {work.showcases.map((showcase: string, i: any) => {
            console.log(
              getImage({
                collectionName: work.collectionName,
                recordId: work.id,
                filename: showcase,
              })
            );
            return (
              <Box
                position="relative"
                w="700px"
                h="100vh"
                display="inline-block"
                key={i}
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
                    objectFit: "contain",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export async function getStaticProps({ params }: any) {
  const res = await findOne({
    collection: "works",
    keyword: `slug="${params.slug}"`,
  });

  return {
    props: {
      work: JSON.parse(JSON.stringify(res)),
    },
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
