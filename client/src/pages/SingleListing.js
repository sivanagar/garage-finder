import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';
import Auth from '../utils/auth';
import { Button, Flex, Heading, useColorMode, Image, Container, VStack} from "@chakra-ui/react";

const SingleListing = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
      <Flex h="100vh" py={20}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <header>{listing.title}</header>
          <p>{listing.description}</p>
          </VStack>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" bg={colorMode === "light" ? "tertiary" : "tertiarydark"}>
          </VStack>
      <h1>{listing.address}</h1>
      <p>{listing.rate}</p>
      <p>{listing.climateControl}</p>
      <p>{listing.type}</p>
      <p>{listing.accessType}</p>
      <p>{listing.height}</p>
      <p>{listing.width}</p>
      <p>{listing.depth}</p>
      <p>{listing.username}</p>
      <p>{listing.location.coordinates}</p>
      </Flex>
    </Container>
  );
};

export default SingleListing;
