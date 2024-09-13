"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, VStack, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const SideBarIcon = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
     <IconButton
        icon={<FaInfoCircle fontSize='2xl' />}
        onClick={onOpen}
        variant="solid"
        colorScheme="white"
        _hover={{ bg: 'teal.600' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        as={motion.button}
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.2 : 1 }}
        
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4" textAlign="center">
              <Text>
                Welcome to Sage Realty World! We are dedicated to helping you find your perfect home. Whether you're looking to rent or buy, our experienced team is here to assist you every step of the way.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SideBarIcon;
