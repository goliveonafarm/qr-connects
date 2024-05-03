import { Link } from "react-router-dom";
import EventCard from "../EventCard";
import AfterPartyEventCardBody from "./AfterPartyEventCardBody";
import PotluckEventCardBody from "./PotluckEventCardBody";
import PollEventCardBody from "./PollEventCardBody";

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
        eventId={userEvent._id}
        cardSize={464}
      >
        <div>{renderForm()}</div>
        <div>
          <Link className="text-blue-500 underline hover:text-blue-700 cursor-pointer" to={`/loading/${userEvent._id}`}>
            Click to create a Connect for your own event
          </Link>
        </div>
      </EventCard>
    </div>
  );
};

export default UserEventCardBody;
