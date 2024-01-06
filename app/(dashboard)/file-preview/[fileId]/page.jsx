/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../../../../firebase/firebaseConfig";
import Image from "next/image";
import { ArrowLeftCircle, Copy, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Loading from "../../../_components/Loading";
// import globalApi from "../../../_utils/globalApi";
import image from "../../../../public/files.png";
import PopUp from "../_components/PopUp";

const FilePreview = ({ params }) => {
  //! Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const [fileData, setFileData] = useState(null);
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const [isPasswordSaved, setIsPasswordSaved] = useState(false);

  const handleCheckboxChange = () => {
    setEnablePassword(!enablePassword);
  };

  const [isCopied, setIsCopied] = useState(false); // State to track whether the link is copied

  const handleCopyClick = () => {
    navigator.clipboard.writeText(fileData?.shortUrl);
    setIsCopied(true);

    // Reset the copy status after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params.fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFileData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    params.fileId && getFileInfo();
  }, [params.fileId]);

  // Render loading or error state while data is being fetched
  if (!fileData) {
    return <Loading />;
  }

  //! Save password
 const onPasswordSave = async (password) => {
   console.log("Saving password:", password);

   try {
     const docRef = doc(db, "uploadedFile", params?.fileId);
     await updateDoc(
       docRef,
       {
         password: password,
       },
       { merge: true }
     );

     setIsPasswordSaved(true); // Set the state to show the popup

     console.log("Password saved successfully!");
   } catch (error) {
     console.error("Error saving password:", error.message);
   }
 };

 const closePopup = () => {
   setIsPasswordSaved(false); // Set the state to hide the popup
 };

  // const sendEmail = async () => {
  //   const data = {
  //     emailTosend: email,
  //     userName: user?.fullName,
  //     fileName: file?.fileName,
  //     fileSize: file?.fileSize,
  //     fileType: file?.fileType,
  //     fileUrl: file?.ShortUrl,
  //   };
  //   globalApi.SendEmail(data).then((res) => {
  //     console.log(res);
  //   });
  // };

  

  return (
    <>
      <div className="flex relative flex-col lg:flex-row items-center min-h-screen w-full  text-xs md:text-base">
        <button className=" text-black  py-2 px-4 rounded-full absolute left-0 top-0 hover:bg-primary-dark transition">
          <Link href="/upload">
            <div className="flex gap-2 items-center font-bold ">
              <ArrowLeftCircle size={20} /> Back to Upload
            </div>
          </Link>
        </button>
        {/* Left Side */}
        <div className="lg:w-[50%] flex-shrink-0 p-8">
          <div className="h-full mb-4 overflow-hidden rounded-lg flex items-center justify-center  w-full">
            {fileData?.fileUrl ? (
              <Image
                src={fileData.fileUrl}
                layout="responsive"
                width={64}
                height={64}
                objectFit="cover"
                alt="file preview"
                className="rounded-md"
              />
            ) : (
              <Image
                src={image}
                layout="responsive"
                width={64}
                height={64}
                objectFit="cover"
                alt="no file preview"
                className="rounded-md"
              />
            )}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">{fileData?.fileName}</h2>
            <p className="text-sm text-gray-500">
              Size: {fileData?.fileSize} bytes
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-[50%] p-6  flex-shrink-0  rounded-md shadow-2xl md:hover:shadow-lg transition border border-dashed border-gray-500 text-gray-500 duration-300">
          <div className="flex flex-col space-y-4 relative">
            <label className="text-lg font-semibold">Short Url</label>
            {/* Short URL */}
            <input
              type="text"
              value={fileData?.shortUrl}
              readOnly
              className="border-gray-500 border p-2 text-[10px] md:text-base rounded focus:outline-none focus:ring focus:border-primary"
            />
            <button
              onClick={handleCopyClick}
              className="absolute right-2  md:top-10  top-9   text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Copy size={20} />
            </button>
            {isCopied && (
              <span className="text-green-500 bg-gray-100 px-1 py-1 rounded-lg text-sm absolute right-2 top-15">
                Copied!
              </span>
            )}
            <p>Share this URL with your Freind 😉</p>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5 text-primary"
                onChange={handleCheckboxChange}
              />
              <label className="text-lg font-semibold">Enable Password?</label>
            </div>

            {enablePassword && (
              <div className="flex flex-col space-y-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="border-gray-500 border p-2 rounded focus:outline-none focus:ring focus:border-primary "
                />
                <button
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition hover:bg-blue-700 "
                  onClick={() => onPasswordSave(password)}
                >
                  Save
                </button>
                {/* Display the PasswordSavedPopup component when isPasswordSaved is true */}
                {isPasswordSaved && <PopUp onClose={closePopup} />}
                <span
                  className="absolute right-1 md:-top-1 -top-3 cursor-pointer "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            )}

            {/* <label className="text-lg font-semibold ">Send File to Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="border-gray-500 border p-2 rounded  placeholder:text-gray-500focus:outline-none focus:ring focus:border-primary "
            />
            <button
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition hover:bg-blue-700 "
              onClick={() => sendEmail()}
            >
              Send Email
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FilePreview;
