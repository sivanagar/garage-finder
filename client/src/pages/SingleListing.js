import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import ContactHost from '../components/ContactHost';
import { useParams } from 'react-router-dom';
import { QUERY_LISTING } from '../utils/queries';

const SingleListing = () => {
  const loggedIn = Auth.loggedIn();

  const { id: listingId } = useParams();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const listing = data ? data.listing : {};

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <Container maxW="container.xl">
      <Flex h="200vh" py={2} px={2}>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={5}
          alignItems="flex-start"
          bg="gray.50"
        >
          <VStack alignItems="flex-start">
            <Heading size="2xl">{listing.title}</Heading>
            <Text>{listing.description}</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={1}>
              <Box display="flex" justifyContent="flex-end">
                Distance:
              </Box>
            </GridItem>
            <GridItem colSpan={1}>distance placeholder</GridItem>
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
                Type:
              </Box>
            </GridItem>
            <GridItem colSpan={1}>{listing.type}</GridItem>
            <GridItem colSpan={1}>
              <Box display="flex" justifyContent="flex-end">
                Access:
              </Box>
            </GridItem>
            <GridItem colSpan={1}>{listing.accessType}</GridItem>
          </SimpleGrid>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        >
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan="2">
              {loggedIn ? (
                <ContactHost listing={listing} />
              ) : (
                <p>You must be logged in to contact a host</p>
              )}
            </GridItem>
            <GridItem colSpan="2">
              {/* <p>{listing.location.coordinates}</p> */}
              <Image src="../../../map_placeholder.png" />
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </Container>
  );
};

export default SingleListing;
