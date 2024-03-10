//import image put in src below
import pollImage from "../../assets/pollImage.png";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";

const UserEventCard = ({ event, getUserEvents, deleteUserEvent }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl image-full pb-3">
        <figure>
          <img src={pollImage} alt="Shoes" className="blur-sm" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-4xl">{event.formType}</h2>

          <div>
            Show participants results: {event.shareResults ? "Yes" : "No"}
          </div>

          <div>
            Show names in results to participants:{" "}
            {event.privateResults ? "No" : "Yes"}
          </div>

          <div>Participants can share QR: {event.shareable ? "Yes" : "No"}</div>

          <div>Currently Active: {event.active ? "Yes" : "No"}</div>

          <div>Data: {event.formData}</div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={async () => {
                await deleteUserEvent(event._id);
                await getUserEvents();
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(event);
              }}
            >
              Check event data
            </button>
            {/* insert qr code here :) */}
            <div>
              <QRCodeSVG
                value={`https://qr-connects.onrender.com/${event._id}`}
                size={256}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
                renderas="svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;
