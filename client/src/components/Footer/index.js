import { Box, Container, useColorMode } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      w="100%"
      mt="auto"
      p="4"
      color="white"
      bg={colorMode === "light" ? "primary" : "primarydark"}
      fontSize="lg"
      fontWeight="semibold"
    >
      <Container centerContent>
        &copy;{new Date().getFullYear()} JSSW Collaboration
      </Container>
    </Box>
  );
};

export default Footer;
