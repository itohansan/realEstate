import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../../utils/supabase/client";
import Image from "next/image";
import { BathIcon, BedDouble, MapPin, Ruler, Trash } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const UserListing = () => {
  const { user } = useUser();

  const [listing, setListing] = useState();

  useEffect(() => {
    user && GetuserListing();
  }, [user]);

  const GetuserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*, listing-images(listing_id,url)`)
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);

    setListing(data);
  };

  const deleteListing = async (id) => {
    await supabase.from("listing-images").delete().eq("listing_id", id);

    const { data, error } = await supabase
      .from("listing")
      .delete()
      .eq("id", id);

    toast("Record deleted");
    GetuserListing();
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Manage Your Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {listing &&
          listing.map((item, index) => (
            <div
              className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg"
              key={item.id}
            >
              <div className="relative">
                <h2 className="bg-primary text-white absolute px-2 text-sm p-1 m-1 rounded-lg">
                  {item.active ? "Published" : "Draft"}
                </h2>
                <Image
                  src={
                    item["listing-images"]?.[0]?.url
                      ? item["listing-images"][0].url
                      : "https://placehold.co/800x150?text=No+Image"
                  }
                  width={800}
                  height={150}
                  alt="listing image"
                  className="rounded-lg object-cover h-[170px]"
                />
              </div>
              <div className="flex flex-col mt-2 gap-2">
                <h2 className="font-bold text-xl">${item?.price}</h2>
                <h2 className="flex gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {item.address}
                </h2>
                <div className="flex gap-2 mt-2 justify-between">
                  <h2 className="flex gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                    <BedDouble className="h-4 w-4" />
                    {item?.bedroom}
                  </h2>
                  <h2 className="flex gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                    <BathIcon className="h-4 w-4" />
                    {item?.bathroom}
                  </h2>
                  <h2 className="flex gap-2 text-sm bg-slate-100 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                    <Ruler className="h-4 w-4" />
                    {item?.area}
                  </h2>
                </div>

                <div className="flex gap-2 justify-between">
                  <Link href={"/edit-listing/" + item.id}>
                    <Button className="flex-1" size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Link href={"/view-listing/" + item.id}>
                    <Button className="flex-1" size="sm">
                      View
                    </Button>
                  </Link>
                  <Button
                    className="flex-1"
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteListing(item.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserListing;
