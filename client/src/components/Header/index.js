import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
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
      direction={["column", "row"]}
      justify="space-between"
    >
      <Flex m="2" p="2" direction="row" justify={["center", "flex-end"]}>
        <Heading as={ReactLink} to="/" size="md">
          Cache App
        </Heading>
      </Flex>
      <Flex m="2" p="2" direction="row" justify={["center", "flex-end"]}>
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
      </Flex>
    </Flex>
  );
};

export default Header;
