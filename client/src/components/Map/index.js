import { Flex, Link, Spacer } from "@chakra-ui/react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { Component } from "react";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    let centerMap = {};
    const listings = this.props.listings || "";
    if (listings[0]) {
      centerMap.lat = listings[0].location.coordinates[1];
      centerMap.lng = listings[0].location.coordinates[0];
    }

    return (
      <Map
        google={this.props.google}
        zoom={9}
        // style={mapStyles}
        initialCenter={this.props.searchLocation || centerMap}
      >
        {this.props.searchLocation && (
          <Marker
            onClick={this.onMarkerClick}
            location={"You Are Here"}
            linkUrl={"/"}
            linkText={"Return Home"}
          />
        )}

        {listings.map((listing) => (
          <Marker
            onClick={this.onMarkerClick}
            location={listing.address}
            position={{
              lat: listing.location.coordinates[1],
              lng: listing.location.coordinates[0],
            }}
            description={listing.description}
            linkUrl={`/listing/${listing._id}`}
            linkText={"View Listing"}
            key={listing._id}
            icon={{
              url: `../../../${listing.type}_indigo.svg`,
              anchor: new window.google.maps.Point(20, 20),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <Flex direction="column">
            <p style={{ color: "black" }}>
              {this.state.selectedPlace.location || ""}
            </p>
            <Link
              style={{ color: "black" }}
              href={this.state.selectedPlace.linkUrl}
            >
              <p style={{ color: "black" }}>
                {this.state.selectedPlace.linkText}
              </p>
            </Link>
            <Spacer mt={2} />
            <p style={{ color: "black" }}>
              {this.state.selectedPlace.description || ""}
            </p>
          </Flex>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(MapContainer);
