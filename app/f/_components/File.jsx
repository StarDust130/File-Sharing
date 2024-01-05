import Image from "next/image";
import { UserProfile } from "@clerk/nextjs";
import { useState } from "react";

const File = ({ fileData }) => {
  const [password, setPassword] = useState("");

  const handleDownload = () => {
    if (fileData && fileData.fileUrl) {
      // Open the image in a new tab
      window.open(fileData.fileUrl, "_blank");
    }
  };

  const handleImageClick = () => {
    if (fileData && fileData.fileUrl) {
      // Open the image in a new tab
      window.open(fileData.fileUrl, "_blank");
    }
  };


  return (
    fileData && (
      <div className="h-[80%] w-96 rounded-lg bg-white shadow-2xl flex flex-col items-center p-6 space-y-4  hover:shadow-lg">
        <h1 className="text-xl text-center font-extrabold text-primary">
          {fileData.userName} Shared the File with You
        </h1>
        <p className="text-gray-600 text-sm">Find File Details Below</p>
        <div onClick={handleImageClick} className="cursor-pointer">
          <Image
            src="/file-gif.gif"
            alt="Picture of the author"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        {UserProfile?.fullName && (
          <p className="text-gray-600 text-sm">
            Shared by: {UserProfile?.fullName}
          </p>
        )}

        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold text-gray-800">
            File Details:{fileData.fileType}
          </h1>
          <p>
            <span className="font-semibold">File Name:{fileData.fileName}</span>{" "}
          </p>
          <p>
            <span className="font-semibold">Size:{fileData.fileSize}</span> 2MB
          </p>
        </div>

        {fileData.password && (
          <>
            <p className="text-sm text-red-500">*Password Protected</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password to Access"
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-primary"
            />
          </>
        )}
        {fileData.password === password && (
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring focus:border-primary transition duration-300"
            onClick={handleDownload}
          >
            Download
          </button>
        )}

        <p className="text-sm text-gray-500">*Terms and Conditions Apply</p>
      </div>
    )
  );
};

export default File;
