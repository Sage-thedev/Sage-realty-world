import { baseUrl, fetchApi } from "@utils/FetchApi";
import Property from "@components/Property";
import Banner from "@components/Banner";
import { Flex, Box } from "@chakra-ui/react";
import AnimatedContainer from "@components/AnimatedContainer";
import Hero from "@components/Hero";
import AgencySection from "@components/AgencySection";

export default async function Home() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  // Fetch agency data
  const agencyData = await fetchApi(
    `${baseUrl}/agencies/list?hitsPerPage=6`
  );

  const saleProperties = propertyForSale?.hits || [];
  const rentProperties = propertyForRent?.hits || [];
  const agencies = agencyData?.hits || []; // Assign agency data

  return (
    <AnimatedContainer>
      <Box as="main" overflow="hidden" m={0} p={0}>
        <Hero />
        <Banner
          purpose="RENT A HOME"
          title1="Rental homes for"
          title2="everyone"
          desc1="Explore Apartments, Villas, Homes"
          desc2="and more"
          buttonText="Explore Renting"
          LinkName="/search?purpose=for-rent"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          className="border-b-8 border-zinc-300"
          p={{ base: "4", md: "6" }}
        >
          {rentProperties.map((property) => (
            <Property
              property={property}
              key={property.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                margin: "10px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: { base: "100%", sm: "45%", md: "30%", lg: "22%" },
              }}
            />
          ))}
        </Flex>

        <Banner
          purpose="BUY A HOME"
          title1="Find, Buy & Own Your"
          title2="Dream Home"
          desc1="Explore from Apartments, land, builder floors,"
          desc2="villas and more"
          buttonText="Explore Buying"
          LinkName="/search?purpose=for-sale"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          p={{ base: "4", md: "6" }}
        >
          {saleProperties.map((property) => (
            <Property
              property={property}
              key={property.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                margin: "10px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: { base: "100%", sm: "45%", md: "30%", lg: "22%" },
              }}
            />
          ))}
        </Flex>

        {/* Pass the agencies data to the AgencySection component */}
        <AgencySection agency={agencies} />
      </Box>
    </AnimatedContainer>
  );
}
