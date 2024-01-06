
import React, { useEffect } from "react";

const PasswordSavedPopup = ({ onClose }) => {
  useEffect(() => {
    // Close the popup after 2 seconds (2000 milliseconds)
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      // Clear the timeout on component unmount
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <p className="text-green-500 font-bold">Password saved!</p>
    </div>
  );
};

export default PasswordSavedPopup;
