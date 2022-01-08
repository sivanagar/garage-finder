
import { useQuery } from "@apollo/client";
import { AddIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  Link as ReactLink,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_USER } from "../utils/queries";


const Profile = () => {
  const history = useHistory();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }
  console.log(data);
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
              <Button
                as={ReactLink}
                to={`/myListings`}
                variant="primary"
                size="lg"
                onClick={handleClickCreateListing}
              >
                <DragHandleIcon />
                &nbsp;My Listings

              </Button>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Profile;
