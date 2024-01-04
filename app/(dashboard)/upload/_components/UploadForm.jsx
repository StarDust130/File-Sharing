"use client";
import { useState } from "react";
import PopUpWindow from "./PopUpWindow";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import CompletedPopUp from "./CompletedPopUp";

const UploadForm = ({ uploadBtnClick, progress }) => {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const onFileSelected = (file) => {
    if (file && file.size > 2000000) {
      console.log(file);
      setShowPopup(true);
      return;
    }
    setFile(file);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="text-center">
        <div className="flex items-center justify-center  w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-blue-50 border-blue-300   "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-12 h-12 mb-4 text-primary dark:text-blue-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or{" "}
                <strong className="text-primary">drag</strong> and{" "}
                <strong className="text-primary">drop</strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (Max Size : 2MB )
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => onFileSelected(e.target.files[0])}
            />
          </label>
        </div>

        {/* File Preview 📁 */}
        {file && <FilePreview file={file} removeFile={() => setFile(null)} />}

        {progress >= 0 ? (
          <ProgressBar progress={progress} />
        ) : (
          <button
            disabled={!file}
            className={`group relative p-3 bg-primary hover:bg-primary-dark text-white w-[30%] rounded-full mt-5 transition duration-300 ease-in-out transform hover:scale-105 ${
              !file ? "cursor-not-allowed opacity-70 disabled:bg-gray-400" : ""
            }`}
            onClick={() => uploadBtnClick(file)}
          >
            <span className="flex items-center justify-center">Upload</span>
            {!file && (
              <span className="absolute opacity-0 bg-gray-800 text-white py-1 px-2 rounded-md text-xs transition-opacity duration-300 ease-in-out transform translate-y-2 lg:group-hover:opacity-100 group-hover:translate-y-0 lg:top-16 lg:right-[120px]">
                Upload File
              </span>
            )}
          </button>
        )}



        {/* Popup to Show Task Completed 🍿 */}
        {progress === 100 && <CompletedPopUp onClose={closePopup} />}
       
       

        {/* Popup Window 🍿 */}
        {showPopup && <PopUpWindow onClose={closePopup} />}
      </div>
    </>
  );
};

export default UploadForm;
