import {
  Box,
  Checkbox,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import BoxMotion from "../components/BoxMotion";
import Button from "../components/Button";
import Contacts from "../components/Contacts";
import Footer from "../components/footer";
import Header from "../components/header";
import { postOne } from "../utils/api";
import {
  animateOpacityHalf,
  animateScaling,
  itemBotToTop,
  phoneRegExp,
} from "../utils/consts";

const seo = {
  url: "https://rubic3.com/contact",
  title: "Contact Us - Rubicube Group",
  description: "Hello! You can drop us a message.",
};

export default function Contact() {
  const { reload } = useRouter();

  const [activeInquiry, setActiveInquity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      subscribe: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5)
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      company: Yup.string(),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      message: Yup.string(),
      subscribe: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setIsPopOpen(true);

      const data = {
        ...values,
        type: activeInquiry === 1 ? "Project" : "General",
      };

      postOne({ collection: "contacts", data }).then((res) => {
        setIsLoading(false);
        setTimeout(() => {
          reload();
        }, 3000);
      });
    },
  });

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
      <Box position="relative" bg="dark">
        <Header isTransparent={true} />

        <AnimatePresence>
          {isPopOpen && (
            <BoxMotion
              position="fixed"
              top={0}
              left={0}
              bg="rgba(20, 19, 20, 0.6)"
              w="100vw"
              h="100vh"
              zIndex={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
              key="bg-pop-contact"
              variants={animateOpacityHalf}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BoxMotion
                bg="light"
                p={14}
                color="dark"
                maxW="min(500px, 85vw)"
                key="content-pop-contact"
                variants={animateScaling}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                {isLoading ? (
                  <Spinner color="dark" size="xl" />
                ) : (
                  <>
                    <Heading color="inherit" mb={8}>
                      Thank you for getting in touch!
                    </Heading>
                    <Text color="inherit" whiteSpace="pre-line" w="80%">
                      We’ll get back to you very soon
                    </Text>
                  </>
                )}
              </BoxMotion>
            </BoxMotion>
          )}
        </AnimatePresence>

        <Box
          px={[5, 6, 10, "12%"]}
          py={[28, null, null, "12%"]}
          w="full"
          minH="100vh"
        >
          <Heading
            fontSize="3xl"
            mb={[8, null, null, 10]}
            as={motion.h1}
            variants={itemBotToTop(0)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false }}
          >
            Hello! You can drop us a message.
          </Heading>

          <Box display="flex" flexDirection={{ base: "column", lg: "row" }}>
            <BoxMotion
              variants={itemBotToTop(0.2)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false }}
              w={{ base: "full", lg: "20%" }}
              mb={[4, null, null, 0]}
            >
              <Box
                display="flex"
                flexDirection={{ base: "row", lg: "column" }}
                gap={3}
                w="fit-content"
              >
                <Button
                  text="General inquiry"
                  withIcon={false}
                  px={6}
                  py={5}
                  isActive={activeInquiry === 0}
                  onClick={() => {
                    setActiveInquity(0);
                  }}
                />
                <Button
                  text="Project inquiry"
                  withIcon={false}
                  px={6}
                  py={5}
                  isActive={activeInquiry === 1}
                  onClick={() => {
                    setActiveInquity(1);
                  }}
                />
              </Box>
            </BoxMotion>

            <BoxMotion
              variants={itemBotToTop(0.4)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false }}
              w={{ base: "full", lg: "70%" }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Text fontWeight={400} mb={4} fontSize="2xl">
                  {title[activeInquiry]}
                </Text>
                <Text mb={8}>
                  {subtitle[activeInquiry]}
                </Text>

                <Box
                  display="flex"
                  flexDirection={{ base: "column", lg: "row" }}
                  gap={5}
                  mb={[5, null, null, 8]}
                >
                  <Input
                    fontWeight={300}
                    variant="flushed"
                    color="light"
                    _placeholder={{
                      color: "light",
                      opacity: 0.6,
                    }}
                    _autofill={{
                      backgroundColor: "transprent",
                    }}
                    opacity={0.6}
                    placeholder={"First and Last Name"}
                    borderColor={formik.errors.name ? "red.500" : "light"}
                    _focus={{
                      borderColor: formik.errors.name ? "red.500" : "light",
                      opacity: 1,
                      boxShadow: "none",
                    }}
                    id="name"
                    type="text"
                    {...formik.getFieldProps("name")}
                  />

                  <Input
                    fontWeight={300}
                    variant="flushed"
                    color="light"
                    _placeholder={{
                      color: "light",
                      opacity: 0.6,
                    }}
                    opacity={0.6}
                    placeholder={"Email"}
                    borderColor={formik.errors.email ? "red.500" : "light"}
                    _focus={{
                      borderColor: formik.errors.email ? "red.500" : "light",
                      opacity: 1,
                      boxShadow: "none",
                    }}
                    id="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                  />
                </Box>

                <Box
                  flexDirection={{ base: "column", lg: "row" }}
                  display="flex"
                  gap={5}
                  mb={[5, null, null, 8]}
                >
                  <Input
                    fontWeight={300}
                    variant="flushed"
                    color="light"
                    _placeholder={{
                      color: "light",
                      opacity: 0.6,
                    }}
                    _autofill={{
                      backgroundColor: "transprent",
                    }}
                    opacity={0.6}
                    placeholder={"Company"}
                    borderColor={formik.errors.company ? "red.500" : "light"}
                    _focus={{
                      borderColor: formik.errors.company ? "red.500" : "light",
                      opacity: 1,
                      boxShadow: "none",
                    }}
                    id="company"
                    type="text"
                    {...formik.getFieldProps("company")}
                  />

                  <Input
                    fontWeight={300}
                    variant="flushed"
                    color="light"
                    _placeholder={{
                      color: "light",
                      opacity: 0.6,
                    }}
                    opacity={0.6}
                    placeholder={"Mobile Number"}
                    borderColor={formik.errors.phone ? "red.500" : "light"}
                    _focus={{
                      borderColor: formik.errors.phone ? "red.500" : "light",
                      opacity: 1,
                      boxShadow: "none",
                    }}
                    id="phone"
                    type="tel"
                    {...formik.getFieldProps("phone")}
                  />
                </Box>

                <Textarea
                  fontWeight={300}
                  placeholder="Message"
                  mb={8}
                  variant="flushed"
                  color="light"
                  _placeholder={{
                    color: "light",
                    opacity: 0.6,
                  }}
                  opacity={0.6}
                  borderColor={formik.errors.message ? "red.500" : "light"}
                  _focus={{
                    borderColor: formik.errors.message ? "red.500" : "light",
                    opacity: 1,
                    boxShadow: "none",
                  }}
                  id="message"
                  {...formik.getFieldProps("message")}
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={24}
                  flexDirection={{ base: "column", lg: "row" }}
                >
                  <Checkbox
                    w={{ base: "full", lg: "70%" }}
                    mb={[6, null, null, 0]}
                    colorScheme="dark"
                    borderRadius="50%"
                    className="checkbox"
                    color="light"
                    id="subscribe"
                    {...formik.getFieldProps("subscribe")}
                  >
                    I want to stay up-to-date with the latest Rubicube news and
                    consent to providing my email to subscribe to email
                    marketing updates.
                  </Checkbox>
                  <Button
                    type="submit"
                    text="Submit"
                    withIcon
                    px={5}
                    py={5}
                    style={{ width: "10rem", justifyContent: "space-between" }}
                  />
                </Box>
              </form>

              <Contacts />
            </BoxMotion>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

const title = ["Have a question in mind ?", "Have a project in mind?"];
const subtitle = [
  "Fill the field below and describe your needs. In return we will contact you soon as possible.",
  "Fill in the field below and describe your needs. In return we will contact you and suggest solutions for your business needs.",
];
