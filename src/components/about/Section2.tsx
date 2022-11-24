import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import { getImage } from "../../utils/api";

[
  {
    collectionId: "orq6ya3li8i6stt",
    collectionName: "clients_partners",
    created: "2022-11-24 08:29:38.904Z",
    id: "g1dw6sk5ogt9npv",
    logo: "telkom_indonesia_logo_rTeuKMxhvj.webp",
    name: "Telkom",
    order: 103,
    type: "client",
    updated: "2022-11-24 08:31:23.199Z",
    expand: {},
  },
  {
    collectionId: "orq6ya3li8i6stt",
    collectionName: "clients_partners",
    created: "2022-11-24 08:29:15.085Z",
    id: "s35ayb7romwp0ke",
    logo: "samuel_sekuritas_indonesia_logo_Px7zi11ZaX.webp",
    name: "Samuel",
    order: 102,
    type: "client",
    updated: "2022-11-24 08:31:20.214Z",
    expand: {},
  },
  {
    collectionId: "orq6ya3li8i6stt",
    collectionName: "clients_partners",
    created: "2022-11-24 08:28:28.960Z",
    id: "e1ibh2gdal1jum6",
    logo: "paramount_logo_AyUPDq2vlg.webp",
    name: "Paramount",
    order: 101,
    type: "client",
    updated: "2022-11-24 08:31:17.096Z",
    expand: {},
  },
];

export default function Section2({ clients }: { clients: any }) {
  console.log(clients);
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      pl="10%"
      pr="16%"
      py="10%"
    >
      <Box display="flex" flexDirection="column" w="full">
        <Heading mb={6} color="dark">
          Our Major Clients
        </Heading>

        <SimpleGrid columns={6} spacing={5}>
          {clients.map(({ collectionName, id, logo, name, order }: any) => {
            return (
              <Box key="id" position="relative" h="100" w="full">
                <Image
                  src={getImage({
                    collectionName,
                    recordId: id,
                    filename: logo,
                  })}
                  alt={name}
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "center center",
                  }}
                />
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
