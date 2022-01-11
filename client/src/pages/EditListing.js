import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
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
  useColorMode
} from '@chakra-ui/react';
import { EDIT_LISTING } from '../utils/mutations';

const spaceTypes = ['Garage', 'Shed', 'Basement', 'Attic'];
const accessTypes = ['24hr', 'scheduled'];

const EditListing = () => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const [editListing, { error }] = useMutation(EDIT_LISTING);
  const { id: listingId } = useParams();
  const loggedIn = Auth.loggedIn();
  const { data, loading } = useQuery(QUERY_LISTING, {
    variables: {
      _id: listingId,
    },
  });

  const [formState, setFormState] = useState({});

  const listing = data ? data.listing : {};
  const listingOwner = loggedIn
    ? Auth.getProfile().data.username === listing.username
    : false;

  if (!listingOwner) {
    return <p>You are not authorized to edit this listing</p>;
  }
  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'climateControl') {
      setFormState({
        ...formState,
        [name]: event.target.checked,
      });
    } else if (
      name === 'width' ||
      name === 'height' ||
      name === 'depth' ||
      name === 'rate'
    ) {
      setFormState({
        ...formState,
        [name]: Number(value),
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editListing({
        variables: { ...formState, _id: listingId },
      });
      if (data) {
        history.push('/profile');
      }
    } catch (e) {
      console.error(e);
    }
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
          <Heading color={colorMode === 'light' ? "tertiarydark" : "white"}>Edit Listing</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
          <FormControl mb="6">
            <Input
              placeholder={listing.title}
              name="title"
              type="text"
              id="title"
              size="lg"
              _placeholder={{ color: 'primary' }}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder={listing.address}
              name="address"
              type="text"
              id="address"
              size="lg"
              _placeholder={{ color: 'primary' }}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              // value={listing.address}
              // onChange={handleChange}
              //should be disabled for edits
            />
          </FormControl>

          <FormControl mb="6">
            <Select
              id="type"
              name="type"
              size="lg"
              placeholder={listing.type}
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
              placeholder={listing.accessType}
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
                name="height"
                type="number"
                textAlign="right"
                id="height"
                size="lg"
                _placeholder={{ color: 'primary' }}
                _focus={{ color: 'primary', borderColor: 'primary' }}
                placeholder={listing.height}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                name="width"
                type="number"
                textAlign="right"
                id="width"
                size="lg"
                _focus={{ color: 'primary', borderColor: 'primary' }}
                _placeholder={{ color: 'primary' }}
                placeholder={listing.width}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                name="depth"
                type="number"
                textAlign="right"
                id="depth"
                size="lg"
                _focus={{ color: 'primary', borderColor: 'primary' }}
                _placeholder={{ color: 'primary' }}
                placeholder={listing.depth}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>

          <FormControl mb="6">
            <Input
              name="rate"
              type="number"
              id="rate"
              size="lg"
              textAlign="right"
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              placeholder={listing.rate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Textarea
              name="description"
              id="description"
              size="lg"
              h={[100, 150]}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              placeholder={listing.description}
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
