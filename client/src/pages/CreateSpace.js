import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";

const spaceTypes = ["garage", "shed", "basement", "attic"];

const CreateSpace = () => {
  const history = useHistory();
  const location = useLocation();
  const [addressResult, setAddressResult] = useState(location.state);
  //set the form values
  const [formState, setFormState] = useState({
    type: "",
    password: "",
    height: "",
    width: "",
    depth: "",
    description: "",
    rate: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    lng: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    setAddressResult(location.state);
    setFormState({
      ...formState,
      ...location.state.addressResult,
    });
  }, [location]);

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
    console.log("formState", formState);

    // try {
    //   const { data } = await addUser({
    //     variables: { ...formState },
    //   });

    //   Auth.login(data.addUser.token);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <Flex
      w={["98%", 400, 800]}
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
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormControl mb="6">
            <Input
              placeholder="Address Line 1"
              name="addressLine1"
              type="text"
              id="addressLine1"
              size="lg"
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
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
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
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
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
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
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
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
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
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
              _active={{ color: "primary", borderColor: "primary" }}
            >
              {spaceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
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
                _placeholder={{ color: "primary" }}
                _focus={{ color: "primary", borderColor: "primary" }}
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
                _focus={{ color: "primary", borderColor: "primary" }}
                _placeholder={{ color: "primary" }}
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
                _focus={{ color: "primary", borderColor: "primary" }}
                _placeholder={{ color: "primary" }}
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
              _focus={{ color: "primary", borderColor: "primary" }}
              _placeholder={{ color: "primary" }}
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
              _focus={{ color: "primary", borderColor: "primary" }}
              _placeholder={{ color: "primary" }}
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
              onClick={() => history.push("/searchCreate")}
            >
              Change Address
            </Button>
            <Button variant="primary" type="submit" size="lg">
              Submit
            </Button>
          </Center>
        </form>

        {error && <div>Signup failed</div>}
      </Box>
    </Flex>
  );
};

export default CreateSpace;
