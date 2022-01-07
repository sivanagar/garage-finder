import { useQuery } from "@apollo/client";
import { Box, Button, Center, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import SearchAutoComplete from "../components/SearchAutoComplete";
import Auth from "../utils/auth";
import { QUERY_ALL_LISTINGS, QUERY_ME } from "../utils/queries";

const Home = () => {
  const history = useHistory();
  const [addressResult, setAddressResult] = useState({
    addressLine1: null,
    city: null,
    state: null,
    zip: null,
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  });

  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError,
  } = useQuery(QUERY_ALL_LISTINGS);

  const { data: userData } = useQuery(QUERY_ME);

  const loggedIn = Auth.loggedIn();

  if (listingsLoading) {
    return (
      <Skeleton>
        <Stack>
          <Skeleton height="20px" w="100%" />
          <Skeleton height="20px" w="100%" />
          <Skeleton height="20px" w="100%" />
        </Stack>
      </Skeleton>
    );
  }

  if (!listingsLoading) {
    console.log("Listings: ", listingsData.listings);
  }

  function handleClickSearch() {
    console.log("Search: ", addressResult);

    history.push({
      pathname: "/results",
      state: { addressResult },
    });
  }

  return (
    <>
      <Box w="100%" mt="20">
        <SearchAutoComplete setResult={setAddressResult} />
        <Center mt="4">
          <Button onClick={handleClickSearch} variant="primary" size="lg">
            Search Spaces
          </Button>
        </Center>
      </Box>
      <Flex direction="column" align="center" justify="center" mt="40">
        <Button as={ReactLink} to="search" variant="primary" m="4" size="lg">
          I need to rent space
        </Button>
        <Button as={ReactLink} to="/rent" variant="primary" m="4" size="lg">
          I have space to rent
        </Button>
      </Flex>
    </>
  );
};

export default Home;
