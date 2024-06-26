import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDeleteParticipantResponse from "../../hooks/useDeleteParticipantResponse.js";
import useGetParticipantResponsesWithEvents from "../../hooks/useGetParticipantResponsesWithEvents.js";
import QRCode from "../../components/QRCode.jsx";
import ParticipantResponseCardBody from "../../components/response-card-bodies/ParticipantResponseCardBody.jsx";

const Connects = () => {
  const { isDeletingParticipantResponse, deleteParticipantResponse } =
    useDeleteParticipantResponse();

  const {
    loadingParticipantResponsesWithEvents,
    participantResponsesWithEvents,
    getParticipantResponsesWithEvents,
  } = useGetParticipantResponsesWithEvents();

  const handleDeleteParticipantResponse = async (id) => {
    await deleteParticipantResponse(id);
  };

  useEffect(() => {
    getParticipantResponsesWithEvents();
  }, []);

  useEffect(() => {}, [participantResponsesWithEvents]);

  if (loadingParticipantResponsesWithEvents) {
    return <div className="loading loading-spinner"></div>;
  }

  if (
    participantResponsesWithEvents?.length === 0 &&
    !loadingParticipantResponsesWithEvents
  )
    return (
      <div className="container mx-auto text-center">
        <div className="text-2xl">You have no Connects</div>

        <div className="flex pb-5 ">
          <div className="text-lg mr-auto ml-auto">
            You can click&nbsp;
            <Link
              to="/loading/6633166bbc59512e45d07d36"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              here
            </Link>
            &nbsp;or scan the qr code below to try it out
            {`(no login required)`}
          </div>
        </div>
        <div className=" flex">
          <div className="ml-auto mr-auto">
            <QRCode path="/loading/6633166bbc59512e45d07d36" />
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ textShadow: "1px 1px 2px black" }} className="flex">

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {participantResponsesWithEvents &&
          participantResponsesWithEvents.map((response) => {
            return (
              <div key={`participant-response-${response._id}`}>
                <ParticipantResponseCardBody
                  response={response}
                  deleteParticipantResponse={handleDeleteParticipantResponse}
                  getParticipantResponsesWithEvents={
                    getParticipantResponsesWithEvents
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connects;
