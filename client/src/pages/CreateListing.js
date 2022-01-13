import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Switch,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { ADD_LISTING } from '../utils/mutations';

const spaceTypes = ['Garage', 'Shed', 'Basement', 'Attic'];
const accessTypes = ['24hr', 'Scheduled'];

const CreateListing = () => {
  const history = useHistory();
  const location = useLocation();
  const { colorMode } = useColorMode();

  //set the form values
  const [formState, setFormState] = useState({
    title: '',
    type: '',
    height: '',
    width: '',
    depth: '',
    description: '',
    rate: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    climateControl: false,
    accessType: '',
  });
  const [addListing, { error }] = useMutation(ADD_LISTING);

  useEffect(() => {
    setFormState((prevState) => ({
      ...formState,
      ...location.state.addressResult,
    }));
  }, [location]);

  // update state based on form input changes
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

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('formState', formState);

    try {
      const { data } = await addListing({
        variables: { ...formState },
      });
      if (data) {
        history.push('/profile');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // if (!Auth.loggedIn()) {
  //   return <Redirect to="/profile" />;
  // }

  return (
    <>
      <Container maxW="container.lg" centerContent>
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
              <Heading color={colorMode === 'light' ? 'tertiarydark' : 'white'}>
                Listing Profile
              </Heading>
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
                  value={formState.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="6">
                <Input
                  placeholder="Address Line 1"
                  name="addressLine1"
                  type="text"
                  id="addressLine1"
                  size="lg"
                  _placeholder={{ color: 'primary' }}
                  _focus={{ color: 'primary', borderColor: 'primary' }}
                  value={formState.addressLine1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="6">
                <Input
                  placeholder="Address Line 2"
                  name="addressLine2"
                  type="text"
                  id="addressLine2"
                  size="lg"
                  _placeholder={{ color: 'primary' }}
                  _focus={{ color: 'primary', borderColor: 'primary' }}
                  value={formState.addressLine2}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="6">
                <Input
                  placeholder="City"
                  name="city"
                  type="text"
                  id="city"
                  size="lg"
                  _placeholder={{ color: 'primary' }}
                  _focus={{ color: 'primary', borderColor: 'primary' }}
                  value={formState.city}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb="6">
                <Input
                  placeholder="State"
                  name="state"
                  type="text"
                  id="state"
                  size="lg"
                  _placeholder={{ color: 'primary' }}
                  _focus={{ color: 'primary', borderColor: 'primary' }}
                  value={formState.state}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb="6">
                <Input
                  placeholder="Zip"
                  name="zip"
                  type="text"
                  id="zip"
                  size="lg"
                  _placeholder={{ color: 'primary' }}
                  _focus={{ color: 'primary', borderColor: 'primary' }}
                  value={formState.zip}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb="6">
                <Select
                  id="type"
                  name="type"
                  size="lg"
                  value={formState.type}
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
                  value={formState.accessType}
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
                  Climate Controled
                </FormLabel>
                <Switch
                  colorScheme="purple"
                  size="lg"
                  id="climateControl"
                  name="climateControl"
                  checked={formState.climateControl}
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
                    value={formState.height}
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
                    value={formState.width}
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
                    value={formState.depth}
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
                  value={formState.rate}
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
                  value={formState.description}
                  onChange={handleChange}
                />
              </FormControl>

              <Center>
                <Button
                  variant="primary"
                  type="button"
                  size="lg"
                  mr="2"
                  onClick={() => history.push('/searchCreate')}
                >
                  Edit Address
                </Button>
                <Button variant="primary" type="submit" size="lg">
                  Submit
                </Button>
              </Center>
            </form>

            {error && <div>Listing Creation Failed</div>}
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default CreateListing;
