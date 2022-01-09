import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Flex, Spacer, Text } from '@chakra-ui/react';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

// CHANGE TO ADDRESS SEARCHED
let searchLocation;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const listings = this.props.listings || '';

    return (
      <Flex direction="row" position='relative' h={500} w={1000}>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={this.props.searchLocation ||
            {
              lat: 37.7749,
              lng: -122.4194
            }
          }
        >
          <Marker
            onClick={this.onMarkerClick}
            location={"You Are Here"}
          />
          {listings.map((listing) => (
            <Marker
              onClick={this.onMarkerClick}
              location={listing.address}
              position={{ lat: listing.location.coordinates[0], lng: listing.location.coordinates[1] }}
              description={listing.description}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <Flex direction="column">
              <Text>{this.state.selectedPlace.location}</Text>
              <Spacer mt={2} />
              <Text>{this.state.selectedPlace.description || 'No description'}</Text>
            </Flex>
          </InfoWindow>
        </Map>
      </Flex>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY
})(MapContainer);