"use client";
import UploadForm from "./_components/UploadForm";
import { app } from "../../../firebase/firebaseConfig";
import { doc, getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { setDoc } from "firebase/firestore";

const Page = () => {
  const [progress, setProgress] = useState();
  const db = getFirestore(app);
  const { user } = useUser();
  

  const storage = getStorage(app);
  const uploadFile = (file) => {
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file?.type);

    uploadTask.on("state_changed", (snapshot) => {
      //! Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const Progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + Progress + "% done");
      setProgress(Progress);

      //! Download url
      Progress === 100 &&
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          SaveInfo(file, downloadURL);
        });
    });
  };

  const SaveInfo = async (file, downloadURL) => {
    const DocId = (Date.now() % 1000000).toString();
    await setDoc(doc(db, "uploadedFile", DocId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: downloadURL,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + DocId,
      Id: DocId,
    });
  };
  return (
    <>
      <div className="p-5 px-8 md:px-28 ">
        <h2 className="text-[20px] text-center m-5 ">
          Start <strong className="text-primary">Uploading</strong> File and{" "}
          <strong className="text-primary">Share</strong> it
        </h2>

        <UploadForm
          uploadBtnClick={(file) => uploadFile(file)}
          progress={progress}
        />
      </div>
    </>
  );
};
export default Page;
