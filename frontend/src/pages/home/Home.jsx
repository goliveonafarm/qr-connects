import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitParticipantResponse from "../../hooks/useSubmitParticipantResponse";
import useDeleteParticipantResponse from "../../hooks/useDeleteParticipantResponse.js";
import ParticipantResponse from "../../components/ParticipantResponse";
import useGetParticipantResponsesWithEvents from "../../hooks/useGetParticipantResponsesWithEvents.js";
import { useNavigate } from "react-router-dom";
import { get } from "mongoose";
import EventCard from "../../components/EventCard.jsx";
import barImage from "../../assets/barImage.png";
import ParticipantResponseCardBody from "../../components/response-card-bodies/ParticipantResponseCardBody.jsx";

const Home = () => {
  let { id } = useParams();

  const { submittingParticipantResponse, submitParticipantResponse } =
    useSubmitParticipantResponse();

  const { isDeletingParticipantResponse, deleteParticipantResponse } =
    useDeleteParticipantResponse();

  const {
    loadingParticipantResponsesWithEvents,
    participantResponsesWithEvents,
    getParticipantResponsesWithEvents,
  } = useGetParticipantResponsesWithEvents();

  const navigate = useNavigate();

  const handleDeleteParticipantResponse = async (id) => {
    console.log("delete ran, id:", id);
    await deleteParticipantResponse(id);
  };

  useEffect(() => {
    

        getParticipantResponsesWithEvents()
    
  }, [submittingParticipantResponse]);

  //next we need to figure out what happens when an incorrect id is passed
  useEffect(() => {
    

    const runThis = async =>  {
    if (id && participantResponsesWithEvents !== null && !submittingParticipantResponse) {
      const found = participantResponsesWithEvents.find((response) => {
        return response.eventId.toString() === id;
      });
      
      const handleSubmitNewResponse = async (responseData, id) => {
        return submitParticipantResponse(responseData, id);
      };

      if (!found || participantResponsesWithEvents.length === 0) {
        handleSubmitNewResponse([], id)
        .then(()=>{
          id = null;
          navigate("/");
        });
      }
    }
  }

  runThis();

    console.log('useEffect 2 finished')
  }, [participantResponsesWithEvents]);

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
              {/* <div className="pb-3">
                <ParticipantResponse
                  response={response}
                  handleDeleteParticipantResponse={
                    handleDeleteParticipantResponse
                  }
                />
              </div> */}

              {/* <EventCard
                src={barImage}
                alt={"barImage"}
                title={`Afterparty @ ${response.formData}`}
                handleDebug={() => console.log(response)}
                handleDelete={()=>handleDeleteParticipantResponse(response._id)}
              >
                {}
              </EventCard> */}
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
