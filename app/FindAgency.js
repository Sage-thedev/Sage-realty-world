import { baseUrl, fetchApi } from "@utils/FetchApi";
import Property from "@components/Property";
import { Flex, Box, Text } from "@chakra-ui/react";
import AgencySection from "@components/AgencySection";

export default function FindAgency({ agencies }) {
  return (
    <Box as="main" overflow="hidden" m={0} p={0}>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        p={{ base: "4", md: "6" }}
      >
        {agencies.length ? (
          agencies.map((agency) => (
            <AgencySection
              key={agency.id}
              agency={agency}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                margin: "10px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: { base: "100%", sm: "45%", md: "30%", lg: "22%" },
              }}
            />
          ))
        ) : (
          <Text>No agencies found.</Text>
        )}
      </Flex>
    </Box>
  );
}

export async function getServerSideProps() {
  // Fetch agency data
  const agencyData = await fetchApi(
    `${baseUrl}/agencies/list?hitsPerPage=6`
  );

  const agencies = agencyData?.hits || [];

  return {
    props: {
      agencies,
    },
  };
}
