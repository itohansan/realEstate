"use client";

import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

const Header = () => {
  const path = usePathname();

  const { user, isSignedIn } = useUser();

  useEffect(() => {}, []);
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-100 bg-white">
      <div className="flex gap-12">
        <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
        <ul className="hidden md:flex gap-10 items-center">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/" ? "text-primary" : ""
              }`}
            >
              For Sale
            </li>
          </Link>

          <Link href={"/rent"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/rent" ? "text-primary" : ""
              }`}
            >
              For Rent
            </li>
          </Link>

          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="profile image"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="pt-10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>My Listing</DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
