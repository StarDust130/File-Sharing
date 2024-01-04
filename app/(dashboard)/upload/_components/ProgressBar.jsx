import React from "react";

const ProgressBar = ({ progress }) => {
  const progressWidth = progress ? `${progress}%` : "0%";
  const progressBarStyle = {
    width: progressWidth,
    opacity: progress > 0 ? 1 : 0, // Set opacity to 0 when progress is 0
  };

  return (
    <div>
      <span id="ProgressLabel" className="sr-only">
        Loading
      </span>

      <div
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuemin="0"
        aria-valuemax="100"
        className="block rounded-full bg-gray-200 mt-5 overflow-hidden"
      >
        <div
          className={`block h-4 rounded-full bg-primary text-center text-[10px]/4 transition-all duration-500 ease-in-out`}
          style={progressBarStyle}
        >
          <span className="font-bold text-white">{`${
            progress ? progress.toFixed(0) : 0
          }%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
