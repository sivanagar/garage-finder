import { Flex } from '@chakra-ui/react';
import React from 'react';
import GoogleApiWrapper from '../components/Map/index';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../utils/queries';

const ResultsMap = (props) => {
  const { data } = useQuery(QUERY_LISTINGS, {
    variables: {
      location: {
        type: 'Point',
        coordinates: [0, 0], //addressResult.location.coordinates,
      },
      distance: 0, //if 0 returns all listings, else need coordinates
    },
  });

  const results = data ? data.listings : [];
  console.log('results', results);
  const markerInfo = results[0];
  console.log('markerInfo', markerInfo);

  return (
    <Flex>
      <GoogleApiWrapper listings={results} />
    </Flex>
  );
};

export default ResultsMap;
