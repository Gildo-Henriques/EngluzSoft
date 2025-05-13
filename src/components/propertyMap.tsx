// src/components/PropertyMap.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC } from "react";

interface PropertyMapProps {
  coordinates: { lat: number; lng: number };
  location: string;
}

const PropertyMap: FC<PropertyMapProps> = ({ coordinates, location }) => {
  const position: LatLngExpression = [coordinates.lat, coordinates.lng];

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;