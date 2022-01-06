import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.200"
      bg="purple.400"
      color="white"
      fontSize="lg"
      fontWeight="semibold"
    >
      <Box m="2" p="2">
        <Heading size="md">Cache App</Heading>
      </Box>
      <Spacer />
      <Box m="2" p="2">
        {Auth.loggedIn() ? (
          <>
            <Link m="1" to="/profile">
              Me
            </Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
