import { useMutation } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const Login = (props) => {
  const { toggleColorMode } = useColorMode();
  const formBackgroundColor = useColorModeValue("gray.100", "gray.700");
  const formBorderColor = useColorModeValue("gray.300", "gray.800");
  const formFontColor = useColorModeValue("black", "white");
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

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      mt="20"
      bg={formBackgroundColor}
      boxShadow="lg"
    >
      <Box p="6">
        <form onSubmit={handleFormSubmit}>
          <Center>
            <Image
              boxSize="100px"
              src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
            />
          </Center>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              size="lg"
              placeholder="Enter email"
              value={formState.email}
              onChange={handleChange}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl pt="2">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              placeholder="******"
              name="password"
              type="password"
              id="password"
              size="lg"
              value={formState.password}
              onChange={handleChange}
            />
          </FormControl>
          <Center mt="4">
            <Button type="submit" colorScheme="blue" size="lg">
              Login
            </Button>
            <Button onClick={toggleColorMode}>Color Mode</Button>
          </Center>
        </form>
        <Center mt="4">
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error</AlertTitle>
              <AlertDescription>Login Error</AlertDescription>
            </Alert>
          )}
        </Center>
      </Box>
    </Box>
  );
};

export default Login;
