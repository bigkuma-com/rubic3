import { Box, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import IconEmailSm from "../assets/js/IconEmailSm";
import IconFacebookSm from "../assets/js/IconFacebookSm";
import IconInstagramSm from "../assets/js/IconInstagramSm";
import IconWhatsappSm from "../assets/js/IconWhatsappSm";
import BoxMotion from "./BoxMotion";
import Button from "./Button";

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

export default function Contacts({
  hasContactButton = false,
}: {
  hasContactButton?: boolean;
}) {
  const { push } = useRouter();

  return (
    <Box display="flex" flexDir="column" gap={10}>
      <Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={4}>
        {contents.map((content, j) => {
          return (
            <Fragment key={j}>
              <Box
                key={j}
                display="flex"
                flexDir="column"
                gap={7}
                w="full"
                color={"white"}
                zIndex={5}
              >
                <BoxMotion
                  variants={itemBotToTop(0.2 * j)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                >
                  <Heading fontSize="xl">{content.name}</Heading>
                  <Box
                    bg="light"
                    h="2px"
                    w={10}
                    opacity={0.4}
                    mt={8}
                    mb={{ base: 3, lg: 5 }}
                  />

                  <Box
                    display="flex"
                    flexWrap="wrap"
                    flexDir={{ base: "column", lg: "row" }}
                    gap={{ base: 2, lg: 16 }}
                  >
                    {content.contacts.map(
                      (
                        {
                          email,
                          facebook,
                          instagram,
                          location,
                          name,
                          whatsapp,
                          address,
                        },
                        i
                      ) => {
                        return (
                          <Box
                            key={i}
                            w={{ base: "full", lg: "fit-content" }}
                            mb={{ base: i === 2 ? 0 : "10%", lg: 0 }}
                          >
                            <Heading fontSize="lg" mb={3} opacity={0.6}>
                              {location}
                            </Heading>
                            <Box fontSize="sm" fontWeight="light" opacity={0.6}>
                              <Link href="#">{address}</Link>

                              <Box
                                bg="light"
                                h="2px"
                                w={10}
                                opacity={0.4}
                                mt={8}
                                mb={{ base: 3, lg: 5 }}
                              />

                              <Box>
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
              </Box>

              {j < contents.length - 1 && (
                <Box w="2px" bg="light" opacity={0.4} mr={6} />
              )}
            </Fragment>
          );
        })}
      </Box>

      {hasContactButton && (
        <>
          <BoxMotion
            variants={itemBotToTop(0.6)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false }}
          >
            <Button
              text={"Contact us"}
              onClick={() => {
                push("/contact");
              }}
            />
          </BoxMotion>
        </>
      )}
    </Box>
  );
}

const contents = [
  {
    name: "Rubicube Creative | 360 Digital",
    address: [
      {
        name: "Singapore",
        description: (
          <>
            160 Robinson Road #14-04
            <br />
            Singapore Business Federation Centre
            <br />
            Singapore 068914
          </>
        ),
      },
      {
        name: "Indonesia",
        description: (
          <>
            Mall of Indonesia
            <br />
            Frenchwalk Blok G/03, Kelapa Gading
            <br />
            Jakarta Utara 14240
          </>
        ),
      },
    ],
    contacts: [
      {
        location: "Singapore",
        name: "Head Quarter",
        whatsapp: { name: "+65.8498.1278", url: "https://wa.me/6584981278" },
        email: "info.sg@rubic3.com",
        instagram: {
          name: "rubicubecreative.sg",
          url: "https://www.instagram.com/rubicubecreative.sg/",
        },
        facebook: {
          name: "rubicube creative singapore",
          url: "https://facebook.com/rubicubecreative/",
        },
        address: (
          <>
            160 Robinson Road #14-04
            <br />
            Singapore Business Federation Centre
            <br />
            Singapore 068914
          </>
        ),
      },
      {
        location: "Indonesia",
        name: "Office & Studio",
        whatsapp: {
          name: "+62.812.9292.6551",
          url: "https://wa.me/6281292926551",
        },
        email: "info@rubic3.com",
        instagram: {
          name: "rubicubecreative.id",
          url: "https://www.instagram.com/rubicubecreative.id/",
        },
        facebook: {
          name: "rubicube creative indonesia",
          url: "https://facebook.com/rubicubecreative/",
        },
        address: (
          <>
            Mall of Indonesia
            <br />
            Frenchwalk Blok G/03, Kelapa Gading
            <br />
            Jakarta Utara 14240
          </>
        ),
      },
    ],
  },

  {
    name: "Rubicube Hospitality",
    address: [
      {
        name: "Singapore",
        description: (
          <>
            60 Paya Lebar Road #11-26
            <br />
            Paya Lebar Square
            <br />
            Singapore 409051
          </>
        ),
      },
    ],
    contacts: [
      {
        location: "Singapore",
        name: "Head Quarter",
        whatsapp: { name: "+65.8498.1278", url: "https://wa.me/6584981278" },
        email: "info.sg@rubic3.com",
        instagram: {
          name: "rubicubehospitality",
          url: "https://www.instagram.com/rubicubehospitality/",
        },
        facebook: {
          name: "rubicube hospitality sg",
          url: "https://facebook.com/rubicubehospitalitysg/",
        },
        address: (
          <>
            60 Paya Lebar Road #11-26
            <br />
            Paya Lebar Square
            <br />
            Singapore 409051
          </>
        ),
      },
    ],
  },
];
