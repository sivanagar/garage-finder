import { Box, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Result = ({ result }) => {
  const history = useHistory();
  function handleClick(result) {
    console.log("clicked", result);
    history.push({
      pathname: `/listing/${result._id}`,
    });
  }
  return (
    <Box
      onClick={() => handleClick(result)}
      w={[300, 400]}
      borderWidth="1px"
      borderRadius="lg"
      m="2"
      p="4"
      cursor="pointer"
      boxShadow="lg"
      _hover={{
        background: "gray.50",
        color: "purple.500",
      }}
    >
      <Flex justify="space-between">
        <Text fontWeight="bold">{result.type}</Text>
        <Text fontWeight="bold">{result.rate}/m</Text>
      </Flex>
      <Flex h="24px">
        <Text pl="2">{result.address}</Text>
      </Flex>
      <Flex h="24px">
        <Text pl="2">{result.size}</Text>
      </Flex>
      <Flex h="24px" justify="end">
        <Text pl="2">{result.accessType}</Text>
      </Flex>
    </Box>
  );
};

export default Result;
