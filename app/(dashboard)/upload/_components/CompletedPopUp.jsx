import { useEffect, useState } from "react";

const CompletedPopUp = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Call the onClose function after 3 seconds
    }, 6000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [onClose]);

  return (
    <>
      {visible && (
        <div
          role="alert"
          className="absolute  top-3 left-1/2 md:left-[60%] transform -translate-x-1/2 border border-primary bg-white p-4"
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {" "}
                Changes saved{" "}
              </strong>

              <p className="mt-1 text-xs md:text-sm text-gray-700">
                Your product changes have been saved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompletedPopUp;
