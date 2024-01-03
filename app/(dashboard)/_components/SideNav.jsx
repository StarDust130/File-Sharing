"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {
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
  return (
    <div className="shadow-sm border-r h-full ">
      <div className="p-5 border-b ">
        <Image src="/logo.svg" alt="logo" width={150} height={100} />
      </div>

      <div className="flex flex-col float-left ">
        {menuList.map((item) => (
          <button
            key={item.id}
            className={clsx(
              "flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500  ",
              {
                "bg-blue-50 text-primary": pathname === item.path,
              }
            )}
          >
            <Link href={item.path}>
              <item.icon className="w-5 h-5 " />
              <h2>{item.name}</h2>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SideNav;
