import { useQuery } from "@apollo/client";
import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { Redirect, useParams } from "react-router-dom";
import MyListing from "../components/MyListing";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

const MyListings = () => {
  const { username: userParam } = useParams();
  const { colorMode } = useColorMode();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Heading mt="10" mb="5" color={colorMode === 'light' ? "tertiarydark" : "white"}>
        My Listing
      </Heading>
      <Flex
        w="100%"
        direction={["column", "row"]}
        wrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
      >
        {user.listings.map((listing) => (
          <MyListing key={listing._id} listing={listing} />
        ))}
      </Flex>
    </>
  );
};

export default MyListings;
