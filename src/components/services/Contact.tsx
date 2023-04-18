import { Box, Link, Text } from "@chakra-ui/react";
import IconEmailSm from "../../assets/js/IconEmailSm";
import IconFacebookSm from "../../assets/js/IconFacebookSm";
import IconInstagramSm from "../../assets/js/IconInstagramSm";
import IconWhatsappSm from "../../assets/js/IconWhatsappSm";
import { itemBotToTop } from "../../utils/consts";
import BoxMotion from "../BoxMotion";
import Divider from "../Divider";

export default function Contacts({
  contacts,
  color = "light",
}: {
  contacts: any;
  color?: string;
}) {
  return (
    <>
      <Divider text="Contact" mb={10} lineOpacity={0.2} color={color} />

      <BoxMotion
        variants={itemBotToTop(0.2)}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        w="full"
        zIndex={6}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: 2, lg: 16 }}
          color={color}
        >
          {contacts.map(
            (
              {
                email,
                facebook,
                instagram,
                location,
                name,
                whatsapp,
                address,
              }: any,
              i: number
            ) => {
              return (
                <Box
                  key={i}
                  w={{ base: "full", lg: "fit-content" }}
                  mb={{ base: i === 2 ? 0 : "10%", lg: 0 }}
                >
                  <Text fontWeight={500} fontSize="md" mb={3} color="inherit">
                    {location}
                  </Text>
                  <Box fontSize="sm" fontWeight="light" opacity={0.6}>
                    <Text color="inherit">{address}</Text>

                    <Box
                      bg={color === "light" ? "light" : "dark"}
                      h="2px"
                      w={10}
                      opacity={0.4}
                      mt={8}
                      mb={{ base: 3, lg: 5 }}
                    />

                    <Box color="inherit">
                      <Link
                        display="flex"
                        gap={3}
                        alignItems="center"
                        href={whatsapp.url}
                        isExternal
                      >
                        <IconWhatsappSm />
                        {whatsapp.name}
                      </Link>
                      <Link
                        display="flex"
                        gap={3}
                        alignItems="center"
                        href={`mailto:${email}`}
                        isExternal
                      >
                        <IconEmailSm />
                        {email}
                      </Link>
                      <Link
                        display="flex"
                        gap={3}
                        alignItems="center"
                        href={instagram.url}
                        isExternal
                      >
                        <IconInstagramSm />
                        {instagram.name}
                      </Link>
                      <Link
                        display="flex"
                        gap={3}
                        alignItems="center"
                        href={facebook.url}
                        isExternal
                      >
                        <IconFacebookSm />
                        {facebook.name}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              );
            }
          )}
        </Box>
      </BoxMotion>
    </>
  );
}
