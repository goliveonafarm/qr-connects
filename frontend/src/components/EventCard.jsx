import { useState, useEffect } from "react";
import QRCode from "./QRCode";
import pollImage from "../assets/pollImage.png";
import barImage from "../assets/barImage.png";
import picnicImage from "../assets/picnicImage.png";

const EventCard = ({
  children,
  handleDelete,
  eventType,
  isLoading,
  eventId,
  cardSize,
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
      default:
        break;
    }
  }, [eventType]);

  return (
    <div key={`card-${eventId}`}>
      <div className="card image-full" style={{ minHeight: `${cardSize}px` }}>
        <figure>
          <img
            src={eventCardImage}
            alt={`${eventCardImageAlt}`}
            className="blur-sm brightness-75"
          />
        </figure>

        <div className="card-body">
          <div className="flex justify-between ">


            <div className="">
              {isLoading && (
                <span className="loading loading-spinner loading-lg text-info absolute"></span>
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
                className="fill-white cursor-pointer hover:fill-blue-700"
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
