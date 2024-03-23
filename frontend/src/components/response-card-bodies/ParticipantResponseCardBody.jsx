import EventCard from "../EventCard";
import AfterPartyResponseCardBody from "./AfterPartyResponseCardBody";
import PotluckResponseCardBody from "./PotluckResponseCardBody";
import SurveyResponseCardBody from "./SurveyResponseCardBody";
import PollResponseCardBody from "./PollResponseCardBody";
import barImage from "../../assets/barImage.png";
import capitalizeFirstLetterOfString from "../../../utils/capitalizeFirstLetter";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";
import QRCode from "../QRCode";

const ParticipantResponseCardBody = ({
  response,
  getParticipantResponsesWithEvents,
  deleteParticipantResponse,
}) => {
  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();

  const handleUpdateResponse = async (responseData, id) => {
    console.log('updating: ', responseData, id)
    await updateResponse(id, responseData);
    await getParticipantResponsesWithEvents();
  };

  const handleDelete = async () => {
    await deleteParticipantResponse(response._id);
    await getParticipantResponsesWithEvents();
  };

  const renderForm = () => {
    switch (response.formType) {
      case "afterparty":
        return <AfterPartyResponseCardBody response={response} handleUpdateResponse={handleUpdateResponse} updateResponse={updatingResponse}/>;
      case "potluck":
        return <PotluckResponseCardBody response={response} />;
      case "survey":
        return <SurveyResponseCardBody response={response} />;
      case "poll":
        return <PollResponseCardBody response={response} />;
      default:
        return <>There was no match for this Connect type for some reason...</>;
    }
  };

  return (
    <EventCard

      eventType={response.formType}
      title={`${capitalizeFirstLetterOfString(
        response.formType
      )} at ${capitalizeFirstLetterOfString(response.formData[0])}`}
      handleDelete={handleDelete}
      handleDebug={() => console.log(response)}
    >
      {renderForm()}
      <div className="flex">
        <div className="mr-auto ml-auto">
          {response.shareable && (
            <div className="ml-auto mr-auto">

              <QRCode path={response.eventId} _size={128} />
            </div>
          )}
        </div>
      </div>
      {/* <div>
        <div className="font-bold text-lg">Event info-</div>

        <div>Event Id?: {response.eventId}</div>
        <div>Response Id: {response._id}</div>
      </div> */}
    </EventCard>
  );
};

export default ParticipantResponseCardBody;
