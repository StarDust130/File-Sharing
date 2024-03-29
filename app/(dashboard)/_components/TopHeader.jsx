"use client";
import { UserButton } from "@clerk/nextjs";


import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import SideNav from "./SideNav";
import { useState } from "react";
import { useRouter } from "next/navigation";



const TopHeader = () => {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const router = useRouter();

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  const closeSideBar = () => {
    setSideBarVisible(false);
  };

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

    const handleSignOut = () => {
      // Redirect to your desired URL on sign out
      router.push("/");
    };

  return (
    <>
      <div className="flex p-5 border-b items-center justify-between md:justify-end">
        {isSideBarVisible ? (
          <X className="md:hidden cursor-pointer" onClick={closeSideBar} />
        ) : (
          <AlignJustify
            className="md:hidden cursor-pointer"
            onClick={toggleSideBar}
          />
        )}
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="md:hidden cursor-pointer"
        />
        {/* <UserButton  />
         */}
        <UserButton
          afterSignOutAllSessions={() => {
            handleSignOut();
          }}
        />
       
      </div>

      {isSideBarVisible && (
        <div
          className="md:hidden fixed top-0 left-0 h-screen w-60 bg-white z-50 transform translate-x-0 transition-transform"
          onClick={closeSideBar}
        >
          <div onClick={preventPropagation}>
            <SideNav closeSideBar={closeSideBar} />
          </div>
        </div>
      )}
    </>
  );
};

export default TopHeader;
