import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';


const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => (
  <Link href={`/property/${externalID}`} passHref>  
    <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0' justifyContent='flex-start' cursor='pointer'>
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : "/assets/images/house.jpg"}	
          alt='house'
          width={300}
          height={260}
          objectFit='cover'
        />
      </Box>  

      <Box w='full'>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
              <Text fontWeight='bold' fontSize='lg'>USD {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
          </Flex>
          <Box>
            <Avatar size='sm' src={agency?.logo?.url} />
          </Box>
          </Flex>
          <Flex alignItems='center' justifyContent='space-between' p='1' w='250px' color='blue.400'>
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
          </Flex>
          <Text fontSize='lg'>
            {title.length > 30? `${title.substring(0, 30 )}` : title}
          </Text>
      </Box>
    </Flex>
  
  </Link>
);

export default Property;
