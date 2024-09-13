"use client"

import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const AnimatedContainer = ({ children }) => {
  const pageAnimation = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 50 },
    transition: { duration: 2, ease: "easeOut" }  // Smooth and slow animation
  };

  return (
    <Box
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      {children}
    </Box>
  );
};

export default AnimatedContainer;
