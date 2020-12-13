import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./style.css"
export class MapPage extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: true
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <div className="mapContainer">
          <Map
            className="map"
            google={this.props.google}
            onClick={this.onMapClicked}
            style={{ height: "700px", position: "relative", width: "100%",  }}
            initialCenter={{ lat: 10.7729078, lng: 106.6600683}}
            zoom={18}
        >
            <Marker
            name="BookStore Online"
            onClick={this.onMarkerClick}
            position={{ lat: 10.7729078, lng: 106.6600683}}
            />


            <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
            >
            <div className="infoWindow">
                <h4 className="infoLine">{this.state.selectedPlace.name}</h4>
                <p className="infoLine">Open: 10 A.M - 9 P.M</p>
                <h5 className="infoLine">268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh</h5>
            </div>
            </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAs7kgF0gVMfJfl4PuJfjYaQ6GLwEyUrBI",
})(MapPage);


