import React, { useState } from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";

import FilePlaceholderImage from "../../../../public/files.png";

const FilePreview = ({ file, removeFile }) => {
  const [showModal, setShowModal] = useState(false);
  const imageUrl = URL.createObjectURL(file);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const isImageFile = file.type.startsWith("image");
  const isPdfFile = file.type === "application/pdf";

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md relative">
      <div
        className="relative w-16 h-16 overflow-hidden rounded-lg cursor-pointer"
        onClick={openModal}
      >
        {isImageFile ? (
          imageUrl && (
            <Image
              src={imageUrl}
              alt={`${file.name} image`}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
              onError={(e) =>
                console.error("Image failed to load", e.target.src)
              }
            />
          )
        ) : isPdfFile ? (
          <Image
            src={FilePlaceholderImage}
            width={500}
            height={500}
            alt={`${file.name} PDF placeholder`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Image
            src={FilePlaceholderImage}
            alt={`${file.name} placeholder`}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      <div className="text-left flex-1">
        <h2 className="md:text-2xl text-lg font-bold text-gray-800">
          {file.name}
        </h2>
        <p className="text-gray-500 text-sm">
          {file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB
        </p>
      </div>

      <button
        onClick={removeFile}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <XCircle size={20} className="text-red-500 hover:text-red-700" />
      </button>

      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md"
          onClick={handleOverlayClick}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={closeModal}
              className="text-gray-600 hover:text-gray-800"
            >
              <XCircle size={30} className="text-red-500 hover:text-red-700" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            {isImageFile ? (
              <Image
                width={500}
                height={500}
                src={imageUrl}
                alt={`${file.name} image`}
                className="max-w-full max-h-full"
              />
            ) : isPdfFile ? (
              //! Display PDF using an iframe
              <iframe
                src={imageUrl}
                title={`${file.name} PDF`}
                className="w-[500px] h-[600px]"
                onError={(e) => console.error("PDF failed to load", e)}
              />
            ) : (
              <Image
                src={FilePlaceholderImage}
                alt={`${file.name} placeholder`}
                width={500}
                height={500}
                className="max-w-full max-h-full"
              />
            )}

            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
