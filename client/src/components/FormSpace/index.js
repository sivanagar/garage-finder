import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { ADD_USER, ADD_LISTING } from '../../utils/mutations';

const spaceTypes = ['garage', 'shed', 'basement', 'attic'];

const FormSpace = (props) => {
  const [formState, setFormState] = useState({
    username: '',
    type: '',
    password: '',
    height: '',
    width: '',
    depth: '',
    description: '',
    rate: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log('formState', formState);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
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
          <Heading>Create Space</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
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
            <Select
              id="type"
              name="type"
              size="lg"
              value={formState.type}
              onChange={handleChange}
              color="primary"
              _active={{ color: 'primary', borderColor: 'primary' }}
            >
              {spaceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Height"
              name="height"
              type="text"
              id="height"
              size="lg"
              _placeholder={{ color: 'primary' }}
              _focus={{ color: 'primary', borderColor: 'primary' }}
              value={formState.height}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Width"
              name="width"
              type="text"
              id="width"
              size="lg"
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              value={formState.width}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Depth"
              name="depth"
              type="text"
              id="depth"
              size="lg"
              _focus={{ color: 'primary', borderColor: 'primary' }}
              _placeholder={{ color: 'primary' }}
              value={formState.depth}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Rate"
              name="rate"
              type="text"
              id="rate"
              size="lg"
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Center>
        </form>

        {error && <div>Signup failed</div>}
      </Box>
    </Flex>
  );
};

export default FormSpace;
