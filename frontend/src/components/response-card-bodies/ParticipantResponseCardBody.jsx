import useMinimumLoading from "../../hooks/useMinimumLoading";
import EventCard from "../EventCard";
import AfterPartyResponseCardBody from "./AfterPartyResponseCardBody";
import PotluckResponseCardBody from "./PotluckResponseCardBody";
import PollResponseCardBody from "./PollResponseCardBody";

const ParticipantResponseCardBody = ({
  response,
  getParticipantResponsesWithEvents,
  deleteParticipantResponse,
}) => {
  const { isLoading, startLoading, stopLoading } = useMinimumLoading();

  const handleDelete = async () => {
    await deleteParticipantResponse(response._id);
    await getParticipantResponsesWithEvents();
  };

  const renderForm = () => {
    switch (response.formType) {
      case "afterparty":
        return (
          <AfterPartyResponseCardBody
            key={response._id}
            response={response}
            startLoading={startLoading}
            stopLoading={stopLoading}
          />
        );
      case "potluck":
        return (
          <PotluckResponseCardBody
            key={response._id}
            response={response}
            startLoading={startLoading}
            stopLoading={stopLoading}
          />
        );
      case "poll":
        return (
          <PollResponseCardBody
            key={response._id}
            response={response}
            startLoading={startLoading}
            stopLoading={stopLoading}
          />
        );
      default:
        return <>For some reason there is no match for that event type..</>;
    }
  };

  return (
    <div>
      <EventCard
        eventType={response.formType}
        handleDelete={handleDelete}
        handleDebug={() => console.log(response)}
        isLoading={isLoading}
        eventId={response.eventId}
        key={`key-${response.eventId}`}
        cardSize={566}
      >
        {renderForm()}
      </EventCard>
    </div>
  );
};

export default ParticipantResponseCardBody;
