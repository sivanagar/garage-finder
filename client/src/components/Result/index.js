import { Box, Flex, Text } from "@chakra-ui/react";
const Result = ({ result }) => {
  return (
    <Box
      onClick={() => console.log("Result: ", result)}
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      mt="4"
      borderWidth="1px"
      borderRadius="sm"
      p="2"
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
