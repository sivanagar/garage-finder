import { Box, Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Result = ({ result }) => {
  const history = useHistory();
  function handleClick(result) {
    console.log("clicked", result);
    history.push({
      pathname: "/space",
      state: { result },
    });
  }
  return (
    <Box
      onClick={() => handleClick(result)}
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      mt="4"
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
        <Text p="2">{result.address}</Text>
      </Flex>
      <Flex h="24px">
        <Text p="2">{result.size}</Text>
      </Flex>
      <Flex h="24px" justify="end">
        <Text p="2">{result.accessType}</Text>
      </Flex>
    </Box>
  );
};

export default Result;
