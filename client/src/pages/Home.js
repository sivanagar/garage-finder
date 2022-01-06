import { useQuery } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  return (
    <Flex direction="column" align="center" justify="center" mt="40">
      <Button as={ReactLink} size="lg" to="Search" colorScheme="purple" m="4">
        I need to rent space
      </Button>
      <Button as={ReactLink} size="lg" to="Rent" colorScheme="purple" m="4">
        I need to rent space
      </Button>
    </Flex>
  );
};

export default Home;
