import React from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 6.9271, // Colombo, Sri Lanka
  lng: 79.8612
};

// Map Component
export const MapWithMarker = ({ location, onLocationSelect, zoom = 15 }) => {
  const handleMapClick = (event) => {
    if (onLocationSelect) {
      onLocationSelect({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  };

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || defaultCenter}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {location && (
          <Marker
            position={location}
            draggable={true}
            onDragEnd={handleMapClick}
          />
        )}
      </GoogleMap>
    </div>
  );
};

// Address Autocomplete Component
export const AddressAutocomplete = ({ onPlaceSelected, value, onChange }) => {
  const autocompleteRef = React.useRef();

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
    autocomplete.setFields(['address_components', 'geometry', 'name']);
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        
        // Extract address components
        let address = '';
        let city = '';
        
        if (place.address_components) {
          // Get full address
          address = place.name || '';
          
          // Find city component
          const cityComponent = place.address_components.find(component =>
            component.types.includes('locality')
          );
          city = cityComponent ? cityComponent.long_name : '';
        }
        
        onPlaceSelected(location, address, city);
      }
    }
  };

  return (
    <div className="w-full">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter address to search..."
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Autocomplete>
    </div>
  );
};

// Main Map Modal Component
export const MapModal = ({ isOpen, onClose, onLocationSelect, initialLocation }) => {
  const [selectedLocation, setSelectedLocation] = React.useState(initialLocation);
  const [searchAddress, setSearchAddress] = React.useState('');

  const handleLocationSelect = (location, address = '', city = '') => {
    setSelectedLocation(location);
    if (address) {
      setSearchAddress(address);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation, searchAddress);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Select Location</h2>
            <button
              onClick={onClose}
              className="text-3xl font-extralight hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Address
              </label>
              <AddressAutocomplete
                onPlaceSelected={handleLocationSelect}
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <MapWithMarker
                location={selectedLocation}
                onLocationSelect={(location) => handleLocationSelect(location)}
              />
            </div>
            
            {selectedLocation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected Location: 
                  <span className="font-medium ml-2">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                  </span>
                </p>
                {searchAddress && (
                  <p className="text-sm text-gray-600 mt-1">
                    Address: <span className="font-medium">{searchAddress}</span>
                  </p>
                )}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};