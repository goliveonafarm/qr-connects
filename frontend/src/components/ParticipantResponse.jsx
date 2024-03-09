const ParticipantResponse = ({ response }) => {
  //console.log(response, ".responseData:", response.responseData);
  return (
    <div className="border text-4xl">
      <div>responseId: {response._id}</div>
      <div>eventId: {response.eventId}</div>
      <div>responseData: {response.responseData}</div>
    </div>
  );
};

export default ParticipantResponse;
