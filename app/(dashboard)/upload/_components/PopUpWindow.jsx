import { AlertCircleIcon } from "lucide-react";
import React, { useEffect } from "react";

const PopUpWindow = ({ onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center h-screen backdrop-blur-md">
      <section className="rounded-3xl bg-white shadow-2xl p-8 text-center sm:p-12">
        <div className="text-red-500">
          <AlertCircleIcon className="w-12 h-12 mx-auto mb-2" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          File Size is too large
        </p>
        <h2 className="mt-6 text-3xl font-bold">
          Please upload a file less than 2MB
        </h2>
        <button
          className="mt-6 bg-primary text-white px-4 py-2 rounded-full"
          onClick={onClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default PopUpWindow;
