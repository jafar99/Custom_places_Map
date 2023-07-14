import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './App.css';

const MapContainer = (props) => {
  const [customPlaces, setCustomPlaces] = useState([
    { lat: 28.6139, lng: 77.2090, name: 'Delhi', state: 'Delhi', link: 'http://192.168.1.203:3001' },
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai', state: 'Maharashtra', link: '#' },
    { lat: 16.7050, lng: 74.2433, name: 'Kolhapur', state: 'Maharashtra', link: '#' },
    { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', state: 'Karnataka', link: '#' },
  ]);

  const [selectedState, setSelectedState] = useState('');

  const handleMapClick = (mapProps, map, clickEvent) => {
    setCustomPlaces([...customPlaces]);
  };

  const handleMarkerClick = (index) => {
    window.location.href = customPlaces[index].link;
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const allStates = [
    'All Sites',
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Map
        google={props.google}
        zoom={5}
        initialCenter={{ lat: 20.5937, lng: 78.9629 }} // Set initial center to India
        onClick={handleMapClick}
        minZoom={2} // Set minimum zoom level to 2
      >
        <div className='dropdown-container'>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {allStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {customPlaces.map((place, index) => {
          if (selectedState === 'All Sites' || place.state.toLowerCase() === selectedState.toLowerCase()) {
            return (
              <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => handleMarkerClick(index)}
                title={place.name}
              />
            );
          } else {
            return null;
          }
        })}
      </Map>
    </div>
  );
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9bRPuyoRD5xcYV6IWNM547wiEDni4pqM',
})(MapContainer);
