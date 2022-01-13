import { useQuery } from "@apollo/client";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import GoogleApiWrapper from "../components/Map/";
import Result from "../components/Result";
import { QUERY_LISTINGS } from "../utils/queries";

const Resutls = (props) => {
  const location = useLocation();
  const [containerHeight, setContainerHeight] = useState(840);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const { colorMode } = useColorMode();

  const searchedLocation = {
    lat: location.state.addressResult.location.coordinates[1],
    lng: location.state.addressResult.location.coordinates[0],
  };

  const { loading, data } = useQuery(QUERY_LISTINGS, {
    variables: {
      location: {
        type: "Point",
        coordinates: [searchedLocation.lng, searchedLocation.lat], //addressResult.location.coordinates,
      },
      distance: 80467, //if 0 returns all listings, else need coordinates
    },
  });
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    setContainerHeight(windowDimensions.height - 173);
    if (windowDimensions.width <= 480) setContainerHeight(1000);
    console.log("heigth: ", windowDimensions.height);
  }, [location, windowDimensions.height]);

  const results = data ? data.listings : [];

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Flex
        direction={["column-reverse", "row"]}
        justify="flex-start"
        w="100vw"
        h={containerHeight}
      >
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          flexDirection="column"
          overflow="scroll"
        >
          <Heading
            m="2"
            color={colorMode === "light" ? "tertiarydark" : "white"}
          >
            Results
          </Heading>
          {results.map((result) => (
            <Result key={result._id} result={result} />
          ))}
        </Box>
        <Box flex="2" position="relative" minH={[400]}>
          <GoogleApiWrapper
            listings={results}
            searchLocation={searchedLocation}
          />
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default Resutls;
