import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useState } from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import ResultHome from '../components/ResultHome';
import SearchAutoComplete from '../components/SearchAutoComplete';
import Auth from '../utils/auth';
import { QUERY_LISTINGS, QUERY_ME } from '../utils/queries';

const Home = () => {
  const history = useHistory();
  const [addressResult, setAddressResult] = useState({
    addressLine1: null,
    city: null,
    state: null,
    zip: null,
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
  });

  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError,
  } = useQuery(QUERY_LISTINGS, {
    variables: {
      location: {
        type: 'Point',
        coordinates: [-139.4711, -32.5336], //addressResult.location.coordinates,
      },
      distance: 0, //if 0 returns all listings, else need coordinates
    },
  });
  console.log(listingsData);
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
  let randomListings = [];

  if (!listingsLoading) {
    randomListings = _.sampleSize(listingsData.listings, 3);
    console.log(randomListings);
  }

  function handleClickSearch() {
    console.log('Search: ', addressResult);

    history.push({
      pathname: '/results',
      state: { addressResult },
    });
  }

  return (
    <>
      <Flex w="100%" mt="20" justify={['center', 'flex-start']}>
        <Heading>Get your space now </Heading>
      </Flex>
      <Flex
        w="100%"
        mt="4"
        direction={['column', 'row']}
        justify={['center', 'flex-start']}
        alignItems={['center', 'flex-start']}
      >
        {randomListings.map((listing) => (
          <ResultHome result={listing} key={listing._id} />
        ))}
      </Flex>
      <Box w="100%" mt="20">
        <Center mb="2">
          <Heading>Find a space</Heading>
        </Center>
        <SearchAutoComplete setResult={setAddressResult} />
        <Center mt="4">
          <Button onClick={handleClickSearch} variant="primary" size="lg">
            Search Spaces
          </Button>
        </Center>
      </Box>
      <Flex
        w="100%"
        my="6"
        direction={['column', 'row']}
        justify={['center']}
        alignItems={['center', 'flex-start']}
      >
        <Box
          minW={[300, '50%']}
          minH={[300]}
          borderWidth="1px"
          borderRadius="lg"
          m="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          bgGradient="url('https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2015/03/cnn-single-mom-garage.jpg?w=701')"
          bgSize="cover"
        >
          <Flex w="100%" justify="flex-start" p="4">
            <Heading color="white">You need aditional space</Heading>
          </Flex>
          <Flex w="100%" justify="flex-end">
            <Button
              as={ReactLink}
              to="search"
              variant="primary"
              m="4"
              size="lg"
            >
              I need to rent space
            </Button>
          </Flex>
        </Box>
        <Box
          minW={[300, '50%']}
          minH={[300]}
          borderWidth="1px"
          borderRadius="lg"
          m="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          bgGradient="url('https://cdn.motor1.com/images/mgl/b0ql3/s1/4x3/gearhead-home-offers-6-car-garage-with-bonus-room-for-under-400k.webp')"
          bgSize="cover"
        >
          <Flex w="100%" justify="flex-start" p="4">
            <Heading color="white">I Have Extra Space at home</Heading>
          </Flex>
          <Flex w="100%" justify="flex-end">
            <Button as={ReactLink} to="/rent" variant="primary" m="4" size="lg">
              I have space to rent
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
