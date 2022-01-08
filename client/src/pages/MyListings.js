import { Flex, Heading } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import MyListing from "../components/MyListing";
import Auth from "../utils/auth";

const listingsData = [
  {
    _id: "5d1b6c6b7f0f9b0f8c7f8b0a",
    type: "garage",
    address: "123 Main Street",
    accessType: "24h",
    climateControl: true,
    description: "This is a great place to live",
    height: 10,
    width: 10,
    depth: 10,
    rate: 50,
    formattedRate: "$50",
    active: true,
  },
  {
    _id: "5d1b6c6b7f0f9b0f8c7f8b0e",
    type: "attic",
    address: "123 Main Street",
    accessType: "24h",
    climateControl: true,
    description: "This is a great place to live",
    height: 10,
    width: 10,
    depth: 10,
    rate: 50,
    formattedRate: "$50",
    active: true,
  },
  {
    _id: "5d1b6c6b7f0f9b0f8c7f8bdf",
    type: "garage",
    address: "123 Main Street",
    accessType: "24h",
    climateControl: true,
    description: "This is a great place to live",
    height: 10,
    width: 10,
    depth: 10,
    rate: 50,
    formattedRate: "$50",
    active: true,
  },
];

const MyListings = () => {
  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Heading mt="10" mb="5">
        My Listing
      </Heading>
      <Flex
        w="100%"
        direction={["column", "row"]}
        wrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
      >
        {listingsData.map((listing) => (
          <MyListing key={listing._id} listing={listing} />
        ))}
      </Flex>
    </>
  );
};

export default MyListings;
