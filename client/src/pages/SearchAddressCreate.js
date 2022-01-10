import { Box, Button, Center, FormControl, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchAutoComplete from '../components/SearchAutoComplete';
import Auth from '../utils/auth';

const SearchAddressCreate = () => {
  const loggedIn = Auth.loggedIn();
  const history = useHistory();
  //Manage state address error
  const [addressError, setAddressError] = useState(true);
  //Manage state for search address result
  const [addressResult, setAddressResult] = useState({
    address: '',
    addressLine1: null,
    city: null,
    state: null,
    zip: null,
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
  });

  //useEffect to check if address is valid
  useEffect(() => {
    if (
      addressResult.addressLine1 &&
      addressResult.city &&
      addressResult.state &&
      addressResult.zip
    ) {
      setAddressError(false);
    } else {
      setAddressError(true);
    }
  }, [addressResult]);

  function handleClick() {
    console.log('addressResult', addressResult);

    history.push({
      pathname: '/createListing',
      state: { addressResult },
    });
  }

  if (!loggedIn) {
    history.push('/login');
  }

  return (
    <Box w="100%" mt="20">
      <Center>
        <Heading mb="6">Search for an address to create a space</Heading>
      </Center>
      <FormControl mb="6">
        <SearchAutoComplete setResult={setAddressResult} />
      </FormControl>
      {!addressError && (
        <Center>
          <Button variant="primary" type="button" onClick={handleClick}>
            Select Address
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default SearchAddressCreate;
