import { useEffect } from "react";
import useGetEventResponses from "../../hooks/useGetEventResponses";

const AfterPartyEventCardBody = ({ userEvent }) => {
  console.log(userEvent);
  const { loadingEventResponses, eventResponses, getEventResponses } =
    useGetEventResponses(userEvent._id);

  useEffect(() => {
    getEventResponses();
  }, []);

console.log(eventResponses)
if(loadingEventResponses) return <div>Loading...</div>
  return (
    <div>
      {eventResponses?.map((response) => (
        response.responseData && <div key={`event-response-${response._id}`}>
          <div className="text-lg">{response.responseData?.name || 'Anonymous'} - {response.responseData?.attending && response.responseData.attending}</div>
        </div>
      ))}
    </div>
  );
};

export default AfterPartyEventCardBody;
