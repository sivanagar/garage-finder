import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const history = useHistory();

  const { colorMode, toggleColorMode } = useColorMode();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function handleLogoClick() {
    history.push("/");
  }

  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.200"
      bg={colorMode === "light" ? "primary" : "primarydark"}
      color="white"
      fontSize="lg"
      fontWeight="semibold"
      direction={["column", "row"]}
      justify="space-between"
    >
      <Flex m="2" p="2" direction="row" justify={["center", "flex-end"]}>
        <Image
          objectFit="cover"
          src="../../../cache_logo.svg"
          alt="Cache"
          onClick={handleLogoClick}
          cursor="pointer"
        />
      </Flex>
      <Flex
        m="2"
        p="2"
        direction="row"
        align={["end", "flex-center"]}
        justify={["center", "flex-end"]}
      >
        {Auth.loggedIn() ? (
          <>
            <Button
              as={ReactLink}
              variant="secondary"
              size="sm"
              m="0.5"
              to="/profile"
            >
              Me
            </Button>
            <Button variant="secondary" size="sm" m="0.5" onClick={logout}>
              Logout
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
        ) : (
          <>
            <Button
              as={ReactLink}
              variant="secondary"
              m="0.5"
              to="/login"
              size="lg"
            >
              Login
            </Button>
            <Button
              as={ReactLink}
              variant="secondary"
              m="0.5"
              to="/signup"
              size="lg"
            >
              Signup
            </Button>
            <Button
              variant="primary"
              m="0.5"
              onClick={toggleColorMode}
              size="lg"
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
