import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
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
    <Flex w={[300, 400]} direction="column" alignItems="center" mt="20">
      <Box
        borderWidth="1px"
        borderColor="primary"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={[4, 10]}
      >
        <Center>
          <Image
            boxSize="100px"
            src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
          />
        </Center>
        <Flex mb="6" justify="center">
          <Heading>Signup</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormControl mb="6">
            <Input
              placeholder="Your username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="6">
            <Input
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="6">
            <Input
              placeholder="Your password"
              name="password"
              type="password"
              id="password"
              value={formState.password}
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

export default Signup;
