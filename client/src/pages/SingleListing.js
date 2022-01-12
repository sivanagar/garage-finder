import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import GoogleApiWrapper from '../components/Map/';

import {
  Box,
  Grid,
  Button,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import ContactHost from '../components/ContactHost';
import { useParams } from 'react-router-dom';
import { QUERY_LISTING } from '../utils/queries';

const SingleListing = () => {
  const loggedIn = Auth.loggedIn();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const { id: listingId } = useParams();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const listing = data ? data.listing : {};
  const listingOwner = loggedIn
    ? Auth.getProfile().data.username === listing.username
    : false;

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  function handleEdit(id) {
    history.push({
      pathname: `/editListing/${listing._id}`,
    });
  }
  return (
    <Flex
      h="200vh"
      py={2}
      px={2}
      direction={['column', 'row']}
      justify={['center', 'flex-start']}
      alignItems={['center', 'flex-start']}
    >
      <VStack w="full" h="full" p={3} spacing={5}>
        <Flex
          direction={['column', 'row']}
          justify={['left', 'flex-start']}
          alignItems={['center', 'flex-start']}
        >
          <Grid
            columns={2}
            columnGap={3}
            rowGap={1}
            w="full"
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(5, 1fr)"
          >
            <GridItem colSpan={1} w="full" colSpan="30%" py="0">
              <Box display="flex" justifyContent="flex-start">
                {listing.type === 'basement' ? (
                  <Image
                    objectFit="cover"
                    src={colorMode === 'light' ? "../../../basement_indigo.svg" : "../../../basement_periwinkle.svg"}
                    alt={listing.type}
                  />
                ) : listing.type === 'attic' ? (
                  <Image
                    objectFit="cover"
                    src={colorMode === 'light' ? "../../../attic_indigo.svg" : "../../../attic_periwinkle.svg"}
                    alt={listing.type}
                  />
                ) : listing.type === 'garage' ? (
                  <Image
                    objectFit="cover"
                    src={colorMode === 'light' ? "../../../garage_indigo.svg" : "../../../garage_periwinkle.svg"}
                    alt={listing.type}
                  />
                ) : listing.type === 'shed' ? (
                  <Image
                    objectFit="cover"
                    src={colorMode === 'light' ? "../../../shed_indigo.svg" : "../../../shed_periwinkle.svg"}
                    alt={listing.type}
                  />
                ) : (
                  <p>Unknown listing type</p>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={4}>
              <Heading
                size="sm"
                colo={colorMode === 'light' ? 'titlelight' : 'titledark'}
              >
                {listing.title}
              </Heading>
            </GridItem>
          </Grid>
        </Flex>
        <GridItem colSpan={1} py="0">
          <Text>{listing.description}</Text>
        </GridItem>
        <SimpleGrid columns={2} columnGap={3} rowGap={1} w="full" py="0">
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Type:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.type}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Address:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.address}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Height:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.height}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Width:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.width}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Depth:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.depth}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Rate:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.rate}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Climate Control:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.climateControl}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Access:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>{listing.accessType}</GridItem>
          <GridItem colSpan={1}>
            <Box display="flex" justifyContent="flex-end">
              Distance:
            </Box>
          </GridItem>
          <GridItem colSpan={1}>distance placeholder</GridItem>
        </SimpleGrid>
      </VStack>
      <VStack w="full" h="full" p={3} spacing={10} alignItems="flex-start">
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan="2">
            {listingOwner ? (
              <Button
                onClick={() => handleEdit(listing._id)}
                variant="primary"
                size="lg"
              >
                EDIT
              </Button>
            ) : loggedIn ? (
              <ContactHost listing={listing} />
            ) : (
              <p>You must be logged in to contact a host</p>
            )}
          </GridItem>
          <GridItem colSpan="2">
            {/* <p>{listing.location.coordinates}</p> */}
            <GoogleApiWrapper listings={[listing]} />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default SingleListing;
