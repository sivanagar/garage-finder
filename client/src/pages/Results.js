import { Flex, Heading, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Result from '../components/Result';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../utils/queries';

const Resutls = (props) => {
  const location = useLocation();

  const searchedLocation = location.state.search;
  console.log('searchedLocation', searchedLocation);
  const { loading, data } = useQuery(QUERY_LISTINGS, {
    variables: {
      location: {
        type: 'Point',
        coordinates: [0, 0], //addressResult.location.coordinates,
      },
      distance: 0, //if 0 returns all listings, else need coordinates
    },
  });
  useEffect(() => {
    console.log('search Info', location.state.search);
  }, [location]);
  const results = data ? data.listings : [];

  function handleSort(sortBy) {
    console.log('sortBy', sortBy);
  }

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
      <Flex
        w="100%"
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
    </>
  );
};

export default Resutls;
