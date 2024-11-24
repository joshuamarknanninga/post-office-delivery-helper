// src/components/MapComponent.js
import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import useDeliveries from '../hooks/useDeliveries';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: 29.3562, // Replace with the latitude of Lavernia, TX
  lng: -98.1153, // Replace with the longitude of Lavernia, TX
};

const MapComponent = () => {
  const { deliveries, routeCoordinates } = useDeliveries();

  const path = useMemo(() => routeCoordinates, [routeCoordinates]);

  const getMarkerIcon = (status) => {
    return status === 'delivered'
      ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  };

  return (
    <div role="region" aria-label="Delivery Route Map">
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={14}>
          {path.length > 0 && (
            <Polyline
              path={path}
              options={{
                strokeColor: '#0000FF',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
          {deliveries.map((delivery) => (
            <Marker
              key={delivery.id}
              position={delivery.coordinates}
              icon={{
                url: getMarkerIcon(delivery.status),
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              title={delivery.address}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default React.memo(MapComponent);
