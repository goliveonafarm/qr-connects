//import image put in src below
import { Link } from "react-router-dom";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import pollImage from "../../assets/pollImage.png";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import EventCard from "../EventCard";
import AfterPartyEventCardBody from "./AfterPartyEventCardBody";
import PotluckEventCardBody from "./PotluckEventCardBody";
import SurveyEventCardBody from "./SurveyEventCardBody";
import PollEventCardBody from "./PollEventCardBody";
import capitalizeFirstLetterOfString from "../../../utils/capitalizeFirstLetter";

const UserEventCardBody = ({ userEvent, deleteUserEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  const handleDelete = async () => {
    await deleteUserEvent(userEvent._id);
  };

  const renderForm = () => {
    switch (userEvent.formType) {
      case "afterparty":
        return <AfterPartyEventCardBody userEvent={userEvent} />;
      case "potluck":
        return <PotluckEventCardBody userEvent={userEvent} />;
      case "survey":
        return <SurveyEventCardBody userEvent={userEvent} />;
      case "poll":
        return <PollEventCardBody userEvent={userEvent} />;
      default:
        return <>There was no match for this Connect type for some reason...</>;
    }
  };

  return (
    <div>
      <EventCard
        src={pollImage}
        alt={"pollImage"}
        title={`${capitalizeFirstLetterOfString(
          userEvent.formType
        )} at ${capitalizeFirstLetterOfString(userEvent.formData[0])}`}
        handleDelete={handleDelete}
        handleDebug={() => console.log(userEvent)}
      >
        <div>
          Show participants results: {userEvent.shareResults ? "Yes" : "No"}
        </div>

        <div>
          Show names in results to participants:{" "}
          {userEvent.privateResults ? "No" : "Yes"}
        </div>

        <div>
          Participants can share QR: {userEvent.shareable ? "Yes" : "No"}
        </div>

        <div>Currently Active: {userEvent.active ? "Yes" : "No"}</div>

        <div>Data: {userEvent.formData}</div>

        {/* insert qr code here :) */}
        <div className="ml-auto mr-auto">
          <QRCodeSVG
            value={`https://qr-connects.onrender.com/loading/${userEvent._id}`}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="Q"
            renderas="svg"
          />
        </div>
        <div>
                    {renderForm()}

            
        </div>
        <div>Event ID- {userEvent._id}</div>
        <Link className="text-blue-700" to={`http://localhost:3000/loading/${userEvent._id}`}>Create response</Link>
      </EventCard>
    </div>
  );
};

export default UserEventCardBody;
