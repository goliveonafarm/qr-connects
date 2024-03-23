import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";

const AfterPartyEventCardBody = ({ userEvent }) => {
  console.log(userEvent);
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  console.log(eventResponses);
  if (loadingEventResponses) return <div>Loading...</div>;
  return (
    <div>
      <div>
      <h2 className="card-title text-4xl text-success">{`Afterparty at ${userEvent.formData.location}`}</h2>

      </div>
      <div>
        {eventResponses?.map(
          (response) =>
            response.responseData && (
              <div key={`event-response-${response._id}`}>
                <div className="text-lg">
                  {response.responseData?.name || "Anonymous"} -{" "}
                  {response.responseData?.attending &&
                    response.responseData.attending}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AfterPartyEventCardBody;

// title={`${capitalizeFirstLetterOfString(
//   userEvent.formType
// )} at ${capitalizeFirstLetterOfString(userEvent.formData[0])}`}
// handleDelete={handleDelete}
