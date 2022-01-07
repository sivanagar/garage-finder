import { Box, Container, useColorMode } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      w="100%"
      mt="auto"
      p="4"
      bg={colorMode === "light" ? "gray.200" : "gray.900"}
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
