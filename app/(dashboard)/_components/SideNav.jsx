"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { File, Shield, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideNav = ({ closeSideBar }) => {
  const pathname = usePathname();

  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "File",
      icon: File,
      path: "/file",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  const handleLinkClick = () => {
    closeSideBar();
  };

  return (
    <div className="shadow-sm border-r h-full ">
      <div className="p-5   ">
        <div className="flex items-center justify-between">
          <Link href="/upload">
            <Image src="/logo.svg" alt="logo" width={100} height={150} />
          </Link>
          <X className="w-6 h-6 md:hidden cursor-pointer" onClick={closeSideBar} />
        </div>
      </div>

      <div className="flex flex-col float-left">
        {menuList.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={clsx(
              "flex gap-2 p-4 px-6  text-gray-500 hover:bg-gray-100 w-60",
              {
                "bg-blue-50 text-primary": pathname === item.path,
              }
            )}
            onClick={handleLinkClick}
          >
            <item.icon className="w-5 h-5 " />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
