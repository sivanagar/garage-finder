import { Box, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.200"
      bg={colorMode === "light" ? "primary" : "gray.900"}
      color="white"
      fontSize="lg"
      fontWeight="semibold"
      direction="row"
      justify="space-between"
    >
      <Box m="2" p="2">
        <Heading as={ReactLink} to="/" size="md">
          Cache App
        </Heading>
      </Box>
      <Box m="2" p="2">
        {Auth.loggedIn() ? (
          <>
            <Button as={ReactLink} variant="secondary" m="1" to="/profile">
              Me
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
            <Button variant="primary" m="1" onClick={toggleColorMode}>
              M
            </Button>
          </>
        ) : (
          <>
            <Button
              as={ReactLink}
              variant="secondary"
              size="sm"
              m="0.5"
              to="/login"
            >
              Login
            </Button>
            <Button
              as={ReactLink}
              variant="secondary"
              size="sm"
              m="0.5"
              to="/signup"
            >
              Signup
            </Button>
            <Button
              variant="primary"
              size="sm"
              m="0.5"
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? "🌙" : "☀️"}
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
