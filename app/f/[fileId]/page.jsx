"use client";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../../../firebase/firebaseConfig";
import File from "../_components/File";
import Link from "next/link";
import Image from "next/image";

const FileView = ({ params }) => {
  const db = getFirestore(app);
  const [fileData, setFileData] = useState();

  useEffect(() => {
    const getFileInfo = async () => {
      try {
        const docRef = doc(db, "uploadedFile", params.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFileData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    if (params.fileId) {
      getFileInfo();
    }
  }, [params.fileId, db]);

  console.log("fileData", fileData);

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      <Link href="">
        <Image
          alt="Picture of the author"
          src="/logo.svg"
          width={150}
          height={100}
        />
      </Link>
      <File fileData={fileData} />
    </div>
  );
};

export default FileView;
