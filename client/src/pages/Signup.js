import { useMutation } from "@apollo/client";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  useColorMode,
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
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [errorMesage, setErrorMessage] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const { colorMode } = useColorMode();

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

    //Validate Inputs
    if (formState.username === "") {
      setIsUsernameError(true);
      return;
    }
    if (formState.email === "") {
      setIsEmailError(true);
      return;
    }
    if (formState.password === "") {
      setIsPasswordError(true);
      return;
    }

    if (formState.password.length < 6) {
      setIsPasswordError(true);
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e.message);
      if (e.message.includes("E11000")) {
        if (e.message.includes("username"))
          setErrorMessage("Username already exists");
        else if (e.message.includes("email"))
          setErrorMessage("Email already exists");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <Flex w={[300, 400]} direction="column" alignItems="center" mt="5">
      <Box
        borderWidth="1px"
        borderColor="primary"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={[4]}
      >
        <Center>
        <Image w="80px" src={colorMode === 'light' ? "../../../H_dark_purple.svg" : "../../../H.svg"} mb="10" />
        </Center>
        <Flex mb="6" justify="center">
          <Heading color={colorMode === 'light' ? "tertiarydark" : "white"}>Sign up</Heading>
        </Flex>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormControl mb="6" isInvalid={isUsernameError}>
            <Input
              placeholder="Your username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
          </FormControl>
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
            <Button variant="primary" type="submit">
              <ChevronRightIcon /> Submit
            </Button>
          </Center>
        </form>

        {errorMesage && (
          <Alert status="error" mt="2">
            <AlertIcon />
            {errorMesage}
          </Alert>
        )}
      </Box>
    </Flex>
  );
};

export default Signup;
