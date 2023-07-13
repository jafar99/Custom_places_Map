import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const MapContainer = (props) => {
  const [customPlaces, setCustomPlaces] = useState([
    { lat: 28.6139, lng: 77.2090, name: 'Delhi', link: 'https://example.com/delhi', info: 'Delhi is the capital of India' },
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai', link: 'https://example.com/mumbai' },
    { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', link: 'https://example.com/bengaluru' },
  ]);

  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMapClick = (mapProps, map, clickEvent) => {
    setCustomPlaces([...customPlaces]);
  };

  const handleMarkerClick = (marker, event) => {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const handleMarkerClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  return (
    <Map
      google={props.google}
      zoom={5}
      initialCenter={{ lat: 20.5937, lng: 78.9629 }} // Set initial center to India
      onClick={handleMapClick}
      minZoom={2} // Set minimum zoom level to 2
    >
      {customPlaces.map((place, index) => (
        <Marker
          key={index}
          position={place}
          onClick={handleMarkerClick}
          title={place.name}
        />
      ))}

      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={handleMarkerClose}
      >
        <div>
          <h3>{activeMarker && activeMarker.title}</h3>
          <p>{activeMarker && customPlaces[activeMarker.index].info}</p>
        </div>
      </InfoWindow>
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9bRPuyoRD5xcYV6IWNM547wiEDni4pqM',
})(MapContainer);
