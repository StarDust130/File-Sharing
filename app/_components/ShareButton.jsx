import { Share, ShareIcon } from "lucide-react";
import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  XIcon,
  LineShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share";

const ShareButton = ({ shareUrl }) => {
  const [isShareVisible, setShareVisible] = useState(false);

  const toggleShareVisibility = () => {
    setShareVisible(!isShareVisible);
    setTimeout(() => {
      setShareVisible(false);
    }, 5000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="cursor-pointer p-2 bg--200 rounded-full font-bold hover:bg-gray-300 transition duration-300">
        <div
          className="flex items-center space-x-2"
          onClick={toggleShareVisibility}
        >
          <ShareIcon size={24} />
          <span className="hidden md:inline">Share</span>
        </div>
      </div>

      {isShareVisible && (
        <div className="absolute mt-2 top-10 md:top-16 flex bg-white p-4 rounded-lg r">
          <FacebookShareButton url={shareUrl}>
            <div className="p-2 rounded-md transition duration-300 transform hover:scale-110">
              <FacebookIcon size={24} round />
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            <div className="p-2 rounded-md transition duration-300 transform hover:scale-110">
              <XIcon size={24} round />
            </div>
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl}>
            <div className="p-2 rounded-md transition duration-300 transform hover:scale-110">
              <WhatsappIcon size={24} round />
            </div>
          </WhatsappShareButton>

          <RedditShareButton url={shareUrl}>
            <div className="p-2 rounded-md transition duration-300 transform hover:scale-110">
              <RedditIcon size={24} round />
            </div>
          </RedditShareButton>

          <LineShareButton url={shareUrl}>
            <div className="p-2 rounded-md transition duration-300 transform hover:scale-110">
              <LinkedinIcon size={24} round />
            </div>
          </LineShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
