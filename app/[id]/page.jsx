import { Box, Flex, Text, Avatar, Spacer } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from "@utils/FetchApi";
import ImageScrollbar from '@components/ImageScrollbar';

export default async function PropertyDetails({ params }) {
    const { id } = params;

    // Fetch a list of properties to ensure the externalID is valid
    let validIDs = [];
    try {
        const response = await fetchApi(`${baseUrl}/properties/list`, {
            params: {
                locationExternalIDs: '5002', // Example location ID, adjust as needed
                purpose: 'for-sale', // or 'for-rent' based on your use case
                hitsPerPage: '10',
                page: '0',
            }
        });
        validIDs = response.hits.map(property => property.externalID);
    } catch (error) {
        console.error('Error fetching valid externalIDs:', error);
    }

    // Check if the provided id is in the list of valid externalIDs
    if (!validIDs.includes(id)) {
        return <div>Property not found</div>;
    }

    // Fetch the property details using the valid externalID
    let data;
    try {
        data = await fetchApi(`${baseUrl}/properties/detail`, {
            params: { externalID: id }
        });
    } catch (error) {
        console.error('Error fetching property details:', error);
        return <div>Property not found</div>;
    }

    if (!data) {
        return <div>Property not found</div>;
    }

    const { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } = data;

    return (
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
}
