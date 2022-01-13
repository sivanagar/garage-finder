import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const MyListing = ({ listing }) => {
  const {
    rate,
    address,
    accessType,
    climateControl,
    width,
    height,
    depth,
    type,
  } = listing;

  const history = useHistory();
  function handleClick(listing) {
    history.push({
      pathname: `/listing/${listing._id}`,
    });
  }

  return (
    <Box
      onClick={() => handleClick(listing)}
      minW={[320, 340]}
      borderWidth="1px"
      borderRadius="lg"
      m="1"
    >
      <Box p="6">
        <Box>
          <Flex justify="space-between">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {type}
            </Box>
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
          </Flex>

          <Box lineHeight="tight" isTruncated>
            {address}
          </Box>
        </Box>

        <Box>
          {`$ ${rate.toFixed(2)}`}
          <Box as="span" color="gray.600" fontSize="sm">
            / m
          </Box>
        </Box>

        <Box>
          Access Type:
          <Box as="span" color="gray.600" fontSize="sm">
            {accessType}
          </Box>
        </Box>
        <Box>
          Climate Control:
          <Box as="span" color="gray.600" fontSize="sm">
            {(climateControl && "Yes") || "No"}
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

export default MyListing;
