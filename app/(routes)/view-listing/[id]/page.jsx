"use client";
import React, { use, useEffect, useState } from "react";

import { toast } from "sonner";
import { supabase } from "../../../../../real-estate-app/utils/supabase/client";
import Slider from "../_components/Slider";
import Details from "../_components/Details";

const ViewListing = ({ params }) => {
  const { id } = use(params);
  const [listingDetails, setListingDetails] = useState();

  useEffect(() => {
    getListingDetails();
  }, []);

  const getListingDetails = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listing-images(listing_id,url)")
      .eq("id", id)
      .eq("active", true);

    if (data) {
      console.log(data);
      setListingDetails(data[0]);
    }
    if (error) {
      toast("Server side Error");
    }
  };

  return (
    <div className="px-4 md:px-32 lg:px-56 py-5">
      <Slider imageList={listingDetails?.["listing-images"]} />
      <Details listingDetails={listingDetails} />
    </div>
  );
};

export default ViewListing;
