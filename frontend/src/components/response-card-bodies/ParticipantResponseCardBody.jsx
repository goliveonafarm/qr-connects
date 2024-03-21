import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import EventCard from "../EventCard";
import AfterPartyResponseCardBody from "./AfterPartyResponseCardBody";
import PotluckResponseCardBody from "./PotluckResponseCardBody";
import SurveyResponseCardBody from "./SurveyResponseCardBody";
import PollResponseCardBody from "./PollResponseCardBody";
import barImage from "../../assets/barImage.png";
import capitalizeFirstLetterOfString from "../../../utils/capitalizeFirstLetter";
import useUpdateParticipantResponse from "../../hooks/useUpdateParticipantResponse";

const ParticipantResponseCardBody = ({
  response,
  getParticipantResponsesWithEvents,
  deleteParticipantResponse,
}) => {
  const { updatingResponse, updateResponse } = useUpdateParticipantResponse();

  const handleUpdateResponse = async (responseData, id) => {
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
        return <AfterPartyResponseCardBody response={response} handleUpdateResponse={handleUpdateResponse}/>;
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
      src={barImage}
      alt={"Bar image"}
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
              <QRCodeSVG
                value={`https://qr-connects.onrender.com/${response.eventId}`}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
                renderas="svg"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="font-bold text-lg">Event info-</div>

        <div>Event Id?: {response.eventId}</div>
        <div>Response Id: {response._id}</div>
      </div>
    </EventCard>
  );
};

export default ParticipantResponseCardBody;
