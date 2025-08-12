import { BathIcon, BedDouble, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const MarkerListingItem = ({ item, closeHandler }) => {
  return (
    <div>
      <div className="cursor-pointer rounded-lg w-[180px]">
        <X onClick={() => closeHandler()} />
        <Image
          src={item["listing-images"]?.[0].url}
          width={800}
          height={150}
          alt="listing image"
          className="rounded-lg object-cover w-[180px] h-[120px]"
        />
        <div className="flex flex-col mt-2 gap-2 p-2 bg-white ">
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
          </div>
          <Link href={"/view-listing/" + item.id} className="w-full">
            <Button>Veiw Detail</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarkerListingItem;
