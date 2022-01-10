import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';
import Auth from '../utils/auth';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Switch,
  Textarea,
} from '@chakra-ui/react';

const spaceTypes = ['garage', 'shed', 'basement', 'attic'];
const accessTypes = ['24hr', 'scheduled'];

const EditListing = () => {
  const { id: listingId } = useParams();
  const loggedIn = Auth.loggedIn();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    type: '',
    height: '',
    width: '',
    depth: '',
    address: '',
    climateControl: '',
    accessType: '',
    rate: '',
  });

  const listing = data ? data.listing : {};
  console.log('listing', listing);
  const listingOwner = loggedIn
    ? Auth.getProfile().data.username === listing.username
    : false;

  // if (listing !== {}) {
  //   console.log('valid listing');
  //   setFormState({
  //     title: listing.title,
  //     description: listing.description,
  //     price: listing.price,
  //     type: listing.type,
  //     height: listing.height,
  //     width: listing.width,
  //     depth: listing.depth,
  //     address: listing.address,
  //     climateControl: listing.climateControl,
  //     accessType: listing.accessType,
  //     rate: listing.rate,
  //   });
  // }
  if (!listingOwner) {
    return <p>You are not authorized to edit this listing</p>;
  }
  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.name);
  };
  const handleFormSubmit = async (event) => {
    console.log(event.target.name);
  };
  return (
    <Flex
      w={['98%', 400, 800]}
      direction="column"
      alignItems="center"
      mt="20"
      mb="10"
    >
      <Box
        borderWidth="1px"
        borderColor="primary"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={[4, 10]}
      >
        <Flex mb="6" justify="center">
          <Heading>Edit Listing</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
          <FormControl mb="6">
            <Input
              placeholder="Title"
              name="title"
              type="text"
              id="title"
              size="lg"
              _placeholder={{ color: 'primary' }}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              value={listing.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Address"
              name="address"
              type="text"
              id="address"
              size="lg"
              _placeholder={{ color: 'primary' }}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              value={listing.address}
              onChange={handleChange}
              //should be disabled for edits
            />
          </FormControl>

          <FormControl mb="6">
            <Select
              id="type"
              name="type"
              size="lg"
              value={listing.type}
              onChange={handleChange}
              color="primary"
              _active={{ color: 'primary', borderColor: 'primary' }}
            >
              <option value="">--Select Listing Type--</option>
              {spaceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb="6">
            <Select
              id="accessType"
              name="accessType"
              size="lg"
              value={listing.accessType}
              onChange={handleChange}
              color="primary"
              _active={{ color: 'primary', borderColor: 'primary' }}
            >
              <option value="">--Select Access Type--</option>
              {accessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center" my="4">
            <FormLabel htmlFor="climateControl" mb="0">
              Climate Control?
            </FormLabel>
            <Switch
              colorScheme="purple"
              size="lg"
              id="climateControl"
              name="climateControl"
              checked={listing.climateControl}
              onChange={handleChange}
            />
          </FormControl>
          <HStack mb="6">
            <FormControl>
              <Input
                placeholder="Height (FT)"
                name="height"
                type="number"
                textAlign="right"
                id="height"
                size="lg"
                _placeholder={{ color: 'primary' }}
                _focus={{ color: 'primary', borderColor: 'primary' }}
                value={listing.height}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Width (FT)"
                name="width"
                type="number"
                textAlign="right"
                id="width"
                size="lg"
                _focus={{ color: 'primary', borderColor: 'primary' }}
                _placeholder={{ color: 'primary' }}
                value={listing.width}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Depth (FT)"
                name="depth"
                type="number"
                textAlign="right"
                id="depth"
                size="lg"
                _focus={{ color: 'primary', borderColor: 'primary' }}
                _placeholder={{ color: 'primary' }}
                value={listing.depth}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>

          <FormControl mb="6">
            <Input
              placeholder="Monthly Rate"
              name="rate"
              type="number"
              id="rate"
              size="lg"
              textAlign="right"
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              value={listing.rate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Textarea
              placeholder="Description"
              name="description"
              id="description"
              size="lg"
              h={[100, 150]}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              value={listing.description}
              onChange={handleChange}
            />
          </FormControl>

          <Center>
            <Button variant="primary" type="submit" size="lg">
              Save
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default EditListing;
