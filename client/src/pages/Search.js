import { Box, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchAutoComplete from "../components/SearchAutoComplete";

const Search = () => {
  const history = useHistory();
  const [addressResult, setAddressResult] = useState({
    addressLine1: null,
    city: null,
    state: null,
    zip: null,
    lat: null,
    lng: null,
  });

  function handleOnClick() {
    console.log("Search: ", addressResult);

    history.push({
      pathname: "/results",
      state: { addressResult },
    });
  }

  return (
    <Box w="100%" mt="20">
      <SearchAutoComplete setResult={setAddressResult} />
      <Center mt="4">
        <Button onClick={handleOnClick} variant="primary" size="lg">
          Search Spaces
        </Button>
      </Center>
    </Box>
  );
};

export default Search;
