import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const AfterPartyEventCardBody = ({ userEvent }) => {
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

  if (loadingEventResponses) return <div>Loading...</div>;
  return (
    <div>
      <div>
      <h2 className="card-title text-4xl text-green-400">{`Afterparty at ${capitalizeFirstLetter(userEvent.formData.location)}`}</h2>

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