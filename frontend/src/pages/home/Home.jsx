import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSubmitParticipantResponse from "../../hooks/useSubmitParticipantResponse";
import useDeleteParticipantResponse from "../../hooks/useDeleteParticipantResponse.js";
import ParticipantResponse from "../../components/ParticipantResponse";
import useGetParticipantResponsesWithEvents from "../../hooks/useGetParticipantResponsesWithEvents.js";
import { useNavigate } from "react-router-dom";
import { get } from "mongoose";

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

  const handleSubmitParticipantResponse = async (responseData, id) => {
    await submitParticipantResponse(responseData, id);
    await getParticipantResponsesWithEvents();
  };

  const handleDeleteParticipantResponse = async (id) => {
    console.log('delete')
    await deleteParticipantResponse(id);
    await getParticipantResponsesWithEvents();
  };

  useEffect(() => {
    getParticipantResponsesWithEvents();
  }, []);

  //next we need to figure out what happens when an incorrect id is passed
  useEffect(() => {
    if (id) {
      const found = participantResponsesWithEvents.find(
        (response) => response.eventId === id
      );

      const handleSubmitNewResponse = async (responseData, id) => {
        await submitParticipantResponse(responseData, id);
      };

      if (!found || participantResponsesWithEvents.length === 0) {
        handleSubmitNewResponse([], id);
        id = null;
      }
      navigate("/");
    }
  }, [participantResponsesWithEvents]);

  if (loadingParticipantResponsesWithEvents) {
    return <div className="loading loading-spinner"></div>;
  }

  return (
    <div>
      <div className="pb-3">
        <div className="loading loading-spinner"></div>hello world
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
      <div className="pb-3">
        <button
          className="btn btn-outline btn-info btn-lg btn-wide"
          onClick={() => {
            console.log(id);
            handleSubmitParticipantResponse(
              [`test data \ntimestamp:${Date.now()}`],
              id
            );
          }}
        >
          submit test response
        </button>
      </div>

      <div>
        {participantResponsesWithEvents.map((response) => {
          console.log(response);
          return (
            <div key={`participant-response-${response._id}`} className="pb-3">
              <ParticipantResponse
                response={response}
                handleDeleteParticipantResponse={
                  handleDeleteParticipantResponse
                }
              />
            </div>
          );
        })}
        {participantResponsesWithEvents.length === 0 && <>None</>}
      </div>
    </div>
  );
};

export default Home;
