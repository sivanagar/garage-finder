import { Input } from "@chakra-ui/react";
import { useState } from "react";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import getAddressComponents from "../../utils/getAddressComponents";

const SearchAutoComplete = (props) => {
  const { setSearch } = props;
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value);
    setCoordinates(latLng);

    //get zip code
    const zip = getAddressComponents(
      results[0].address_components,
      "postal_code"
    );

    setSearch({ lat: latLng.lat, lng: latLng.lng, zip });
    console.log("Resutls", results);
  };

  return (
    <>
      <PlacesAutoComplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              size="lg"
              {...getInputProps({ placeholder: "Type address" })}
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutoComplete>
    </>
  );
};

export default SearchAutoComplete;
