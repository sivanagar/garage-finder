import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
const Result = ({ result }) => {
  const history = useHistory();
  function handleClick(result) {
    console.log('clicked', result);
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
        background: 'gray.50',
        color: 'purple.500',
      }}
    >
      <Flex justify="space-between">
        <Text fontWeight="bold">{result.title}</Text>
      </Flex>
      <Flex justify="space-between">
      <Box w="16" h="16" display="flex" justifyContent="flex-start">
                {result.type === 'Basement' ? (
                  <Image
                    objectFit="cover"
                    src="../../../basement.png"
                    alt={result.type}
                  />
                ) : result.type === 'Attic' ? (
                  <Image
                    objectFit="cover"
                    src="../../../attic.png"
                    alt={result.type}
                  />
                ) : result.type === 'Garage' ? (
                  <Image
                    objectFit="cover"
                    src="../../../garage.png"
                    alt={result.type}
                  />
                ) : result.type === 'Shed' ? (
                  <Image
                    objectFit="cover"
                    src="../../../shed.svg"
                    alt={result.type}
                  />
                ) : (
                  <p>Unknown listing type</p>
                )}
              </Box>
        <Text fontWeight="bold">${result.rate}/m</Text>
      </Flex>
      <Flex h="24px">
        <Text pl="2">{result.address}</Text>
      </Flex>
      <Flex h="24px">
        <Text pl="2">{result.size}</Text>
      </Flex>
      <Flex h="24px" justify="start">
        <Text pl="2">{result.accessType} access</Text>
      </Flex>
    </Box>
  );
};

export default Result;
