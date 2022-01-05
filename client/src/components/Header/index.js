import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import React from "react";
import Auth from "../../utils/auth";


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Flex  borderBottom="1px" borderColor="gray.200">
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
            <Link m="1" to="/login">
              Login
            </Link>
            <Link m="1" to="/signup">
              Signup
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;

