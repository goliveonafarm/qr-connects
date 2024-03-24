import { Link } from "react-router-dom";
import EventCard from "../EventCard";
import AfterPartyEventCardBody from "./AfterPartyEventCardBody";
import PotluckEventCardBody from "./PotluckEventCardBody";
import SurveyEventCardBody from "./SurveyEventCardBody";
import PollEventCardBody from "./PollEventCardBody";
import capitalizeFirstLetterOfString from "../../../utils/capitalizeFirstLetter";
import QRCode from "../QRCode";

const UserEventCardBody = ({ userEvent, deleteUserEvent }) => {
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
        eventType={userEvent.formType}
        handleDelete={handleDelete}
        handleDebug={() => console.log(userEvent)}
      >
        {/* insert qr code here :) */}
        <div className="ml-auto mr-auto">
          <QRCode path={userEvent._id} _size={128} />
        </div>
        <div>{renderForm()}</div>
        <div>
          <Link
            className="text-blue-700"
            to={`http://localhost:3000/loading/${userEvent._id}`}
          >
            {`localhost ${userEvent._id}`}
          </Link>
        </div>
        <div>
          <Link
            className="text-blue-700"
            to={`https://qr-connects.onrender.com/loading/${userEvent._id}`}
          >
            {`website ${userEvent._id}`}
          </Link>
        </div>

        <div>
          Show participants results: {userEvent.shareResults ? "Yes" : "No"}
        </div>

        <div>
          Show names in results to participants:{" "}
          {userEvent.hideNames ? "No" : "Yes"}{/*changed to hideNames*/}
        </div>

        <div>
          Participants can share QR: {userEvent.shareable ? "Yes" : "No"}
        </div>

        <div>Currently Active: {userEvent.active ? "Yes" : "No"}</div>
      </EventCard>
    </div>
  );
};

export default UserEventCardBody;
