import { Input } from "@chakra-ui/react";
import { useState } from "react";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import getAddressComponents from "../../utils/getAddressComponents";

const SearchAutoComplete = (props) => {
  const { setResult } = props;
  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);

    setAddress(value);

    //Get Address Components
    const street_number = getAddressComponents(
      results[0].address_components,
      "street_number"
    );

    const street = getAddressComponents(results[0].address_components, "route");
    const city = getAddressComponents(
      results[0].address_components,
      "locality"
    );
    const state = getAddressComponents(
      results[0].address_components,
      "administrative_area_level_1"
    );
    const zip = getAddressComponents(
      results[0].address_components,
      "postal_code"
    );

    const addressLine1 = `${street_number} ${street}`;
    const fullAddress = `${addressLine1}, ${city}, ${state} ${zip}`;

    setResult({
      address: fullAddress,
      addressLine1,
      city,
      state,
      zip,
      location: {
        type: "Point",
        coordinates: [latLng.lng, latLng.lat],
      },
    });
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
              id="enter-address"
              size="lg"
              _placeholder={{ color: "primary" }}
              _focus={{ color: "primary", borderColor: "primary" }}
              {...getInputProps({ placeholder: "Enter an address" })}
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  color: suggestion.active ? "#fff" : "#805ad5",
                  backgroundColor: suggestion.active ? "#805ad5" : "#fff",
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
