import { Flex, Heading, Link } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Result from "../components/Result";

const results = [
  {
    _id: "1",
    type: "Apartment",
    rate: "$1,000",
    address: "123 Main St",
    size: "10`x10`",
    accessType: "24h",
    description: "",
    username: "roblox65",
  },
  {
    _id: "2",
    type: "Garage",
    rate: "$1,000",
    address: "123 Main St",
    size: "10`x10`",
    accessType: "By Appointment Only",
    username: "roblox65",
  },
  {
    _id: "3",
    type: "Room",
    rate: "$1,000",
    address: "123 Main St",
    size: "10`x10`",
    accessType: "24h",
    username: "roblox65",
  },
];

const Resutls = (props) => {
  const location = useLocation();

  useEffect(() => {
    console.log("search Info", location.state.search);
  }, [location]);

  function handleSort(sortBy) {
    console.log("sortBy", sortBy);
  }

  return (
    <>
      <Heading mt="10" mb="4">
        Results
      </Heading>
      <Flex w="50%" mb="2" direction="row" justifyContent="space-around">
        <Link onClick={() => handleSort("price")}>Price</Link>
        <Link onClick={() => handleSort("size")}>Size</Link>
        <Link onClick={() => handleSort("distance")}>Distance</Link>
        <Link>View Map</Link>
      </Flex>
      <Flex direction="row" wrap="wrap" m="-2">
        {results.map((result) => (
          <Result key={result._id} result={result} />
        ))}
      </Flex>
    </>
  );
};

export default Resutls;
