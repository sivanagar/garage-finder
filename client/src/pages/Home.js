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
      <Button as={ReactLink} to="search" variant="primary" m="4" size="lg">
        I need to rent space
      </Button>
      <Button as={ReactLink} to="/rent" variant="primary" m="4" size="lg">
        I have space to rent
      </Button>
    </Flex>
  );
};

export default Home;
