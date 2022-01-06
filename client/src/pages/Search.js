import { Box, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchAutoComplete from "../components/SearchAutoComplete";


const Search = () => {
  const [search, setSearch] = useState({
    lat: null,
    lng: null,
    zip: null,
  });

  function handleOnClick() {
    console.log("Search: ", search);
  }

  return (
    <Box w="100%" mt="20">
      <SearchAutoComplete setSearch={setSearch} />
      <Center mt="4">
        <Button onClick={handleOnClick} colorScheme="purple">
          Search Spaces
        </Button>
      </Center>
    </Box>
  );
};

export default Search;
