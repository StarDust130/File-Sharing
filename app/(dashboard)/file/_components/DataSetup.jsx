"use client";
import { useEffect, useState } from "react";
import { app } from "../../../../firebase/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Loading from "../../../_components/Loading";
import Image from "next/image";
import { Copy } from "lucide-react";
// import InsertDriveFileIcon from "@mui/material/InsertDriveFile";

export default function DataSetup() {
  const [filesData, setFilesData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getFirestore(app);
        const filesCollection = collection(db, "uploadedFile");
        const querySnapshot = await getDocs(filesCollection);

        const data = [];
        querySnapshot.forEach((doc) => {
          const fileData = doc.data();
          data.push({
            fileName: fileData.fileName || "N/A",
            fileSize: fileData.fileSize || "N/A",
            fileType: fileData.fileType || "N/A",
            ID: doc.id,
            shortUrl: fileData.shortUrl || "N/A",
            password: fileData.password || null,
          });
        });

        setFilesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const bytesToMB = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  };

  const FilePreview = (fileID) => {
    router.push(`/file-preview/${fileID}`);
  };

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = (shortUrl, index) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="overflow-x-auto">
      {filesData.length === 0 ? (
        <Loading />
      ) : (
        <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left">File Name</th>
                <th className="py-3 px-6 text-left">Size</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Link</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filesData.map((file, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => FilePreview(file.ID)}
                    >
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        <Image
                          src="/files.png"
                          alt="file"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="ml-4 sm:ml-6">
                        <h6 className="text-sm sm:text-base">
                          {file.fileName}
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm sm:text-base text-gray-500">
                      {bytesToMB(file.fileSize)}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm sm:text-base text-gray-500">
                      {file.fileType}
                    </p>
                  </td>
                  <td className="py-4 px-6 relative">
                    {file.password && (
                      <span
                        className="text-red-500 text-sm absolute left-2 top-2 cursor-pointer"
                        title="This file has a password"
                      >
                        🔒
                      </span>
                    )}
                    <button
                      onClick={() => handleCopyClick(file.shortUrl, index)}
                      className={`text-gray-500 hover:text-gray-700 cursor-pointer ${
                        copiedIndex === index ? "text-blue-500" : ""
                      }`}
                    >
                      <Copy size={20} />
                    </button>
                    {copiedIndex === index && (
                      <span className="text-green-500 bg-gray-100 px-2 py-1 rounded-lg text-sm absolute right-2 top-2">
                        Copied!
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}