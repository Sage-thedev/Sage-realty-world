import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar, Spacer } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from "@utils/FetchApi";
import ImageScrollbar from '@components/ImageScrollbar';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => (
    <Box maxWidth='1000px' margin='auto' p='4'>
        {photos && <ImageScrollbar data={photos} />}
        <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems='center'>
                <Box paddingRight='3' color='green.400'>
                    {isVerified && <GoVerified />}
                </Box>
                <Text fontWeight='bold' fontSize='lg'>
                    AED {price} {rentFrequency && `/${rentFrequency}`}
                </Text>
                <Spacer />
                <Avatar size='sm' src={agency?.logo?.url}></Avatar>
            </Flex>
            <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
                {rooms}<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
        </Box>
        <Box marginTop='2'>
            <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
            <Text lineHeight='2' color='gray.600'>{description}</Text>
        </Box>
        <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
            <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                <Text>Type</Text>
                <Text fontWeight='bold'>{type}</Text>
            </Flex>
            <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                <Text>Purpose</Text>
                <Text fontWeight='bold'>{purpose}</Text>
            </Flex>
            {furnishingStatus && (
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                    <Text>Furnishing Status</Text>
                    <Text fontWeight='bold'>{furnishingStatus}</Text>
                </Flex>
            )}
        </Flex>
        <Box>
            {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities:</Text>}
            <Flex flexWrap='wrap'>
                {amenities?.map((item) => (
                    item?.amenities?.map((amenity) => (
                        <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                            {amenity.text}
                        </Text>
                    ))
                ))}
            </Flex>
        </Box>
    </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    // Fetch a list of properties to ensure the externalID is valid
    const validIDs = await fetchApi(`${baseUrl}/properties/list`, {
        params: {
            locationExternalIDs: '5002', // Example location ID, adjust as needed
            purpose: 'for-sale', // or 'for-rent' based on your use case
            hitsPerPage: '10',
            page: '0',
        }
    })
    .then(response => response.hits.map(property => property.externalID))
    .catch(error => {
        console.error('Error fetching valid externalIDs:', error);
        return [];
    });

    // Check if the provided id is in the list of valid externalIDs
    if (!validIDs.includes(id)) {
        return {
            notFound: true, // Return 404 if the id is not valid
        };
    }

    // Fetch the property details using the valid externalID
    try {
        const data = await fetchApi(`${baseUrl}/properties/detail`, {
            params: { externalID: id }
        });

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                propertyDetails: data,
            },
        };
    } catch (error) {
        console.error('Error fetching property details:', error);
        return {
            notFound: true,
        };
    }
}
