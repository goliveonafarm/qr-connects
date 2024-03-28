import useMinimumLoading from "../../hooks/useMinimumLoading";
import EventCard from "../EventCard";
import AfterPartyResponseCardBody from "./AfterPartyResponseCardBody";
import PotluckResponseCardBody from "./PotluckResponseCardBody";
import SurveyResponseCardBody from "./SurveyResponseCardBody";
import PollResponseCardBody from "./PollResponseCardBody";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import QRCode from "../QRCode";

const ParticipantResponseCardBody = ({
  response,
  getParticipantResponsesWithEvents,
  deleteParticipantResponse,
}) => {

  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();
  const { isLoading, startLoading, stopLoading } = useMinimumLoading();

  const handleUpdateResponse = async (responseData, id) => {
    await updateResponse(id, responseData);
  };

  const handleDelete = async () => {
    await deleteParticipantResponse(response._id);
    await getParticipantResponsesWithEvents();
  };

  const renderForm = () => {
    switch (response.formType) {
      case "afterparty":
        return (
          <AfterPartyResponseCardBody
            response={response}
            startLoading={startLoading}
            stopLoading={stopLoading}
          />
        );
      case "potluck":
        return (
          <PotluckResponseCardBody
            response={response}
            handleUpdateResponse={handleUpdateResponse}
            updateResponse={updatingResponse}
          />
        );
      case "survey":
        return <SurveyResponseCardBody response={response} />;
      case "poll":
        return <PollResponseCardBody response={response} />;
      default:
        return <>There's an error in this connect type??...</>;
    }
  };

  return (
    <div>
      <EventCard
        eventType={response.formType}
        handleDelete={handleDelete}
        handleDebug={() => console.log(response)}
        isLoading={isLoading}

      >
        <div className="flex">
          <div className="mr-auto ml-auto">
            {response.shareable && (
              <div className="ml-auto mr-auto">
                <QRCode path={response.eventId} _size={128} />
              </div>
            )}
          </div>
        </div>
        {renderForm()}
      </EventCard>
    </div>
  );
};

export default ParticipantResponseCardBody;
