import pollImage from "../assets/pollImage.png";

const ParticipantResponse = ({ response, handleDeleteParticipantResponse }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full pb-3">
      <figure>
        <img src={pollImage} alt="Shoes" className="blur-sm" />
      </figure>
      <div className="card-body">
        <div className="border">
          <div className="text-xl">{`Afterparty at ${response.formData}`}</div>
          <div>responseId: {response._id}</div>
          <div>eventId: {response.eventId}</div>
          <div>responseData: {response.responseData}</div>
        </div>
        <button
          className="btn btn-outline btn-info btn-sm btn-wide"
          onClick={async () =>
            await handleDeleteParticipantResponse(response._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ParticipantResponse;
