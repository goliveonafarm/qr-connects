import React from "react";

const EventCard = ({
  children,
  src,
  alt,
  title,
  handleDelete,
  handleDebug,
}) => {
  return (
    <div className="card w-96 bg-base-100 image-full pb-3">
      <figure>
        <img src={src} alt={`${alt}`} className="blur-sm brightness-75" />

      </figure>

      <div className="card-body">
        <h2 className="card-title text-4xl text-success">{title}</h2>
        {children}
        <div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={async () => {
                await handleDelete();
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                handleDebug();
              }}
            >
              Check event data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
