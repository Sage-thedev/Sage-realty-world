"use client";

import { Box, VStack, Text, Button, Flex, keyframes } from "@chakra-ui/react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// Keyframe animation for smooth color transition
const colorChange = keyframes`
  0% { color: #FF5733; }
  25% { color: #33FF57; }
  50% { color: #3357FF; }
  75% { color: #FF33A6; }
  100% { color: #57FF33; }
`;

export default function Hero() {
  const handleClick = () => {
    document.getElementById("contact-icon").click();
  };

  const handleAboutClick = () => {
    document.getElementById("about-icon").click();
  };

  const [typeEffect] = useTypewriter({
    words: [
      "Welcome to Your Dream Home",
      "Discover the UAE's Largest Property Market",
      "Discover Affordable Properties in the UAE",
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 40,
    cursor: <Cursor />,
    delaySpeed: 1000,
  });

  return (
    <Box
      as="section"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      p={{ base: "4", md: "6", lg: "8" }} 
      m={0}
      pt={{ base: "50px", md: "60px" }} 
    >
      {/* Background Video */}
      <video
        loop
        autoPlay
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/856661/856661-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <VStack zIndex={1} spacing={4} textAlign="center">
        <Text
          fontSize={{base:"2xl", md:"3xl", lg:"4xl"}}
          fontWeight="bold"
          animation={`${colorChange} 10s infinite`} // Apply color animation
          overflow="hidden"
          whiteSpace="nowrap" 
          bg="white"
          px={{ base: "4", md: "6", lg: "8" }} 
        >
          {typeEffect}
        </Text>

        {/* Buttons */}
        <Flex align="center" direction={{ base: "column", md: "row" }} gap={4}>
          <Button bg="black" color="white" onClick={handleClick} size={{ base: "md", md: "lg" }}>
            Contact Us
          </Button>
          <Button colorScheme="teal" size={{ base: "md", md: "lg" }} onClick={handleAboutClick}>
            Learn More
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
