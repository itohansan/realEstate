import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "../../components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";

const Listing = ({
  listing,
  handleSearchClick,
  searchedAddress,
  hasSearched,
  setBathCount,
  setBedCount,
  setParkingCount,
  setHomeType,
  setCoordinates,
}) => {
  const [address, setAddress] = useState();

  return (
    <div>
      <div className="p-3 flex gap-6">
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates}
        />
        <Button className="flex gap-2" onClick={handleSearchClick}>
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}
      />
      {address && (
        <div className="px-3 my-5">
          <h2 className="text-xl">
            Found <span className="font-bold">{listing?.length}</span> result
            {listing.length !== 1 ? "s" : " "}
            in <span className="text-primary font-bold">{address?.label} </span>
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link href={"/view-listing/" + item.id} key={item.id}>
                <div
                  className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg"
                  key={index}
                >
                  <Image
                    src={item["listing-images"]?.[0].url}
                    width={800}
                    height={150}
                    alt="listing image"
                    className="rounded-lg object-cover h-[170px]"
                  />
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
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="
          h-[230px] w-full bg-slate-200 animate-pulse round-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
