import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import IconEmailSm from "../assets/js/IconEmailSm";
import IconFacebookSm from "../assets/js/IconFacebookSm";
import IconInstagramSm from "../assets/js/IconInstagramSm";
import IconWhatsappSm from "../assets/js/IconWhatsappSm";
import { showOnLarge } from "../utils/consts";
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
      gap={8}
      w="full"
      color={"white"}
      zIndex={5}
    >
      <Box display="flex" gap={{ base: "10%", lg: 0 }}>
        {contents.address.map(({ name, description }, i) => {
          return (
            <BoxMotion
              variants={itemBotToTop(i * 0.2)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false }}
              key={i}
              w={{ base: "45%", lg: "30%" }}
              lineHeight="1"
            >
              <Heading fontSize="md" mb={2} as="h4">
                {name}
              </Heading>

              <Link fontSize="small" opacity={0.6}>
                {description}
              </Link>
            </BoxMotion>
          );
        })}
        <Box display={showOnLarge} w="40%" />
      </Box>

      <Divider />

      <Text
        fontSize="x-small"
        letterSpacing="widest"
        as={motion.h3}
        variants={itemBotToTop(0)}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
      >
        Marketing Representative
      </Text>

      <Box display="flex" flexWrap="wrap" gap={{ base: "10%", lg: 0 }}>
        {contents.contacts.map(
          ({ email, facebook, instagram, location, name, whatsapp }, i) => {
            return (
              <BoxMotion
                variants={itemBotToTop(i * 0.2)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
                key={i}
                w={{ base: "45%", lg: "30%" }}
                mb={{ base: i === 2 ? 0 : "10%", lg: 0 }}
              >
                <Heading fontSize="md" mb={2}>
                  {location}
                </Heading>
                <Box fontSize="small">
                  <span>: : {name}</span>
                  <Box opacity={0.6}>
                    <Link display="flex" gap={2} alignItems="center">
                      <IconWhatsappSm />
                      {whatsapp}
                    </Link>
                    <Link display="flex" gap={2} alignItems="center">
                      <IconEmailSm />
                      {email}
                    </Link>
                    <Link display="flex" gap={2} alignItems="center">
                      <IconInstagramSm />
                      {instagram}
                    </Link>
                    <Link display="flex" gap={2} alignItems="center">
                      <IconFacebookSm />
                      {facebook}
                    </Link>
                  </Box>
                </Box>
              </BoxMotion>
            );
          }
        )}
        <Box display={showOnLarge} w="10%" />
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
      whatsapp: "+65.8498.1278",
      email: "info.sg@rubic3.com",
      instagram: "rubicubecreative.sg",
      facebook: "rubicube creative singapore",
    },
    {
      location: "Indonesia",
      name: "Office & Studio",
      whatsapp: "+62.812.9292.6551",
      email: "info@rubic3.com",
      instagram: "rubicubecreative.id",
      facebook: "rubicube creative indonesia",
    },
    {
      location: "Malaysia",
      name: "Office",
      whatsapp: "+60.12.653.7424",
      email: "info.my@rubic3.com",
      instagram: "rubicubecreative.my",
      facebook: "rubicube creative malaysia",
    },
  ],
};
