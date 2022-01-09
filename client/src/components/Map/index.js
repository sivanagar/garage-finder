import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Flex } from '@chakra-ui/react';

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
    return (
      <Flex direction="row" position='relative' h={500} w={1000}>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={searchLocation ||
            {
              lat: 37.7749,
              lng: -122.4194
            }
          }
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'You Are Here!'}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={this.props.name1}
            position={{ lat: 37.778519, lng: -122.405640 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <Flex>
              {this.state.selectedPlace.name}
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