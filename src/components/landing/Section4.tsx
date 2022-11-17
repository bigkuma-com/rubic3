import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import IconEmailSm from "../../assets/js/IconEmailSm";
import IconFacebookSm from "../../assets/js/IconFacebookSm";
import IconInstagramSm from "../../assets/js/IconInstagramSm";
import IconWhatsappSm from "../../assets/js/IconWhatsappSm";
import Button from "../Button";
import RunningText from "./Runningtext";

export default function Section4() {
  return (
    <Box
      h="100vh"
      w="full"
      bg="dark"
      display="flex"
      alignItems="center"
      px="8%"
      position="relative"
    >
      <Box
        display="flex"
        flexDir="column"
        gap={8}
        w="full"
        mr="25%"
        color={"white"}
        zIndex={5}
      >
        <Box display="flex">
          {contents.address.map(({ name, description }, i) => {
            return (
              <Box key={i} w="30%" lineHeight="1">
                <Heading fontSize="md" mb={2}>
                  {name}
                </Heading>
                <Link fontSize="small" opacity={0.6}>
                  {description}
                </Link>
              </Box>
            );
          })}
          <Box w="40%" />
        </Box>

        <Divider />

        <Text fontSize="x-small" letterSpacing="widest">
          Marketing Representative
        </Text>

        <Box display="flex">
          {contents.contacts.map(
            ({ email, facebook, instagram, location, name, whatsapp }, i) => {
              return (
                <Box key={i} w="30%">
                  <Heading fontSize="md" mb={2}>
                    {location}
                  </Heading>
                  <Box fontSize="small">
                    <span>: : {name}</span>
                    <Box opacity={0.6}>
                      <Link display="flex" gap={1} alignItems="center">
                        <IconWhatsappSm />
                        {whatsapp}
                      </Link>
                      <Link display="flex" gap={1} alignItems="center">
                        <IconEmailSm />
                        {email}
                      </Link>
                      <Link display="flex" gap={1} alignItems="center">
                        <IconInstagramSm />
                        {instagram}
                      </Link>
                      <Link display="flex" gap={1} alignItems="center">
                        <IconFacebookSm />
                        {facebook}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              );
            }
          )}
          <Box w="10%" />
        </Box>

        <Divider />

        <Box>
          <Button text={"Contact us"} />
        </Box>
      </Box>
      <RunningText
        text={
          <span>
            Add<span style={{ color: "white" }}>r</span>ess
          </span>
        }
      />
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
