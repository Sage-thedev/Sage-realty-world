"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Avatar, Text, Heading, Flex } from '@chakra-ui/react';
import Slider from 'react-slick';
import { useEffect } from "react";

const AgencySection = ({ agency  = []  }) => { // Fix prop destructuring
    useEffect(() => {
        console.log('Agency Data:', agency); // Log the data to check its structure
      }, [agency]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box as="section" bg='gray.800' color="white" p="5">
      <Heading as='h2' size='lg' textAlign='center' mb={6}>
        Trusted Agencies for Your Dream Home
      </Heading>
      <Slider {...settings}>
        {agency.map((agencyItem) => (
          <Box key={agencyItem.id} textAlign="center" p={3}>
            <Flex direction='column' align='center' mb={4}>
            <Avatar size="xl" src={agencyItem?.logo?.url || '/default-avatar.png'} mb={4} />
              <Text fontWeight="bold">{agencyItem.name}</Text>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default AgencySection;
