import { useState, useEffect } from "react";
import QRCode from "./QRCode";
import CircleXmark from "./icons/CircleXmark";
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
    <div key={`card-${eventId}`} 
     style={{ height: `562px`, width: `369px`}}
    
    >
      <div className="card image-full h-full">
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

            <div>{eventId && <QRCode path={eventId} _size={128} />}</div>

            <div>
              <button
                aria-label="Delete Event"
                onClick={async () => {
                  let result = window.confirm(
                    `Are you sure you want to delete this event?\n\nDeleting this event will also delete all responses associated with it.`
                  );
                  if (result) {
                    await handleDelete();
                  }
                }}
                onKeyUp={async (e) => {
                  if (e.key === "Enter") {
                    let result = window.confirm(
                      `Are you sure you want to delete this event?\n\nDeleting this event will also delete all responses associated with it.`
                    );
                    if (result) {
                      handleDelete();
                    }
                  }
                }}
              >
                <CircleXmark _size={50} />
              </button>
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
