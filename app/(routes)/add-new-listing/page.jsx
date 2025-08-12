"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import GoogleAddressSearch from "../../_components/GoogleAddressSearch";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase/client";
supabase;
function AddNewListing() {
  const { user } = useUser();
  const [selectedAddress, setSelectedAddress] = useState();

  const [coordinates, setCoordinates] = useState();

  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const nextHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (error) {
      setLoader(false);
      console.error("❌ Supabase insert error:", error);
      toast("server side error.");
    } else {
      setLoader(false);
      console.log("✅ New data added:", data);
      toast("New address added for listing.");
      router.replace("/edit-listing/" + data[0].id);
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-5 rounded-lg border shadow-md flex flex-col gap-5 w-full">
          <h2 className="text-gray-500">
            Enter address which you want to list
          </h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
