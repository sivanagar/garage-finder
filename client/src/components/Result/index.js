import {
  Box,
  Flex,
  Text,
  Image,
  useColorMode,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
const Result = ({ result }) => {
  console.log(result);
  const { colorMode } = useColorMode();
  const history = useHistory();
  function handleClick(result) {
    console.log('clicked', result);
    history.push({
      pathname: `/listing/${result._id}`,
    });
  }

  var addresses = result.address.split(',').map(function (address, index) {
    return <p key={index}>{address}</p>;
  });

  return (
    <Box
      onClick={() => handleClick(result)}
      w={[300, 300, 220, 300, 400]}
      h={[205, 205, 240, 205, 215]}
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
        <Text fontWeight="bold">{result.title.substring(0, 27)}</Text>
      </Flex>
      <Flex justify="space-between">
        <Box w="16" h="16" display="flex" justifyContent="flex-start">
          {result.type === 'Basement' ? (
            <Image
              objectFit="cover"
              src={
                colorMode === 'light'
                  ? '../../../basement_indigo.svg'
                  : '../../../basement_periwinkle.svg'
              }
              alt={result.type}
            />
          ) : result.type === 'Attic' ? (
            <Image
              objectFit="cover"
              src={
                colorMode === 'light'
                  ? '../../../attic_indigo.svg'
                  : '../../../attic_periwinkle.svg'
              }
              alt={result.type}
            />
          ) : result.type === 'Garage' ? (
            <Image
              objectFit="cover"
              src={
                colorMode === 'light'
                  ? '../../../garage_indigo.svg'
                  : '../../../garage_periwinkle.svg'
              }
              alt={result.type}
            />
          ) : result.type === 'Shed' ? (
            <Image
              objectFit="cover"
              src={
                colorMode === 'light'
                  ? '../../../shed_indigo.svg'
                  : '../../../shed_periwinkle.svg'
              }
              alt={result.type}
            />
          ) : (
            <p>Unknown listing type</p>
          )}
        </Box>
        <VStack spacing={0} align="stretch" alignItems="flex-end">
          <Box>
            <Text fontWeight="bold">${result.rate}/m</Text>
          </Box>
          <Box>
            <Text>
              {result.height} x {result.width} x {result.depth} ft
            </Text>
          </Box>
          <Box>
            <Text pl="2">{result.accessType} access</Text>
          </Box>
        </VStack>
      </Flex>
      <Flex h="75px" py="3">
        <div className="address">{addresses}</div>
      </Flex>
    </Box>
  );
};

export default Result;
