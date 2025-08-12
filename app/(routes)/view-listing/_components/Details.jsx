import React from "react";

import GoogleMapSection from "../../../_components/GoogleMapSection";
import { Button } from "../../../../@/components/ui/button";
import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";

import AgentDetail from "./AgentDetail";

function Details({ listingDetails }) {
  console.log();
  return (
    listingDetails && (
      <div className="my-6 flex gap-2 flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-3xl">$ {listingDetails?.price}</h2>
            <h2 className="text-gray-500 text-lg flex gap-2">
              <MapPin />
              {listingDetails?.address}
            </h2>
          </div>
          <Button className="flex gap-2">
            {" "}
            <Share /> Share
          </Button>
        </div>
        <hr></hr>
        <div className="mt-4 flex flex-col gap-3">
          <h2 className=" font-bold text-2xl">Key Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
            <h2
              className="flex gap-2 items-center bg-purple-100 
    rounded-lg p-3 text-primary justify-center"
            >
              <Home />
              {listingDetails?.propertyType}
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
     rounded-lg p-3 text-primary"
            >
              <Drill />
              Built In {listingDetails?.builtIn}
            </h2>
            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <LandPlot />
              {listingDetails?.area}
            </h2>
            <h2
              className="flex gap-2 items-center bg-purple-100 
    rounded-lg p-3 text-primary justify-center"
            >
              <BedDouble />
              {listingDetails.bedroom} Bed
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
     rounded-lg p-3 text-primary"
            >
              <Bath />
              {listingDetails.bathroom} Bath
            </h2>
            <h2 className="flex gap-2 items-center justify-center bg-purple-100 rounded-lg p-3 text-primary">
              <CarFront />
              {listingDetails.parking} Parking
            </h2>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl ">What's Special</h2>
          <p className="text-gray-600 ">{listingDetails?.description}</p>
        </div>
        <div>
          <h2 className="font-bold text-2xl ">Find On Map</h2>
          <GoogleMapSection
            coordinates={listingDetails.coordinates}
            listing={[listingDetails]}
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl ">Contact Agent</h2>

          <AgentDetail listingDetails={listingDetails} />
        </div>
      </div>
    )
  );
}

export default Details;
