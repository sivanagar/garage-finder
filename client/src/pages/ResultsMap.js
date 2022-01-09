import { Flex } from '@chakra-ui/react';
import React from 'react';
import GoogleApiWrapper, { MapContainer } from "../components/Map/index";
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../utils/queries';
import { useLocation } from 'react-router-dom';
import Result from '../components/Result';

const ResultsMap = (props) => {
    const { loading, data } = useQuery(QUERY_LISTINGS, {
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
            <GoogleApiWrapper
                listings={results}
                location0={'7 Lisa Ct.'}
                lat0={'38.02'}
                lng0={'-122.54'}
                description0={"Seanalan's House"}
            />
        </Flex>
    );
};

export default ResultsMap;