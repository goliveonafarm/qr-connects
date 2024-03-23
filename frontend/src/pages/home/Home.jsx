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
    console.log("delete ran, id:", id);
    await deleteParticipantResponse(id);
  };

  useEffect(() => {
    

        getParticipantResponsesWithEvents()
    
  }, []);


  if (loadingParticipantResponsesWithEvents) {
    return <div className="loading loading-spinner"></div>;
  }

  return (
    <div style={{ textShadow: "1px 1px 2px black" }}>
      <div className="pb-3">
        {/* <div className="loading loading-spinner"></div> */}
        <button
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
        </button>
      </div>
      <div>
        {participantResponsesWithEvents && participantResponsesWithEvents.map((response) => {
          return (
            <div key={`participant-response-${response._id}`}>

              <ParticipantResponseCardBody
                response={response}
                deleteParticipantResponse={handleDeleteParticipantResponse}
                getParticipantResponsesWithEvents={getParticipantResponsesWithEvents}
                
              />
            </div>
          );
        })}
        {participantResponsesWithEvents && participantResponsesWithEvents.length === 0 && <>None</>}
      </div>
    </div>
  );
};

export default Home;
