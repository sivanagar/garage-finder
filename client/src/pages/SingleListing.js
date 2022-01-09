import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  Box,
  Button,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { QUERY_LISTING } from '../utils/queries';
import { CONTACT_HOST } from '../utils/mutations';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { flushLayout } from 'framer-motion';

const SingleListing = () => {
  const [message, setText] = useState('');
  const [contactHost, { error }] = useMutation(CONTACT_HOST);
  const { id: listingId } = useParams();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const listing = data ? data.listing : {};
  const [resize, setResize] = React.useState('horizontal');

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;
  const handleFormSubmit = async (event) => {
    const hostUsername = listing.username;
    event.preventDefault();
    contactHost({
      variables: { hostUsername, listingId, message },
    });
    console.log('button clicked');
    console.log('contactText', message);
  };
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
              <FormControl>
                <FormLabel>Contact {listing.username}</FormLabel>
                <Textarea
                  value={message}
                  onChange={(e) => setText(e.target.value)}
                  w="100%"
                  resize="none"
                />
                <Button
                  onClick={handleFormSubmit}
                  variant="secondary"
                  size="sm"
                  m="0.5"
                >
                  Send Message
                </Button>
              </FormControl>
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
