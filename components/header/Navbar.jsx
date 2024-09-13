"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Flex,
  Box,
  Spacer,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${searchQuery}`);
    }
  };
  return (
    <Flex
      p="2"
      borderBottom="1px"
      borderColor="gray.100"
      bg="black"
      position="fixed"
      width="100%"
      zIndex="1000"
      top="0" // Ensure it stays at the top
      height="80px"
    >
      <Box fontSize="xl" color="white" fontWeight="bold">
        <Link href="/" pl="2">
         <Flex flexWrap='wrap'>
         <Image
            src="/assets/images/logo.jpeg"
            alt="logo"
            width={40}
            height={40}
            style={{ display: "inline-block", verticalAlign: "middle" }}
          />
          <span className="ml-10">Sage Realty World</span>
         </Flex>
        </Link>
      </Box>

      <Spacer />

      <InputGroup w={{base:"200px", md:"'300px", lg:"400px"}} maxW="100%">
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onKeyDown={handleSearch}
          placeholder="Search for properties"
          _placeholder={{ color: "gray.400" }}
          bg="white"
          color="black"
          borderRadius="md"
        />

        <InputRightElement
          children={<BsSearch color="gray.500" />}
          cursor="pointer"
          onClick={() => router.push(`/search?query=${searchQuery}`)}
        />
      </InputGroup>

      <Spacer />

      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FcMenu />}
            variant="outlined"
            color="red.400"
            bg="white"
          />
          <MenuList>
            <Link href="/" passHref>
              <MenuItem icon={<FcHome />}>Home</MenuItem>
            </Link>
            <Link href="/search" passHref>
              <MenuItem icon={<BsSearch />}>Find Properties</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
            </Link>
            <Link href="/find-agency" passHref>
              <MenuItem icon={<FcAbout />}>Find Agencies</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
