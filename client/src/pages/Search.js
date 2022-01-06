import { Box, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchAutoComplete from "../components/SearchAutoComplete";

const Search = () => {
  const history = useHistory();
  const [search, setSearch] = useState({
    lat: null,
    lng: null,
    zip: null,
  });

  function handleOnClick() {
    console.log("Search: ", search);

    history.push({
      pathname: "/results",
      state: { search },
    });
  }

  return (
    <Box w="100%" mt="20">
      <SearchAutoComplete setSearch={setSearch} />
      <Center mt="4">
        <Button onClick={handleOnClick} variant="primary" size="lg">
          Search Spaces
        </Button>
      </Center>
    </Box>
  );
};

export default Search;
