import { Flex, Heading, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Result from '../components/Result';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../utils/queries';

const Resutls = (props) => {
  const { loading, data } = useQuery(QUERY_LISTINGS, {
    // variables: {
    // }
  });
  const results = data ? data.listings : [];

  const location = useLocation();

  useEffect(() => {
    console.log('search Info', location.state.search);
  }, [location]);

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
