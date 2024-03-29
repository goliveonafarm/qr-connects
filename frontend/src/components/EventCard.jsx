import React from "react";
import { useState, useEffect } from "react";
import QRCode from "./QRCode";
import pollImage from "../assets/pollImage.png";
import barImage from "../assets/barImage.png";
import picnicImage from "../assets/picnicImage.png";

const EventCard = ({
  children,
  handleDelete,
  handleDebug,
  eventType,
  isLoading,
  eventId,
}) => {
  const [eventCardImage, setEventCardImage] = useState(null);
  const [eventCardImageAlt, setEventCardImageAlt] = useState(null);

  useEffect(() => {
    switch (eventType) {
      case "afterparty":
        setEventCardImage(barImage);
        setEventCardImageAlt("Bar image");
        break;
      case "potluck":
        setEventCardImage(picnicImage);
        setEventCardImageAlt("Picnic image");
        break;
      case "poll":
        setEventCardImage(pollImage);
        setEventCardImageAlt("Poll image");
        break;
      // Add any other cases if necessary
      default:
        // Set default image or leave it null
        break;
    }
  }, [eventType]);

  return (
    <div>
      <div className="card w-96 image-full">
        <figure>
          <img
            src={eventCardImage}
            alt={`${eventCardImageAlt}`}
            className="blur-sm brightness-75"
          />
        </figure>

        <div className="card-body">
          <div className="flex justify-between items-center">
            <div>
              <svg
                height="25"
                width="25"
                fill="currentColor"
                className="fill-info cursor-pointer hover:fill-purple-500"
                onClick={async () => {
                  handleDebug();
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
              </svg>
            </div>

            <div className="">
              {isLoading && (
                <span className="loading loading-spinner loading-lg text-info"></span>
              )}
            </div>

            <div className="">
              {eventId && (
                <div className="ml-auto mr-auto">
                  <QRCode path={eventId} _size={128} />
                </div>
              )}
            </div>

            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50"
                width="50"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="fill-info cursor-pointer hover:fill-purple-500"
                onClick={async () => {
                  await handleDelete();
                }}
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
            </div>


          </div>
          {children}
          <div>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
