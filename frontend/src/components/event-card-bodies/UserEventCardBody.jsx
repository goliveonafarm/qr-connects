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
        handleDebug={() => console.log(userEvent)}
        eventId={userEvent._id}
      >
        <div>{renderForm()}</div>
        <div>Create connect {`(debugging purposes) -`}</div>
        <div>
          <Link
            className="text-blue-500"
            to={`/loading/${userEvent._id}`}
          >
            {`id - ${userEvent._id}`}
          </Link>
        </div>
      </EventCard>
    </div>
  );
};

export default UserEventCardBody;
