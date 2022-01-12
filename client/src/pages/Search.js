import { Box, Button, Center, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import SearchAutoComplete from "../components/SearchAutoComplete";

const Search = () => {
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

  function handleOnClick() {
    console.log("Search: ", addressResult);

    history.push({
      pathname: "/results",
      state: { addressResult },
    });
  }

  return (
    <>
      <Container maxW="container.lg" centerContent>
        <Box w="100%" mt="20">
          <SearchAutoComplete setResult={setAddressResult} />
          <Center mt="4">
            <Button onClick={handleOnClick} variant="primary" size="lg">
              Search Spaces
            </Button>
          </Center>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Search;
