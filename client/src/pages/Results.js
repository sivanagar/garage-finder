import { useQuery } from '@apollo/client';
import { Flex, Heading, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Result from '../components/Result';
import { QUERY_LISTINGS } from '../utils/queries';
import GoogleApiWrapper from '../components/Map/';

const Resutls = (props) => {
  const location = useLocation();
  console.log('location: ', location);
  const { colorMode } = useColorMode();

  const searchedLocation = {
    lat: location.state.addressResult.location.coordinates[1],
    lng: location.state.addressResult.location.coordinates[0],
  };
  console.log('searchedLocation', searchedLocation);
  const { loading, data } = useQuery(QUERY_LISTINGS, {
    variables: {
      location: {
        type: 'Point',
        coordinates: [searchedLocation.lng, searchedLocation.lat], //addressResult.location.coordinates,
      },
      distance: 80467, //if 0 returns all listings, else need coordinates
    },
  });
  useEffect(() => {
    console.log('search Info', location.state.search);
  }, [location]);
  const results = data ? data.listings : [];

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Heading
        mt="10"
        mb="4"
        color={colorMode === 'light' ? 'tertiarydark' : 'white'}
      >
        Results
      </Heading>
      {results.length === 0 && <Heading>No results found</Heading>}
      <Flex w="100%">
        <Flex
          w="50%"
          direction="row"
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          m="2"
        >
          {results.map((result) => (
            <Result key={result._id} result={result} />
          ))}
        </Flex>
        {results.length > 0 && (
          <GoogleApiWrapper
            listings={results}
            searchLocation={searchedLocation}
          />
        )}
      </Flex>
    </>
  );
};

export default Resutls;
