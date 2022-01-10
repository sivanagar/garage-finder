import { useQuery } from '@apollo/client';
import { Flex, Heading, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Result from '../components/Result';
import { QUERY_LISTINGS } from '../utils/queries';
import GoogleApiWrapper from '../components/Map/';

const Resutls = (props) => {
  const location = useLocation();
  console.log('location: ', location);

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

  function handleSort(sortBy) {
    console.log('sortBy', sortBy);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Heading mt="10" mb="4">
        Results
      </Heading>
      <Flex w={[300, 400]} mb="2" direction="row" justifyContent="space-around">
        <Link onClick={() => handleSort('price')}>Price</Link>
        <Link onClick={() => handleSort('size')}>Size</Link>
        <Link onClick={() => handleSort('distance')}>Distance</Link>
        <Link>View Map</Link>
      </Flex>
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
        <GoogleApiWrapper
          listings={results}
          searchLocation={searchedLocation}
        />
      </Flex>
    </>
  );
};

export default Resutls;
