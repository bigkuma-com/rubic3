import { Box, Heading, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
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
  marginXSection,
  phoneRegExp,
} from "../utils/consts";

const seo = {
  url: "https://www.rubic3.com/contact",
  title: "Contact Us - Rubicube Group",
  description: "Hello! You can drop us a message.",
};

export default function Contact() {
  const { reload } = useRouter();

  const [office, setOffice] = useState("Indonesia");
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
      company: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      message: Yup.string().required("Required"),
      subscribe: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setIsPopOpen(true);

      const data = {
        ...values,
        office,
      };

      postOne({ collection: "contacts", data }).then((res) => {
        axios
          .post(`/api/send-mail`, {
            name: values.name,
            email: values.email,
            company: values.company,
            phone: values.phone,
            message: values.message,
          })
          .then(() => {
            setIsLoading(false);
            setTimeout(() => {
              reload();
              // setIsPopOpen(false);
            }, 8000);
          });
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
        <Header isTransparent showContact={false} />

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
          px={marginXSection}
          py={[28, null, null, "12%"]}
          w="full"
          minH="100vh"
        >
          <Heading
            fontSize={{ base: "2xl", lg: "3xl" }}
            mb={[8, null, null, 12]}
            as={motion.h1}
            variants={itemBotToTop(0)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false }}
          >
            Hello! You can drop us a message.
          </Heading>

          <Box display="flex" flexDirection="column">
            <BoxMotion
              variants={itemBotToTop(0.4)}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Text
                  fontWeight={500}
                  mb={2}
                  fontSize={{ base: "sm", lg: "lg" }}
                >
                  Have a question in mind ?
                </Text>
                <Text
                  mb={10}
                  opacity={{ base: 0.7, lg: 1 }}
                  fontSize={{ base: "sm", lg: "lg" }}
                >
                  Fill the field below and describe your needs. In return we
                  will contact you soon as possible.
                </Text>

                <Text mb={3} fontSize={{ base: "sm", lg: "lg" }} opacity={0.6}>
                  Which office would you like to speak to?
                </Text>

                <BoxMotion
                  variants={itemBotToTop(0.2)}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false }}
                  mb={[4, null, null, 8]}
                  display="flex"
                  gap={4}
                  w="full"
                >
                  <Button
                    text="Rubicube Indonesia"
                    withIcon={false}
                    px={6}
                    py={5}
                    isActive={office === "Indonesia"}
                    onClick={() => {
                      setOffice("Indonesia");
                    }}
                  />
                  <Button
                    text="Rubicube Singapore"
                    withIcon={false}
                    px={6}
                    py={5}
                    isActive={office === "Singapore"}
                    onClick={() => {
                      setOffice("Singapore");
                    }}
                  />
                </BoxMotion>

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
                  justifyContent="flex-end"
                  mb={24}
                  flexDirection={{ base: "column", lg: "row" }}
                >
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

        <Footer position="relative" />
      </Box>
    </>
  );
}

const title = ["Have a question in mind ?", "Have a project in mind?"];
const subtitle = [
  "Fill the field below and describe your needs. In return we will contact you soon as possible.",
  "Fill in the field below and describe your needs. In return we will contact you and suggest solutions for your business needs.",
];
