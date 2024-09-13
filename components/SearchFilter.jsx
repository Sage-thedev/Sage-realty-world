"use client";

import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Select,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "@utils/filterData";
import { baseUrl, fetchApi } from "@utils/FetchApi";

const SearchFilter = ({ onSearch }) => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const updateSearchParams = (newParams) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const searchProperties = (filterValues) => {
    const values = getFilterValues(filterValues);

    const updateParams = {};
    values.forEach((item) => {
      if (item.value) {
        updateParams[item.name] = item.value;
      } else {
        delete updateParams[item.name]; // Remove the key if no value is selected
      }
    });

    updateSearchParams(updateParams);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams).toString();
    const newUrl = `${window.location.pathname}?${params}`;
    window.history.pushState(null, "", newUrl);
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await fetchApi(
            `${baseUrl}/auto-complete?query=${searchTerm}`
          );
          setLocationData(data?.hits);
        } catch (err) {
          setError("Failed to fetch locations, please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Flex p="4" bg="gray.100" flexWrap="wrap" justifyContent="center">
      {filters.map((filter) => (
        <Box key={filter.queryName} mr={4}>
          <Select
            placeholder={filter.queryName}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            w="fit-content"
            p={2}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}

      <Flex flexDir="column" mt={2}>
        <Button
          onClick={() => setShowLocation(!showLocation)}
          border="1px"
          borderColor="gray.200"
          w="fit-content"
          p={2}
        >
          Search Location
        </Button>
        {showLocation && (
          <Flex flexDir="column" pos="relative" pt="2">
            <Input
              placeholder="Find Location"
              value={searchTerm}
              w="300px"
              cursor="pointer"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <Icon
                pos="absolute"
                as={MdCancel}
                inset="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <Spinner margin="auto" marginTop="3" />}
            {error && <Text color="red.500" mt="2">{error}</Text>}
            {showLocation && (
              <Box overflow="auto" height="300px">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIds: location.externalID,
                      });
                      setShowLocation(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      borderBottom="1px"
                      borderColor="gray.100"
                      p="2"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <Image
                      src="/assets/images/noresult.svg"
                      alt="noresult"
                      width={300}
                      height={300}
                      placeholder={location.name}
                    />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to Search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>

      {/* Add Find Button */}
      <Button
        mt={2}
        bg="black"
        color='white'
        onClick={() => onSearch(searchParams)}
      >
        Find
      </Button>
    </Flex>
  );
};

export default SearchFilter;
