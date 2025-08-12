"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./MarkerItem";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const GoogleMapSection = ({ coordinates, listing }) => {
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (coordinates) setCenter(coordinates);
  }, [coordinates]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      gestureHandling="greedy"
    >
      {listing.map((item, index) => (
        <MarkerItem key={index} item={item} />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapSection;
