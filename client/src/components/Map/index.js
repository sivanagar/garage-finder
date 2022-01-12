import { Flex, Link, Spacer, Text } from '@chakra-ui/react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const mapStyles = {
  width: '50%',
  height: '50%',
  position: 'relative',
};

// CHANGE TO ADDRESS SEARCHED

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
    const listings = this.props.listings || '';

    const centerMap = {
      lat: listings[0].location.coordinates[1],
      lng: listings[0].location.coordinates[0],
    };

    return (
      <Flex direction="row" position="relative" h={500} w={1000}>
        <Map
          google={this.props.google}
          zoom={9}
          style={mapStyles}
          initialCenter={this.props.searchLocation || centerMap}
        >
          {this.props.searchLocation && (
            <Marker
              onClick={this.onMarkerClick}
              location={'You Are Here'}
              linkUrl={'/'}
              linkText={'Return Home'}
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
              linkText={'View Listing'}
              key={listing._id}
              icon={{
                url: '../../../shed_indigo.svg',
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
            <Flex direction="column" color="black">
              <Text>{this.state.selectedPlace.location || ''}</Text>
              <Link href={this.state.selectedPlace.linkUrl}>
                <Text>{this.state.selectedPlace.linkText}</Text>
              </Link>
              <Spacer mt={2} />
              <Text>{this.state.selectedPlace.description || ''}</Text>
            </Flex>
          </InfoWindow>
        </Map>
      </Flex>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(MapContainer);
