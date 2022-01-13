import { useQuery } from '@apollo/client';
import { Box, Flex, Heading, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleApiWrapper from '../components/Map/';
import Result from '../components/Result';
import Footer from '../components/Footer';
import { QUERY_LISTINGS } from '../utils/queries';

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
      <Flex
        direction={['column', 'row']}
        justify="flex-start"
        w="100vw"
        h={[640, '100vh']}
      >
        <Box flex="1" display="flex" alignItems="center" flexDirection="column">
          <Heading
            m="2"
            color={colorMode === 'light' ? 'tertiarydark' : 'white'}
          >
            Results
          </Heading>
          {results.length === 0 && <Heading>No results found</Heading>}

          {results.map((result) => (
            <Result key={result._id} result={result} />
          ))}
        </Box>
        {results.length > 0 && (
          <Box flex="2">
            <GoogleApiWrapper
              listings={results}
              searchLocation={searchedLocation}
            />
          </Box>
        )}
      </Flex>
      <Footer />
    </>
  );
};

export default Resutls;
