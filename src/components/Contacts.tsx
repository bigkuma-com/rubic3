import { Box, Divider, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
    <Box
      display="flex"
      flexDir="column"
      gap={7}
      w="full"
      color={"white"}
      zIndex={5}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "10%", lg: "min(15%, 2rem)" }}
      >
        {contents.contacts.map(
          (
            { email, facebook, instagram, location, name, whatsapp, address },
            i
          ) => {
            return (
              <BoxMotion
                variants={itemBotToTop(i * 0.2)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
                key={i}
                w={{ base: "full", lg: "33%" }}
                mb={{ base: i === 2 ? 0 : "10%", lg: 0 }}
              >
                <Heading fontSize="lg" mb={3}>
                  {location}
                </Heading>
                <Box fontSize="sm" fontWeight="light" opacity={0.6}>
                  {/* <span>: : {name}</span> */}
                  <Link href="#">{address}</Link>

                  <Box
                    bg="light"
                    h={0.1}
                    w={10}
                    opacity={0.5}
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
              </BoxMotion>
            );
          }
        )}
      </Box>

      {hasContactButton && (
        <>
          <Divider />

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

const contents = {
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
};
