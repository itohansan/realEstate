"use client";

import { MapPin } from "lucide-react";
import React from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import dynamic from "next/dynamic";

const GooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete").then((mod) => mod.default),
  { ssr: false }
);

const GoogleAddressSearch = ({ selectedAddress, setCoordinates }) => {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-9.5 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: async (place) => {
            selectedAddress(place);
            if (!place) {
              setCoordinates(null);
              return;
            }
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;
