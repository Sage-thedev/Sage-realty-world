"use client";

import { useState } from "react";
import {
  VStack,
  Box,
  Text,
  Tooltip,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { MdCancel, MdEmail, MdPhone, MdWhatsapp, MdFacebook } from "react-icons/md";

const Sidebar = () => {
  const [drawerType, setDrawerType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenDrawer = (type) => {
    setDrawerType(type);
    onOpen();
  };

  return (
    <>
      <VStack
        position="fixed"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        spacing={4}
        zIndex={10}  
      >
        <Tooltip label="About us" placement="right">
          <IconButton
            id="about-icon"
            aria-label="About us"
            icon={<FaInfoCircle />}
            onClick={() => handleOpenDrawer("about")}
          />
        </Tooltip>

        <Tooltip label="Contact" placement="right">
          <IconButton
            id="contact-icon"
            aria-label="Contact"
            icon={<FaEnvelope />}
            onClick={() => handleOpenDrawer("contact")}
          />
        </Tooltip>
      </VStack>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay />
        <DrawerContent bg="gray.300">
          <DrawerHeader color="white">
            {drawerType === "about" ? "About Us" : "Contact"}
            <IconButton
              aria-label="Close"
              icon={<MdCancel />}
              position="absolute"
              right={4}
              top={4}
              onClick={onClose}
              variant="ghost"
            />
          </DrawerHeader>
          <DrawerBody>
            {drawerType === "about" ? (
              <Box>
                <Text mt={4} color="#000" className="animated-text">
                  Welcome to <Text as='span' color='blue.600'>Sage Realty World!</Text> We are a leading real estate
                  agency committed to providing exceptional services to our
                  clients. Our team of experienced professionals is dedicated to
                  helping you find your dream home, whether you are looking to
                  rent, buy, or invest in property. We offer a wide range of
                  properties to suit every need and budget, and our personalized
                  approach ensures that you receive the best possible
                  experience. With our extensive market knowledge and commitment
                  to excellence, we are here to guide you through every step of
                  your real estate journey.
                </Text>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={32}
                className="animated-text"
              >
                <form>
                  <Text as="h3" mb={2} color="gray.600">
                    For any inquiries, please send us a message today.
                  </Text>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Your Name..." />
                  </FormControl>

                  <FormControl id="email" isRequired mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Your Email..." />
                  </FormControl>

                  <FormControl id="message" isRequired mt={4}>
                    <FormLabel>Message</FormLabel>
                    <Textarea placeholder="Your Message..." />
                  </FormControl>
                  <Button type="submit" colorScheme="teal" mt={4}>
                    Send Message
                  </Button>
                </form>

                <Box>
                  <Flex flexDirection="column" alignItems="center">
                    <Heading as="h3" fontSize="2xl" mb="2">
                      Contact <Text as="span" color="blue.500">Today!!</Text>
                    </Heading>
                    <Flex alignItems="center" mb="2">
                      <Icon color="blue.500" mr="2" fontSize="2xl">
                        <MdEmail />
                      </Icon>
                      <Text>
                        <a
                          href="mailto:sagerealtyworld@gmail.com"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          Email: sagerealtyworld@gmail.com
                        </a>
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="2">
                      <Icon color="blue.500" mr="2" fontSize="2xl">
                        <MdPhone />
                      </Icon>
                      <Text>
                        <a
                          href="tel:+2348149385468"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          Phone: +2348149385468
                        </a>
                      </Text>
                    </Flex>

                    <Flex justifyContent="space-between" alignItems="center" p="2" gap="32px">
                      <Flex alignItems="center">
                        <Icon color="green.500" mr="2" fontSize="2xl">
                          <MdWhatsapp />
                        </Icon>
                        <Text>
                          <a
                            href="https://wa.me/+2348149385468"
                            style={{ color: "inherit", textDecoration: "none" }}
                            cursor="pointer"
                          >
                            Whatsapp
                          </a>
                        </Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Icon color="blue.500" mr="2" fontSize="2xl">
                          <MdFacebook />
                        </Icon>
                        <Text>
                          <a
                            href="https://facebook.com/sagerealtyworld"
                            style={{ color: "inherit", textDecoration: "none" }}
                            cursor="pointer"
                          >
                            Facebook
                          </a>
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
