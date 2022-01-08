import { useMutation } from "@apollo/client";
import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //Validate Form Values
    if (formState.email === "") {
      setIsEmailError(true);
      return;
    } else if (formState.password === "") {
      setIsPasswordError(true);
      return;
    }

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
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
          <Heading>Login</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormControl mb="6" isInvalid={isEmailError}>
            <Input
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormErrorMessage>Email is required.</FormErrorMessage>
          <FormControl mb="6" isInvalid={isPasswordError}>
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
            <Button variant="primary" size="lg" type="submit">
              <LockIcon /> Login
            </Button>
          </Center>
        </form>

        {error && <div>Signup failed</div>}
      </Box>
    </Flex>
  );
};

export default Login;
