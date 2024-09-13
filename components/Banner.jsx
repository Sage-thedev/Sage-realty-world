import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

const Banner = ({
  purpose,
  title1,
  title2,
  imageUrl,
  desc1,
  desc2,
  LinkName,
  buttonText,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" p='5' m={0} mt={0}>
      <Image src={imageUrl} width={500} height={300} alt="banner" loading="lazy"/>

      <Box p="5" m={0}>
        <Text color="red.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br /> {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
          {desc1}
          <br />
          {desc2}
        </Text>
        <Link href={LinkName}>
        <Button fontSize="xl">
          {buttonText}
        </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Banner;
