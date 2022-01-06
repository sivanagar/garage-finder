import { Box, Container } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      w="100%"
      mt="auto"
      p="4"
      bg="gray.200"
      fontSize="lg"
      fontWeight="semibold"
    >
      <Container centerContent>
        &copy;{new Date().getFullYear()} by team
      </Container>
    </Box>
  );
};

export default Footer;
