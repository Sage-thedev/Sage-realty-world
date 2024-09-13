"use client";
import {
  Box,
  Flex,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import {
  MdEmail,
  MdPhone,
  MdArrowUpward,
  MdWhatsapp,
  MdFacebook,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SideBarIcon from "@components/SideBarIcon";

const Footer = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      if (window.scrollY > 100) {
        setShowBackToTop(true);
        scrollTimeout = setTimeout(() => {
          setShowLogo(true);
        }, 3000); // Delay logo appearance by 3 seconds
      } else {
        setShowLogo(false);
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box bg="black" color="white" p="5" textAlign="center" className="border-t-8 border-zinc-300" as="footer" position="relative" zIndex={1}>
      <Flex flexWrap="wrap" justifyContent="space-around" alignItems="center">
        <Box>
          <Flex flexDirection="column" alignItems="center">
            <Heading as="h3" fontSize="2xl" mb="2">Contact</Heading>
            <Flex alignItems="center" mb="2">
              <Icon color="blue.500" mr="2" fontSize="2xl"><MdEmail /></Icon>
              <Text>
                <a href="mailto:sagerealtyworld@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                  Email: sagerealtyworld@gmail.com
                </a>
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Icon color="blue.500" mr="2" fontSize="2xl"><MdPhone /></Icon>
              <Text>
                <a href="tel:+2348149385468" style={{ color: "inherit", textDecoration: "none" }}>
                  Phone: +2348149385468
                </a>
              </Text>
            </Flex>
            <Flex justifyContent='space-between' alignItems="center" p='2' gap='32px'>
              <Flex alignItems="center">
                <Icon color="green.500" mr="2" fontSize="2xl"><MdWhatsapp /></Icon>
                <Text>
                  <a href="https://wa.me/+2348149385468" style={{ color: "inherit", textDecoration: "none" }} cursor='pointer'>
                    Whatsapp
                  </a>
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Icon color="blue.500" mr="2" fontSize="2xl"><MdFacebook /></Icon>
                <Text>
                  <a href="https://facebook.com/sagerealtyworld" style={{ color: "inherit", textDecoration: "none" }} cursor='pointer'>
                    Facebook
                  </a>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Flex alignItems='center' flexWrap='wrap' flexDir='column'>
          <Box>
          <Heading as='h3'>About Us</Heading>
          <SideBarIcon />
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center" mt={{ base: "4", md: "0" }}>
          <Box paddingTop="2">© 2024 Sage Realty World. All rights reserved.</Box>
          <Text size="sm" fontSize="m">Designed By SageTheDev</Text>
        </Flex>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="center" mt={{ base: "4", md: "0" }}>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Box fontSize="m" color="white" fontWeight="bold">
              <Image src="/assets/images/logo.jpeg" alt="logo" width={20} height={20} style={{ display: "inline-block", verticalAlign: "middle" }} />
              <span className="ml-10">Sage Realty World</span>
            </Box>
          </motion.div>
        )}
      </Flex>

      {showBackToTop && (
        <Box
          position="fixed"
          bottom="10"
          right="10"
          cursor="pointer"
          onClick={scrollToTop}
          as={motion.div}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: "repeat" }}
          bg='gray.400'
          borderRadius='50px'
        >
          <Icon as={MdArrowUpward} boxSize={10} color="black" />
        </Box>
      )}
    </Box>
  );
};

export default Footer;
