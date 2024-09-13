"use client"; // Mark this as a client component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Flex, Box, Text, Icon, Spinner } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilter from "@components/SearchFilter";
import Property from "@components/Property";
import AgencySection from "@components/AgencySection";
import { baseUrl, fetchApi } from "@utils/FetchApi";

const Search = () => {
  const [searchFilter, setSearchFilter] = useState(false);
  const [properties, setProperties] = useState([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  const fetchProperties = async (params) => {
    setLoading(true); // Start loading

    const searchParams = new URLSearchParams(params);

    const purpose = searchParams.get("purpose") || "for-rent";
    const rentFrequency = searchParams.get("rentFrequency") || "yearly";
    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "1000000";
    const roomsMin = searchParams.get("roomsMin") || "0";
    const bathsMin = searchParams.get("bathsMin") || "0";
    const sort = searchParams.get("sort") || "price-desc";
    const areaMax = searchParams.get("areaMax") || "35000";
    const locationExternalIDs =
      searchParams.get("locationExternalIDs") || "5002";
    const categoryExternalID = searchParams.get("categoryExternalID") || "4";

    try {
      const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
      );

      setProperties(data?.hits || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  useEffect(() => {
    fetchProperties(searchParams);
  }, [searchParams]);

  return (
    <Box  m={0}
    p={0}>
      <Box pt={{ base: 8, lg: 16 }} bg="gray.50">
        <AgencySection />
      </Box>
      <Box p={24}>
        <Flex
          cursor="pointer"
          bg="gray.500"
          color="white"
          borderBottom="1px"
          borderColor="gray.200"
          p="2"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          transition="all 0.5s ease-in"
          onClick={() => setSearchFilter((prevSearch) => !prevSearch)}
        >
          <Text>Search Property By Filters</Text>
          <Icon paddingLeft="2" w="8" h="8" as={BsFilter} color="white" />
        </Flex>
      </Box>
      {searchFilter && <SearchFilter onSearch={fetchProperties} />}
      {loading ? (
        <Flex justifyContent="center" alignItems="center" mb="2">
          <Spinner margin="auto" marginTop="3" color="blue.400" />
        </Flex>
      ) : (
        <Box>
          <Text
            textAlign="center"
            fontSize="3xl"
            fontFamily="sans-serif"
            fontWeight="bold"
            color="black"
            textShadow="1px 2px 2px white"
          >
            Popular searches
          </Text>
          <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {searchParams.get("purpose") || "for-rent"}
          </Text>
          <Flex flexWrap="wrap">
            {properties.length > 0 ? (
              properties.map((property) => (
                <Property property={property} key={property.id} />
              ))
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                p="4"
                flexDirection="column"
                marginTop="5"
                marginBottom="5"
              >
                <Image
                  alt="no result"
                  src="/assets/images/noresult.svg"
                  width={500}
                  height={300}
                />
                <Text fontSize="2xl" marginTop="3">
                  No Results Found
                </Text>
              </Flex>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Search;
