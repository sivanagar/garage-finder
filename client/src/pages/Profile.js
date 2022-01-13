import { useQuery } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Result from "../components/Result";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const location = useLocation();
  const { username: userParam } = useParams();

  const { loading, data, refetch } = useQuery(QUERY_ME);

  useEffect(() => {
    refetch();
  }, [location]);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }
  const user = data?.me || data?.user || {};

  function handleClickCreateListing() {
    history.push(`/searchCreate`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Container maxW="container.lg" centerContent>
        <Center>
          <Box mt="10" p="4" w={[320, 500]} borderWidth="1px" borderRadius="lg">
            <Flex
              w="100%"
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Avatar size="2xl" name={user.username} src="" mb="4" />
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
              <Flex mt="4" w="100%" justify="center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleClickCreateListing}
                >
                  <AddIcon />
                  &nbsp;Create Listing
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Center>

        {
          <Center>
            <Box
              mt="4"
              p="4"
              w={[320, 1024]}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Flex
                w="100%"
                alignItems="center"
                justify="center"
                direction="column"
              >
                <Heading
                  color={colorMode === "light" ? "tertiarydark" : "white"}
                >
                  My Listings
                </Heading>
                <Flex
                  w="100%"
                  direction="row"
                  wrap="wrap"
                  justifyContent="center"
                  alignItems="center"
                  m="2"
                >
                  {user.listings.map((listing) => (
                    <Result key={listing._id} result={listing} />
                  ))}
                </Flex>
              </Flex>
            </Box>
          </Center>
        }
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
