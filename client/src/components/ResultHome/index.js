import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const ResultHome = ({ result }) => {
  const {
    rate,
    address,
    city,
    state,
    zip,
    location,
    accessType,
    climateControl,
    width,
    height,
    depth,
    type,
  } = result;

  const history = useHistory();
  function handleClick(result) {
    history.push({
      pathname: `/listing/${result._id}`,
    });
  }

  return (
    <Box
      onClick={() => handleClick(result)}
      minW={[340, 240]}
      borderWidth="1px"
      borderRadius="lg"
      m="1"
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {`${height}' x ${width}' x ${depth}'`}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {type}
        </Box>

        <Box>
          {rate}
          <Box as="span" color="gray.600" fontSize="sm">
            / m
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < 20 ? "primary" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            20 reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultHome;
