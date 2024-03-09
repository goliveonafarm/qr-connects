import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetParticipantResponses from "../../hooks/useGetParticipantResponses";
import useSubmitParticipantResponse from "../../hooks/useSubmitParticipantResponse";
import ParticipantResponse from "../../components/ParticipantResponse";

const Home = () => {
  const { participantResponses, getParticipantResponses } =
    useGetParticipantResponses();
  const { submittingParticipantResponse, submitParticipantResponse } =
    useSubmitParticipantResponse();
  const { id } = useParams();

  const handleSubmitParticipantResponse = async (responseData, id) => {
    await submitParticipantResponse({ responseData, id });
    await getParticipantResponses();
  };

  useEffect(() => {
    getParticipantResponses();
  }, []);

  if (id) {
    //check to see if id is already in the participantResponses
    const isNotNewResponse = participantResponses.some(
      (response) => response.eventId === id
    );

    console.log(
      "participantResponses:",
      participantResponses,
      "id:",
      id,
      "isNotNewResponse:",
      isNotNewResponse
    );

    if (!isNotNewResponse) {
      console.log('this is a new response')
      //handleSubmitParticipantResponse(["testing"], id);
    }

    console.log(participantResponses.length);
  }

  return (
    <div>
      <div className="pb-3">
        <button
          className="btn btn-outline btn-info btn-lg btn-wide"
          onClick={() => {
            console.log(
              participantResponses.forEach((response) =>
                console.log(response.responseData)
              )
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
            handleSubmitParticipantResponse(["testing"], id);
          }}
        >
          handleSubmitParticipantResponse
          {`\n([testing],65eb8e8a00951f82d1792b21)`}
        </button>
      </div>

      <div>
        {participantResponses.map((response) => {
          return (
            <div key={`participant-response-${response._id}`} className="pb-3">
              <ParticipantResponse response={response} />
            </div>
          );
        })}
        {participantResponses.length === 0 && <>None</>}
      </div>
    </div>
  );
};

export default Home;
