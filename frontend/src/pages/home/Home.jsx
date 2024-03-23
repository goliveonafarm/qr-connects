import { useEffect } from "react";
import useDeleteParticipantResponse from "../../hooks/useDeleteParticipantResponse.js";
import useGetParticipantResponsesWithEvents from "../../hooks/useGetParticipantResponsesWithEvents.js";
import { get } from "mongoose";
import ParticipantResponseCardBody from "../../components/response-card-bodies/ParticipantResponseCardBody.jsx";

const Home = () => {
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

  if (loadingParticipantResponsesWithEvents) {
    return <div className="loading loading-spinner"></div>;
  }

  return (
    <div style={{ textShadow: "1px 1px 2px black" }}>
      <div className="pb-3">
        {/* <div className="loading loading-spinner"></div> */}
        {/* <button
          className="btn btn-outline btn-info btn-lg btn-wide"
          onClick={() => {
            getParticipantResponsesWithEvents();
            console.log(
              "participantResponsesWithEvents:",
              participantResponsesWithEvents
            );
          }}
        >
          log responses
        </button> */}
      </div>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-3 gap-6">
            {participantResponsesWithEvents &&
              participantResponsesWithEvents.map((response) => {
                return (
                  <div key={`participant-response-${response._id}`}>
                    <ParticipantResponseCardBody
                      response={response}
                      deleteParticipantResponse={
                        handleDeleteParticipantResponse
                      }
                      getParticipantResponsesWithEvents={
                        getParticipantResponsesWithEvents
                      }
                    />
                  </div>
                );
              })}
            {participantResponsesWithEvents &&
              participantResponsesWithEvents.length === 0 && <>None</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
